const  mongoose = require('mongoose')

const listingschema =new    mongoose.Schema({

       location:String,
       price_range:Number,
       property_type:String,
       description: String,
       image: String,
       amenities: [String] 
})

const Listing=mongoose.model('Listing',listingschema)
module.exports = Listing