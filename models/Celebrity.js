import mongoose from "mongoose";

const celebritySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    price: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Celebrity", celebritySchema);
