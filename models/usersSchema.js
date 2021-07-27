const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    userName: String,
    password: String,
    projects: [{
        type: Schema.Types.ObjectId,
        ref: "Project" //  A modifier avec le nom de la connection "Projet 
    }],
    isPublic: Boolean,
    avatar: {
        type: String,
        default: "https://image.shutterstock.com/z/stock-vector-user-icon-male-with-beard-icon-hipster-flat-icon-avatar-of-man-with-beard-flat-internet-icon-in-709279219.jpg",
    }
})

const User = mongoose.model("user", userSchema);
module.exports = User;