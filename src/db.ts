import mongoose, { model, Schema } from "mongoose";
import "dotenv/config";

const mongoUrl = process.env.MONGO;
console.log("MONGO_URL from env:", mongoUrl);
if (!mongoUrl) {
  console.error("MONGO environment variable is not defined");
  process.exit(1);
}
mongoose.connect(mongoUrl);

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  type: String,
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const LinkSchema = new Schema({
  hash: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

export const LinkModel = model("Links", LinkSchema);
export const ContentModel = model("Content", ContentSchema);
