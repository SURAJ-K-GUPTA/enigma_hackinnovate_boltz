const mongoose = require("mongoose");

//title, desc, category, image
const artSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Painting', 'Drawing', 'Sculpture', 'Printmaking', 'Photography', 'Digital art'],
    },
    image: {
      type: String,
      required: true,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//compile schema to form model

const Art = mongoose.model("Art", artSchema);

//export model
module.exports = Art;
