const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    temperature: {
      type: Number,
    },
    feelsLike: {
      type: Number,
    },
    humidity: {
      type: Number,
    },
    windSpeed: {
      type: Number,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
    },
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Weather", weatherSchema);