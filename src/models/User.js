import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ROLE SYSTEM
    role: {
      type: String,
      enum: ["superadmin", "admin", "user"],
      default: "user",
    },

    //otp
    otp: String,
    otpExpire: Date,
    emailVerified: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    // PASSWORD RESET SYSTEM
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
