const mongoose = require("mongoose");
require("dotenv").config();
require("./../../config/mongo");

const visitCategoriesModel = require("./../../model/visitCategories")

async function create() {
  const toInsert = [
    {
      name: "Bar associatif",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, molestias.",
      isActive: true
    },
    {
        name: "Doc associatives",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, molestias.",
        isActive: true
    },
    {
        name: "Infos touristiques",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, molestias.",
        isActive: true
    },
    {
        name: "Docs infos santé",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, molestias.",
        isActive: true
    },
    {
        name: "activités Pôle Santé",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, molestias.",
        isActive: true
    },
    {
        name: "Activités Pôle Culture",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, molestias.",
        isActive: true
    },
    {
        name: "Autres activités",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, molestias.",
        isActive: true
    },
    {
        name: "événements hors pôles",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, molestias.",
        isActive: true
    },
    {
        name: "Activités des associations",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, molestias.",
        isActive: true
    },
    {
        name: "Autres",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, molestias.",
        isActive: true
    },
    {
      name:"lipstick",
      description: "Lorem ipsum dolor sit amet consectetur.",
      isActive: false

    }

  ];
  return toInsert;
}

async function insertUsers() {
  try {
    await visitCategoriesModel.deleteMany();
    const inserted = await visitCategoriesModel.insertMany(await create());
    console.log(`seed users done : ${inserted.length} documents inserted !`);
    mongoose.connection.close().then((success) => console.log("WELL CLOSED"));
  } catch (err) {
    console.error(err);
    mongoose.connection.close().then((success) => console.log("WELL CLOSED"));
  }
}

insertUsers();


