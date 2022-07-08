const mongoose = require('mongoose');

const DB = process.env.DATABASE

const connectMongoose =async()=>{
     mongoose.connect(await DB,
         ()=>{
        console.log("database connected")
    })
}
connectMongoose();

// module.exports = connectMongoose;