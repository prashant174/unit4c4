const express=require("express")
const {connection}=require("./config/db")
const app=express()
require("dotenv").config()
const {UserModel}=require("./models/user.model")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {todoRouter}=require("./routes/todo.route")
const { authneticate }=require("./middleware/authentication")
const port=process.env.port||7000
app.use(express.json())


app.get("/",async(req,res)=>{
    const users=await UserModel.find()
    res.send(users)
})

app.post("/register",async(req,res)=>{
const {name,email,password}=req.body
const already=await UserModel.findOne({email})
if(already){
    res.send({"msg":"user already exists"})
}
//console.log(name)
// res.send("done")
else{
try{
    bcrypt.hash(password, 5,async function(err, hash) {
        const user=new UserModel({name,email,password:hash})
        await user.save()
        res.send({"msg":"signup successfull"})
    });
}
catch(err){
    console.log(err)
    res.send({"msg":"something went wrong"})
}
}
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
          const user=await UserModel.find({email})
          if(user.length>0){
            const hash_pass=user[0].password
            bcrypt.compare(password, hash_pass, function(err, result) {
                if(result){
                    const token=jwt.sign({"userID":user[0]._id},"hush")

                    res.send({"msg":"login successfull","token":token})
                }
                else{
                    res.send("login failed")
                }
            });

          }
          else{
            res.send("login failed")
          }
    }
    catch(err){
        console.log(err)
        res.send("something wrong")
    }
})

app.use(authneticate)
app.use("/todolist",todoRouter)

app.listen(port,async(req,res)=>{
    try{
await connection
console.log("connected to mongodb....")
    }
    catch(err){
        console.log("something went wrong")
        console.log(err)
    }
    console.log("listening to mongo db")
})