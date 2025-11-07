import HomeData from "../models/HomeData.js";

export const getHomeData = async (req, res) => {
  try {
    const homeData = await HomeData.findOne();
    if (!homeData) {
      return res.status(404).json({ message: "Home data not found" });
    }
    res.status(200).json({ data: homeData, message: "Home data found" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const updateHomeData = async (req, res) => {
  try {
    // Parse JSON data sent from frontend
    const slidersData = req.body.slidersData
      ? JSON.parse(req.body.slidersData)
      : [];
    const categoriesData = req.body.categoriesData
      ? JSON.parse(req.body.categoriesData)
      : [];
    const footerData = req.body.footer ? JSON.parse(req.body.footer) : {};

    // Initialize update object
    let updateData = {
      footer: footerData,
    };

    // Handle logo
    if (req.files?.logo?.[0]) {
      updateData.logo = req.files.logo[0].path;
    } else if (req.body.logoUrl) {
      updateData.logo = req.body.logoUrl;
    }

    // Handle sliders: match uploaded files with slidersData
    if (slidersData.length > 0) {
      updateData.sliders = slidersData.map((s, i) => {
        // If the frontend provided an image URL, keep it
        const existingImage =
          s.image && !s.image.startsWith("blob:") ? s.image : null;
        return {
          ...s,
          image: req.files?.sliders?.[i]?.path || existingImage || "", // default fallback
        };
      });
    }

    // Handle featured categories: match uploaded files with categoriesData
    if (categoriesData.length > 0) {
      updateData.featuredCategories = categoriesData.map((c, i) => {
        const existingImage =
          c.image && !c.image.startsWith("blob:") ? c.image : null;
        return {
          ...c,
          image:
            req.files?.featuredCategories?.[i]?.path || existingImage || "",
        };
      });
    }

    // Update the home data in DB
    const updatedHomeData = await HomeData.findOneAndUpdate({}, updateData, {
      new: true,
    });

    if (updatedHomeData) {
      return res
        .status(200)
        .json({ data: updatedHomeData, message: "Home data updated" });
    } else {
      return res.status(404).json({ message: "Home data not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const createHomeData = async (req, res) => {
  console.log(req.body, "boddyyy");
  try {
    const slidersData = req.body.slidersData
      ? JSON.parse(req.body.slidersData)
      : [];
    const categoriesData = req.body.categoriesData
      ? JSON.parse(req.body.categoriesData)
      : [];
    const footerData = req.body.footer ? JSON.parse(req.body.footer) : {};

    let newHomeData = new HomeData({
      logo: req.files?.logo?.[0]?.path || "/images/logo.png",
      sliders: slidersData.map((s, i) => ({
        ...s,
        image: req.files?.sliders?.[i] ? req.files.sliders[i].path : s.image,
      })),
      featuredCategories: categoriesData.map((c, i) => ({
        ...c,
        image: req.files?.featuredCategories?.[i]
          ? req.files.featuredCategories[i].path
          : c.image,
      })),
      footer: footerData,
    });

    const savedHomeData = await newHomeData.save();
    res.status(201).json({ data: savedHomeData, message: "Home data created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
