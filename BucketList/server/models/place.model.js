const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema({
    placeName: {
        type: String,
        required:[true, "This place needs a name!"],
        minLength: [3, "Please add a minimum of 3 characters"]
    },
    placeLocation:{
        type: String,
        required:[true, "This place needs a location!"],
        minLength: [3, "Please add a minimum of 3 characters"]
    },
   selectedFile:{
    type: String,
    required:[true, "Please include an image with your post"]
    }
}, {timestamps:true})

module.exports = mongoose.model("Place", PlaceSchema);