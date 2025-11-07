import NewArrivels from "../models/NewArrivels.js";

// Get all new arrivals
export const getAllNewArrivels = async (req, res) => {
  try {
    const newArrivels = await NewArrivels.find();
    if (!newArrivels || newArrivels.length === 0) {
      return res.status(404).json({ message: "No New Arrivels found" });
    }
    res
      .status(200)
      .json({
        data: newArrivels,
        message: "New Arrivels fetched successfully",
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new arrival
export const createNewArrivel = async (req, res) => {
  try {
    const { title, description, altText, selectedImage } = req.body;
    const imageUrl = req.file ? req.file.path : selectedImage || undefined;

    const newArrivel = new NewArrivels({
      title,
      description,
      altText,
      image: imageUrl,
    });

    const savedNewArrivel = await newArrivel.save();
    res.status(201).json({
      data: savedNewArrivel,
      message: "New Arrivel created successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a new arrival
export const updateNewArrivel = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, altText, selectedImage, existingImage } =
      req.body;

    // Choose new uploaded file or fallback to existing/selected image
    const imageUrl = req.file
      ? req.file.path
      : selectedImage || existingImage || undefined;

    const updatedNewArrivel = await NewArrivels.findByIdAndUpdate(
      id,
      { title, description, altText, image: imageUrl },
      { new: true }
    );

    if (!updatedNewArrivel) {
      return res.status(404).json({ message: "New Arrivel not found" });
    }

    res.status(200).json({
      data: updatedNewArrivel,
      message: "New Arrivel updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a new arrival
export const deleteNewArrivel = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNewArrivel = await NewArrivels.findByIdAndDelete(id);
    if (!deletedNewArrivel) {
      return res.status(404).json({ message: "New Arrivel not found" });
    }

    res.status(200).json({
      message: "New Arrivel deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
