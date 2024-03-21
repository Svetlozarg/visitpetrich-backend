import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  category:
    | "exhibitions"
    | "conferences"
    | "seminars"
    | "festivals"
    | "celebration event"
    | "fundraisers"
    | "sports"
    | "art event"
    | "virtual events"
    | "workshops";
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  phone: string;
  email: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        "exhibitions",
        "conferences",
        "seminars",
        "festivals",
        "celebration event",
        "fundraisers",
        "sports",
        "art event",
        "virtual events",
        "workshops",
      ],
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    email: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    link: {
      type: String,
      trim: true,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  }
);

const Event = models.Event || model<IEvent>("Event", eventSchema);

export default Event;
