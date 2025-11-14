import SocialLink from "../models/SocialLink.js";

export const getSocialLinks = async (req, res) => {
  try {
    const links = await SocialLink.find();
    if (!links) {
      return res
        .status(404)
        .json({ success: false, message: "No links found" });
    }
    res.json({ success: true, data: links });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addSocialLink = async (req, res) => {
  try {
    const link = await SocialLink.create(req.body);
    if (!link) {
      return res
        .status(404)
        .json({ success: false, message: "Failed to add link" });
    }
    res.json({ success: true, data: link });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateSocialLink = async (req, res) => {
  try {
    const link = await SocialLink.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!link) {
      return res
        .status(404)
        .json({ success: false, message: "Failed to update link" });
    }
    res.json({ success: true, data: link });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteSocialLink = async (req, res) => {
  try {
    const res = await SocialLink.findByIdAndDelete(req.params.id);
    if (!res) {
      return res
        .status(404)
        .json({ success: false, message: "Failed to delete link" });
    }
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
