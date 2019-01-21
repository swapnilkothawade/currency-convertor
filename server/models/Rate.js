const mongoose = require("mongoose");

const RateSchema = new mongoose.Schema({
  base: String,
  rates: [{
    date: String,
    aud: Number,
    cad: Number,
    eur: Number,
    gbp: Number,
  }],
  updated_at: Number
});

module.exports = mongoose.model("Rate", RateSchema);
