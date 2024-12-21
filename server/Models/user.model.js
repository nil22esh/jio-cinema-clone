import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter A Username!"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter An Email!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter A Password!"],
      minlength: [6, "Password must be at least 6 characters long!"],
      select: false,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (password, next) {
  if (!this.isModified) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const UserModel = mongoose.model("UserModel", userSchema);
export default UserModel;
