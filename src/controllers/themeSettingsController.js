// controllers/themeController.js
import ThemeSettings from "../models/ThemeSettings.js";

export const getThemeSettings = async (req, res) => {
  try {
    let theme = await ThemeSettings.findOne();
    if (!theme) {
      // create a default doc so next calls always return something
      theme = await ThemeSettings.create({});
    }
    res.json({ ok: true, data: theme });
  } catch (err) {
    console.error("getThemeSettings error:", err);
    res.status(500).json({ ok: false, error: "Failed to load theme" });
  }
};

export const updateThemeSettings = async (req, res) => {
  try {
    let theme = await ThemeSettings.findOne();
    if (!theme) theme = await ThemeSettings.create({});

    // Only copy allowed keys for safety
    const allowed = [
      "background",
      "foreground",
      "primary",
      "primaryForeground",
      "secondary",
      "secondaryForeground",
      "accent",
      "accentForeground",
      "buttonBg",
      "buttonText",
      "navbarBg",
      "navbarText",
      "footerBg",
      "footerText",
      "font",
    ];

    allowed.forEach((k) => {
      if (req.body[k] !== undefined) theme[k] = req.body[k];
    });

    theme.updatedAt = new Date();
    await theme.save();

    res.json({ ok: true, message: "Theme updated", data: theme });
  } catch (err) {
    console.error("updateThemeSettings error:", err);
    res.status(500).json({ ok: false, error: "Failed to update theme" });
  }
};