const mongoose = require('mongoose')
const Schema = mongoose.Schema

const technologySchema = new Schema({

    name : String,
    type : {
        type: String,
        enum: ['back', 'front']
    },
    logo: String
})

const Technology = mongoose.model('technology', technologySchema)
module.exports = Technology