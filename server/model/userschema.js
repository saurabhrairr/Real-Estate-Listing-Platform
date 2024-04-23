const mongoose = require('mongoose');

const userschem=new mongoose.Schema({

       username: {
              type:String,
              unique:true,
       },
       password:String,
})

const User=mongoose.model('User',userschem);
module.exports = User;