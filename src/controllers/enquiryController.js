import fetch from "node-fetch";
import Enquiry from "../models/Enquiry.js";

export const sendEnquiry = async (req, res) => {
  try {
    const { name, email, phone, productName, productId, message } = req.body;

    if (!name || !email || !phone || !productName) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing required fields" });
    }

    // Format current time (Indian Standard Time)
    const currentTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    // WhatsApp Cloud API request
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

    // Save enquiry in DB
    await Enquiry.create({
      name,
      email,
      phone,
      productName,
      productId,
      message,
    });

    return res.json({
      ok: true,
      message: "Enquiry sent successfully on WhatsApp!",
    });
  } catch (err) {
    console.error("Error in sendEnquiry:", err);
    res.status(500).json({ ok: false, error: "Failed to send enquiry" });
  }
};
