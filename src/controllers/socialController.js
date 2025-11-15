import SocialLink from "../models/SocialLink.js";

// ---------------------- GET ALL ----------------------
export const getSocialLinks = async (req, res) => {
  try {
    const links = await SocialLink.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: links,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- CREATE ----------------------
export const addSocialLink = async (req, res) => {
  try {
    const link = await SocialLink.create(req.body);

    res.json({
      success: true,
      data: link,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- UPDATE ----------------------
export const updateSocialLink = async (req, res) => {
  try {
    const updated = await SocialLink.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Social link not found",
      });
    }

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- DELETE ----------------------
export const deleteSocialLink = async (req, res) => {
  try {
    const item = await SocialLink.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Social link not found",
      });
    }

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};