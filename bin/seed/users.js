const mongoose = require("mongoose");
require("dotenv").config();
require("./../../config/mongo");
const bcrypt = require("bcrypt");

const UserModel = require("./../../model/users");

async function create() {
  const toInsert = [
    {
      login: "Irenne",
      password: bcrypt.hashSync("1234", 10),
      isAdmin: true
    },
    {
      login: "Marc",
      password: bcrypt.hashSync("1234", 10),
      isAdmin: true
    },
    {
      login: "Benevole",
      password: bcrypt.hashSync("1234", 10),
      isAdmin: false
    },

  ];
  return toInsert;
}

async function insertUsers() {
  try {
    await UserModel.deleteMany();
    const inserted = await UserModel.insertMany(await create());
    console.log(`seed users done : ${inserted.length} documents inserted !`);
    mongoose.connection.close().then((success) => console.log("WELL CLOSED"));
  } catch (err) {
    console.error(err);
    mongoose.connection.close().then((success) => console.log("WELL CLOSED"));
  }
}

insertUsers();
