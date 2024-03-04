import { Document, Schema, model, models } from "mongoose";

export interface IPlace extends Document {
  name: string;
  location: string;
  url: string;
  image: string;
  category: "hotel" | "house" | "hut";
}

const PlaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["hotel", "house", "hut"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Place = models.Place || model<IPlace>("Place", PlaceSchema);

export default Place;
