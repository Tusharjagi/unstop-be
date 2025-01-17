const Floor = require("../models/floor");

const getAllFloors = async () => {
  return await Floor.find();
};

const getAvailableRoomsCount = async () => {
  const floors = await getAllFloors();
  let availableRoomsCount = 0;

  floors.forEach((floor) => {
    floor.rooms.forEach((room) => {
      if (!room.booked) availableRoomsCount++;
    });
  });

  return availableRoomsCount;
};

const bookRoomByNumber = async (roomNumber) => {
  const floors = await getAllFloors();
  const parseRoomNumber = Number(roomNumber);

  const floor = floors.find((f) =>
    f.rooms.some((r) => r.room === parseRoomNumber)
  );
  if (!floor) return { error: "Room not found." };

  const room = floor.rooms.find((r) => r.room === parseRoomNumber);
  if (room.booked) return { error: "Room is already booked." };

  room.booked = true;
  await floor.save();
  return { message: "Room successfully booked." };
};

const bookRoomByPerson = async (person) => {
  const parseRoomPersons = Number(person);
  const floors = await getAllFloors();

  if (parseRoomPersons > 5) {
    return { message: "More then 5 person is not allowed" };
  }

  const availableRooms = floors
    .map((floor) => {
      return {
        availableRooms: floor.rooms.filter((room) => !room.booked),
      };
    })
    .filter((floor) => floor.availableRooms.length > 0);

  if (!availableRooms.length) return { error: "Room not found." };

  function bookRooms(building, roomsToBook) {
    const bookedRooms = [];

    for (let floor of building) {
      if (roomsToBook === 0) break;

      let availableRooms = floor.rooms.filter((room) => !room.booked);

      while (availableRooms.length > 0 && roomsToBook > 0) {
        let room = availableRooms.shift();
        room.booked = true;
        bookedRooms.push(room.room);
        roomsToBook--;
      }
    }

    return bookedRooms;
  }

  const bookedRooms = bookRooms(floors, parseRoomPersons);

  floors.forEach(async (floor) => {
    const originalFloor = floors.find((f) => f.floor === floor.floor);
    floor.rooms.forEach((room) => {
      const originalRoom = originalFloor.rooms.find(
        (r) => r.room === room.room
      );
      if (bookedRooms.includes(room.room)) {
        originalRoom.booked = true;
      }
    });
    await originalFloor.save();
  });

  return { bookedRooms };
};

const resetAllRooms = async () => {
  const floors = await getAllFloors();
  floors.forEach((floor) => {
    floor.rooms.forEach((room) => {
      room.booked = false;
    });
  });
  await Promise.all(floors.map((floor) => floor.save()));
  return { message: "All rooms have been reset to unbooked." };
};

const randomBookRooms = async () => {
  const floors = await getAllFloors();
  const roomsToBook = [];
  const availableRooms = [];

  floors.forEach((floor) => {
    floor.rooms.forEach((room) => {
      if (!room.booked) availableRooms.push({ room, floor });
    });
  });

  if (availableRooms.length === 0)
    return { error: "No rooms are available for booking." };

  const bookedRoomsCount = Math.floor(Math.random() * 10);
  let bookedRooms = 0;

  for (let i = availableRooms.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableRooms[i], availableRooms[j]] = [
      availableRooms[j],
      availableRooms[i],
    ];
  }

  for (
    let i = 0;
    i < availableRooms.length && bookedRooms < bookedRoomsCount;
    i++
  ) {
    const { room, floor } = availableRooms[i];
    room.booked = true;
    roomsToBook.push(room);
    bookedRooms++;
    await floor.save();
  }

  return { message: `${roomsToBook.length} rooms have been randomly booked.` };
};

module.exports = {
  getAllFloors,
  getAvailableRoomsCount,
  bookRoomByNumber,
  bookRoomByPerson,
  resetAllRooms,
  randomBookRooms,
};
