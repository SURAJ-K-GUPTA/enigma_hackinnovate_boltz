const mongoose = require("mongoose");

//comment schema
const commentSchema = new mongoose.Schema(
  {
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Artist",
    },
    message: {
      type: String,
      required: true,
    },
    art:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Art",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

//compile schema to form a model
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
