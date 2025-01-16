const mongoose = require("mongoose");

const floorSchema = new mongoose.Schema(
  {
    floor: { type: Number, required: true },
    rooms: [
      {
        room: { type: Number, required: true },
        booked: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const Floor = mongoose.model("Floor", floorSchema);
module.exports = Floor;
