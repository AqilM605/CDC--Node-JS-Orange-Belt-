import { Document, model, Model, Schema } from "mongoose";
import bcrypt = require("bcrypt");

export interface UserInterface extends Document {
  id?: number;
  emailAddress: string;
  password: string;
}

const userSchema = new Schema<UserInterface>(
  {
    emailAddress: {
      type: String,
      required: true,
      unique: true,
      max: 150,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// encrypt password before save
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password Validation
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default model<UserInterface, Model<any>>("User", userSchema);
