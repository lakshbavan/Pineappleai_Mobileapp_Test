const mongoose = require("mongoose");

//schema
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add student name"],
    },
    address: {
      type: String,
      required: [true, "please add student address"],
    },
    phone: {
      type: String,
      required: [true, "please add student phone "],
    },
    module: {
      type: String,
      required: [true, "please add student module "],
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);