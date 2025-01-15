const express = require("express");
const {
  getHotelsAndFloors,
  bookRoomNumber,
  getAvailableRoomsCount,
  resetAllRooms,
  randomBookRooms,
  bookRoomPerson,
} = require("../controllers/hotelController");

const router = express.Router();

router.get("/getHotelsAndFloors", getHotelsAndFloors);

router.get("/getAvailableRoomsCount", getAvailableRoomsCount);

router.post("/bookRoomNumber", bookRoomNumber);

router.post("/bookRoomPerson", bookRoomPerson);

router.post("/reset", resetAllRooms);

router.post("/randomBook", randomBookRooms);

module.exports = router;
