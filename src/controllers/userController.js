import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
export const RegisterUser = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = generateToken(user._id.toString());
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};
export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = generateToken(user._id.toString());
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
export const getUserByIdProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user?._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res
            .status(200)
            .json({ data: user, message: "User profile fetched successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
