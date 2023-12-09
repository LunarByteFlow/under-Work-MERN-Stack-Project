import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PlacesSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photos: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
  },
  perks: [
    {
      type: String,
    },
  ],
  extraInfo: {
    type: String,
  },
  checkIn: {
    type: Number,
  },
  checkOut: {
    type: Number,
  },
  maxGuest: {
    type: Number,
  },
});
const Places = model("Places", PlacesSchema);

export default Places;
