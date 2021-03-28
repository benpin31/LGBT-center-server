const mongoose = require("mongoose");
require("dotenv").config();
require("./../../config/mongo");

const visitCategoriesModel = require("./../../model/visitCategories")

async function create() {
  const toInsert = [
    {
      name: "Infos LGBTQI docs",
      description: "Informations générales sur la communauté, le tourisme, les loisirs, les associations, la culture, les flyers.",
      isActive: true
    },
    {
      name: "Infos santé",
      description: "Informations sur la santé, les préservatifs, les flyers.",
      isActive: true
    },
    {
      name: "Aide urgences",
      description: "Demande d'une aide à catactère urgent : hébergement, à la suite d'une agression...",
      isActive: true
    },
    {
      name: "Activités du centre",
      description: "Ce qui est organisé par le centre : permanences, bibliothèque, vernissages, événements divers.",
      isActive: true
    },
    {
      name: "Activités des associations",
      description: "Tout ce qui est organisé par les associations, réunions, événements.",
      isActive: true
    },
    {
      name: "Convivialité bar",
      description: "Les personnes qui passent juste pour être présentent, qui se donnent rendez-vous, qui viennent au bar.",
      isActive: true
    },
    {
      name: "Autres",
      description: "Quand on n'est pas sûr.",
      isActive: true
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


