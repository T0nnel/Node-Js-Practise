const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const app = express()
const collection = require("./config")
const PORT = 3500

app.set('view engine','ejs')


app.use(express.json())

app.use(express.urlencoded({extended:false})) 

app.use(express.static("public"));


app.get("/" , (req, res) => {
    res.render("login");
})

app.get("/signup" , (req, res) => {
    res.render("signup");
})

//register user
app.post("/signup" , async (req, res) => {
    const data = {
        name:req.body.username,
        password:req.body.password
    }
    const existingUser = await collection.findOne({name:data.name})
    if(existingUser){
        res.send("User already exists")
    }else{
        const saltrounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltrounds)

        data.password = hashedPassword

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }})
    

    app.post("/login", async(req , res) =>{
        try{
            const check = await collection.findOne({name: req.body.username})
            if(!check){
                res.send("username cannot be found")
            }
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)
            if(isPasswordMatch){
                res.render("home")
            }else{
                req.send("wrong password")
            }
        }catch{
                res.send("wrong Details")
        }
    })
app.listen(PORT, () => {
    console.log("Server runnning on Port " + PORT );
})