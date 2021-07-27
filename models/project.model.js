const mongoose = require ("mongoose");
const projectSchema = new mongoose.Schema ({
 
    title:String, 
    Technologie:Array, 
    Type: [{enum:["social", "healthcare", ""], type : Schema.Types.ObjectId, ref: `Technology`}],
    Description:String, 
    Link: String, 
    Image: String, 
    Contributors: [ {type : Schema.Types.ObjectId, ref: `user`}],
    Owner: { type : Schema.Types.ObjectId, ref: `user`},

})


const Project = mongoose.model("Project", projectSchema );

module.exports = Project; 