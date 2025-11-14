import fetch from "node-fetch";
import Enquiry from "../models/Enquiry.js";
import Analytics from "../models/Analytics.js";

/* ============================================================================
   GET ENQUIRIES — WITH PAGINATION
   Route: GET /api/enquiry?page=1&limit=10
============================================================================ */

export const getEnquiries = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1; // default: page 1
    const limit = Number(req.query.limit) || 10; // default: 10 per page
    const skip = (page - 1) * limit;

    const total = await Enquiry.countDocuments();

    const enquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.json({
      ok: true,
      data: enquiries,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Error fetching enquiries:", err);
    res.status(500).json({ ok: false, error: "Failed to fetch enquiries" });
  }
};

/* ============================================================================
   SEND ENQUIRY — SEND TO WHATSAPP + SAVE TO DB
   Route: POST /api/enquiry
============================================================================ */

export const sendEnquiry = async (req, res) => {
  try {
    const { name, email, phone, productName, productId, message } = req.body;

    if (!name || !email || !phone || !productName) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing required fields" });
    }

    // Format IST Time
    const currentTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    // WhatsApp Cloud API
    const response = await fetch(
      `https://graph.facebook.com/v24.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: process.env.WHATSAPP_ADMIN,
          type: "template",
          template: {
            name: "product_enquiry",
            language: { code: "en_US" },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: productName },
                  { type: "text", text: name },
                  { type: "text", text: email },
                  { type: "text", text: phone },
                  { type: "text", text: message || "-" },
                  { type: "text", text: currentTime },
                ],
              },
            ],
          },
        }),
      }
    );

    const data = await response.json();
    console.log("WhatsApp Response:", data);

    if (data.error) {
      console.error("WhatsApp Error:", data.error);
      return res.status(500).json({ ok: false, error: data.error.message });
    }

    // Save Enquiry to DB
    await Enquiry.create({
      name,
      email,
      phone,
      productName,
      productId,
      message,
    });
    let stats = await Analytics.findOne();
    if (!stats) stats = await Analytics.create({});

    // Safe increment
    stats.enquiries = (stats.enquiries || 0) + 1;

    await stats.save();
    return res.json({
      ok: true,
      message: "Enquiry sent successfully on WhatsApp!",
    });
  } catch (err) {
    console.error("Error in sendEnquiry:", err);
    res.status(500).json({ ok: false, error: "Failed to send enquiry" });
  }
};
