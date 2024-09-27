import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please provide a valid email"],
    unique: true,
  },
  password: {
    type: String,
  },
  credits: {
    type: Number,
    default: 5,
  },
  emailToken: {
    type: String,
  },
  emailConfirmed: {
    type: Boolean,
    default: false,
  },
  subscription: {
    type: String, // or an object depending on your needs
    default: "free",
  },
    trialStart: {
      type: Date,
        default: Date.now,


    },
});

const User = mongoose.models?.User || mongoose.model("User", userSchema)

export default User