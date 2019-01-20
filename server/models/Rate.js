const mongoose = require("mongoose");

const RateSchema = new mongoose.Schema({
  base: String,
  rates: [{
    date: {
      type: String,
      unique: true,
      index: true
    },
    aud: Number,
    cad: Number,
    eur: Number,
    gbp: Number,
  }],
  updated_at: Number
});

module.exports = mongoose.model("Rate", RateSchema);
