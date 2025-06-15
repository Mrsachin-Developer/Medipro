import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      default: "hospital",
      enum: ["hospital", "clinic", "health center"],
    },
    operator: {
      type: String,
      trim: true,
    },
    location: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    empanelledSchemes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Scheme",
      },
    ],
  },
  { timestamps: true }
);

// Create a compound index on latitude and longitude for geo-based queries
hospitalSchema.index({ "location.lat": 1, "location.lon": 1 });

const Hospital = mongoose.model("Hospital", hospitalSchema);
export default Hospital;
