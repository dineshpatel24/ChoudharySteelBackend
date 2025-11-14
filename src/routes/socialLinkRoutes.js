import express from "express";

import {
  addSocialLink,
  deleteSocialLink,
  getSocialLinks,
  updateSocialLink,
} from "../controllers/socialController.js";

const SocialLinkRouter = express.Router();

SocialLinkRouter.get("/", getSocialLinks);
SocialLinkRouter.post("/", addSocialLink);
SocialLinkRouter.put("/:id", updateSocialLink);
SocialLinkRouter.delete("/:id", deleteSocialLink);

export default SocialLinkRouter;
