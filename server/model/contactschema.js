const  mongoose = require('mongoose')

const contactschema =new    mongoose.Schema({

       propertype:String,
        name:String,
        message:String, 
        contact:Number,
        emailid:String
})

const Contactform=mongoose.model('ContactForm',contactschema)
module.exports = Contactform