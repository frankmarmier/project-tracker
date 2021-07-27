require("dotenv/config");
const mongoose = require("mongoose");
const Technology = require("../models/Technology");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost/project-tracked-DB";

const technologies = [
  {
    name: "Beerify",
    type: "front",
    logo: "https://icons.iconarchive.com/icons/iconka/lucky-leprechaun/256/beer-1-icon.png",
  },
  {
    name: "Luckify",
    type: "back",
    logo: "https://icons.iconarchive.com/icons/iconka/lucky-leprechaun/256/clover-icon.png",
  },
  {
    name: "HorseShoe",
    type: "front",
    logo: "https://icons.iconarchive.com/icons/iconka/lucky-leprechaun/256/horseshoe-icon.png",
  },
  {
    name: "#RainbowZ",
    type: "back",
    logo: "https://icons.iconarchive.com/icons/iconka/lucky-leprechaun/256/rainbow-pot-icon.png",
  },
  {
    name: "GreenHat",
    type: "back",
    logo: "https://icons.iconarchive.com/icons/iconka/lucky-leprechaun/256/tophat-icon.png",
  },
  {
    name: "Pengube",
    type: "front",
    logo: "https://icons.iconarchive.com/icons/archigraphs/cubed-animals/256/penguin-icon.png",
  },
];

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to db");
    Technology.create(technologies)
      .then((technologyDocument) => {
        console.log(technologyDocument);
      })
      .catch((e) => console.log(e));
  })
  .catch((e) => console.log(e));
