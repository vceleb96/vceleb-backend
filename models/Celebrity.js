import mongoose from "mongoose";

const celebritySchema = new mongoose.Schema({
  name: String,
  category: String,
  image: String,
  bio: String,
  isAdult: Boolean
});

export default mongoose.model("Celebrity", celebritySchema);
