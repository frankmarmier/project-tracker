//const mongoose = require("mongoose")

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () =>
    console.log("yay mongodb connected :)")
);

mongoose.connection.on("error", () =>
    console.log("nay db connection error :(")
);


//Connect 
const User = require("../models/usersSchema")

const users = [{
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
]

User.create(users)
    .then((usersCreated) => console.log(usersCreated))
    .catch((error => console.log(error)))