import AnnouncementBanner from "../models/AnnouncementBanner.js";

// GET current announcement
export const getAnnouncement = async (req, res) => {
  try {
    const banner = await AnnouncementBanner.findOne().sort({ createdAt: -1 });
    res.status(200).json({ data: banner });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE announcement
export const createAnnouncement = async (req, res) => {
  try {
    const banner = await AnnouncementBanner.create(req.body);
    res.status(201).json({ message: "Announcement created", data: banner });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE announcement
export const updateAnnouncement = async (req, res) => {
  try {
    const banner = await AnnouncementBanner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Announcement updated", data: banner });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};