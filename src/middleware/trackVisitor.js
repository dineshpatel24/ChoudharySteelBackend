import Analytics from "../models/Analytics.js";

export const trackVisitor = async (req, res, next) => {
  try {
    let stats = await Analytics.findOne();
    if (!stats) stats = await Analytics.create({});

    stats.visitors += 1;
    await stats.save();
  } catch (err) {
    console.log("Visitor tracking failed:", err);
  }

  next();
};