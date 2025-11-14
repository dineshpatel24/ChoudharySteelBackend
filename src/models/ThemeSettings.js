// models/ThemeSettings.js
import mongoose from "mongoose";

const themeSettingsSchema = new mongoose.Schema({
  // Core palette (used as --background, --foreground, --primary, etc.)
  background: { type: String, default: "#ffffff" },
  foreground: { type: String, default: "#000000" },

  // Primary (buttons / links)
  primary: { type: String, default: "#111827" },
  primaryForeground: { type: String, default: "#ffffff" },

  // Secondary / accents
  secondary: { type: String, default: "#F3F4F6" },
  secondaryForeground: { type: String, default: "#111827" },
  accent: { type: String, default: "#E5E7EB" },
  accentForeground: { type: String, default: "#111827" },

  // Buttons (explicit)
  buttonBg: { type: String, default: "#111827" },
  buttonText: { type: String, default: "#ffffff" },

  // Navbar / footer
  navbarBg: { type: String, default: "#ffffff" },
  navbarText: { type: String, default: "#000000" },
  footerBg: { type: String, default: "#f5f5f5" },
  footerText: { type: String, default: "#000000" },

  // Font (Google font name, e.g. "Poppins", "Inter")
  font: { type: String, default: "Inter" },

  // metadata
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.ThemeSettings ||
  mongoose.model("ThemeSettings", themeSettingsSchema);