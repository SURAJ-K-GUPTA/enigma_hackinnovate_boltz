const mongoose = require("mongoose");


const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  pinCode: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  }
});


//Schema
const artistSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    role:{
      type: String,
      default:"Artist"
    },
    bio:{
      type: String,
      default:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum adipisci eligendi nobis itaque ex? Veniam tempore itaque cumque fugiat iusto voluptatibus odit inventore dolorem numquam maxime, repellendus labore corrupti expedita?"
    },
    arts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Art" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    addresses: [addressSchema],
  },
  {
    timestamps: true,
  }
);

//compile the schema to form a model
const Artist = mongoose.model("Artist", artistSchema);
const Address = mongoose.model('Address', addressSchema);

module.exports = Artist;
