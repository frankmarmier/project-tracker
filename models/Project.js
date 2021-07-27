const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
  title: String,
  technology: [
    {
      type: Schema.Types.ObjectId,
      ref: "Technology",
    },
  ],
  type: [
    {
      type: String,
      enum: ["social", "healthcare", "other"],
    },
  ],
  description: String,
  link: String,
  image: String,
  contributors: [{ type: Schema.Types.ObjectId, ref: "User" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
