import Analytics from "../models/Analytics.js";
import Enquiry from "../models/Enquiry.js";

/* ============================================================================
   GET FULL ANALYTICS — ALWAYS ACCURATE
============================================================================ */
export const getAnalytics = async (req, res) => {
  try {
    let stats = await Analytics.findOne();

    // Create record if not exists
    if (!stats) {
      stats = await Analytics.create({});
    }

    // 🔥 Recalculate enquiries from DB
    const totalEnquiries = await Enquiry.countDocuments();
    stats.enquiries = totalEnquiries;

    await stats.save();

    res.json({ ok: true, data: stats });

  } catch (err) {
    console.error("Analytics fetch error:", err);
    res.status(500).json({ ok: false, error: "Failed to fetch analytics" });
  }
};

/* ============================================================================
   INCREMENT PRODUCT VIEW
============================================================================ */
export const incrementProductView = async (req, res) => {
  try {
    let stats = await Analytics.findOne();
    if (!stats) stats = await Analytics.create({});

    stats.productsViewed = (stats.productsViewed || 0) + 1;
    await stats.save();

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false });
  }
};

/* ============================================================================
   INCREMENT SEARCH
============================================================================ */
export const incrementSearch = async (req, res) => {
  try {
    let stats = await Analytics.findOne();
    if (!stats) stats = await Analytics.create({});

    stats.searches = (stats.searches || 0) + 1;
    await stats.save();

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false });
  }
};