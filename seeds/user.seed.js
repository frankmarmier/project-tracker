require("dotenv/config");
const mongoose = require("mongoose");
//Connect
const User = require("../models/User");

const users = [
  {
    userName: "Johanna",
    password: "1234",
    isPublic: true,
  },
  {
    userName: "Ghada",
    password: "1234",
    isPublic: true,
  },
  {
    userName: "Mickaelle",
    password: "1234",
    isPublic: true,
  },
  {
    userName: "Francois",
    password: "1234",
    isPublic: true,
  },
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  User.create(users)
    .then((usersCreated) => console.log(usersCreated))
    .catch((error) => console.log(error));
  console.log("yay mongodb connected :)");
});

mongoose.connection.on("error", () =>
  console.log("nay db connection error :(")
);
