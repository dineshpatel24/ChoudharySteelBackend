import logo from "../models/logo.js";

export const getLogo = async (req, res) => {
  try {
    const logoData = await logo.findOne();
    if (!logoData) {
      return res.status(404).json({ message: "Logo not found" });
    }
    res.status(200).json({ data: logoData, message: "Logo found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createLogo = async (req, res) => {
  try {
    const newLogo = new logo({
      image: req.file?.path || "/images/default-logo.png",
    });

    const savedLogo = await newLogo.save();
    res.status(201).json({
      data: savedLogo,
      message: "Logo created successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateLogo = async (req, res) => {
  try {
    let updateData = {};

    // Handle logo update
    if (req.file) {
      updateData.image = req.file.path;
    } else if (req.body.logoUrl) {
      updateData.image = req.body.logoUrl;
    }

    const updatedLogo = await logo.findOneAndUpdate({}, updateData, {
      new: true,
      upsert: true,
    });

    res.status(200).json({
      data: updatedLogo,
      message: "Logo updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
