const express=require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Port=8004
const Userroute=require("./routes/user")
const Listingroute=require("./routes/listing")
require('dotenv').config();
const cors=require('cors');

app.use(express.json());
app.use(express.urlencoded({extendesc: false}));
app.use(bodyParser.json());
app.use(cors());



mongoose.connect("mongodb://localhost:27017/real-estate-listings",{ useNewUrlParser: true, useUnifiedTopology: true }).then((resizeBy) => {
       console.log("db connection");
}).catch((err) => {{err}});


app.listen(Port,()=>{

       console.log(`listening on port ${Port}`)

});


app.use("/api/user",Userroute)
app.use("/api/listings",Listingroute)





function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.status(400).json({ success: 0, message: err.message });
    } else {
        res.status(500).json({ success: 0, message: "Internal server error" });
    }
}
app.use(errHandler);

