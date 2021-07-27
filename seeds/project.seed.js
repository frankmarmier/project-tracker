require("dotenv/config");
const mongoose = require("mongoose");
const Project = require("../models/Project");

const projects = [
  {
    title: "M2 PROJECT",
    type: "social",
    description: "I like turtles",
    link: "https://alink.com",
    image: "https://pictureipsum.com/500",
  },

  {
    title: "M2 PROJECT 286 ",
    type: "healthcare",
    description: "I like cats",
    link: "https://alink.com",
    image: "https://pictureipsum.com/500",
  },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    Project.create(projects)
      .then((createdDocuments) => {
        console.log(createdDocuments.length);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });
