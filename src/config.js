const mongoose = require('mongoose')
const connect = mongoose.connect("mongodb+srv://tonnel:tonnel@cluster0.eyeqbwd.mongodb.net/Website?retryWrites=true&w=majority&appName=Cluster0")

//connect to database
connect.then(() =>{
    console.log("Database connected successfully");
})
.catch(()=>{
    console.log("Database cannot be connected");
})

//schema
const loginSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
})

const collection = new mongoose.model("users", loginSchema)

module.exports = (collection) /* connectDB */