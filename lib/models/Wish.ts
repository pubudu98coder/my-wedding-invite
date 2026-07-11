import mongoose, { Schema, models } from "mongoose";

const wishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    attendance: {
      type: String,
      required: true,
      enum: ["accepted", "rejected"],
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },
    message: {
      type: String,
    },
    wish: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Wish = models.Wish || mongoose.model("Wish", wishSchema);
export default Wish;
