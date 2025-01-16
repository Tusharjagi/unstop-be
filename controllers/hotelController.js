const floorService = require("../services/floorService");

// Controller to get all floors and rooms
const getHotelsAndFloors = async (req, res) => {
  try {
    const floors = await floorService.getAllFloors();
    if (!floors || floors.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No floors found." });
    }
    res.status(200).json({ success: true, data: floors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to get the count of available rooms
const getAvailableRoomsCount = async (req, res) => {
  try {
    const availableRoomsCount = await floorService.getAvailableRoomsCount();
    res.status(200).json({ success: true, availableRoomsCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to book a room by room number
const bookRoomNumber = async (req, res) => {
  const { roomNumber } = req.body;
  try {
    const result = await floorService.bookRoomByNumber(roomNumber);
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    return res.status(200).json({ message: result.message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred." });
  }
};

// Controller to book a room by room person
const bookRoomPerson = async (req, res) => {
  const { persons } = req.body;
  try {
    const result = await floorService.bookRoomByPerson(persons);
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    return res.status(200).json({ message: result.message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred." });
  }
};

// Controller to reset all rooms
const resetAllRooms = async (req, res) => {
  try {
    const result = await floorService.resetAllRooms();
    return res.status(200).json({ message: result.message });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while resetting the rooms." });
  }
};

// Controller to randomly book rooms
const randomBookRooms = async (req, res) => {
  try {
    const result = await floorService.randomBookRooms();
    if (result.error) {
      return res.status(404).json({ message: result.error });
    }
    return res.status(200).json({ message: result.message });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while booking rooms randomly." });
  }
};

module.exports = {
  getHotelsAndFloors,
  bookRoomNumber,
  getAvailableRoomsCount,
  resetAllRooms,
  randomBookRooms,
  bookRoomPerson,
};
