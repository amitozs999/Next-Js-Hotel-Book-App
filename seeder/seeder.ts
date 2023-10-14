import Room from "../server/models/room";
import mongoose from "mongoose";
import { rooms } from "./data";
// require('dotenv').config({ path: 'next.config.js' })

const seedRooms = async () => {
  try {
    await mongoose.connect("mongodb+srv://singhekas08:hBVWcqE65vzXr1W8@cluster0.qp2xlqx.mongodb.net/mydb?retryWrites=true&w=majority");

    await Room.deleteMany();
    console.log("Rooms are deleted");

    await Room.insertMany(rooms);
    console.log("Rooms are added");

    process.exit();
  } catch (error) {
    console.log(error+'here2');
    process.exit();
  }
};

seedRooms();
