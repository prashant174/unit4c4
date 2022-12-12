const express=require("express")
const {TodoModel}=require("../models/todo.model")

const todoRouter=express.Router()


todoRouter.get("/",async (req,res)=>{
    const todo=await TodoModel.find()
    res.send(todo)
})
todoRouter.get("/checkstatus",async(req,res)=>{
    const qu=req.query

    try{
const todo=await TodoModel.find(qu)
res.send(todo)
    }
    catch(err){
        console.log(err)
        res.send("something went wrong")
    }


})

todoRouter.get("/checkstatusandtag",async(req,res)=>{
    const qu=req.query

    try{
const todo=await TodoModel.find(qu)
res.send(todo)
    }
    catch(err){
        console.log(err)
        res.send("something went wrong")
    }


})
todoRouter.post("/create",async(req,res)=>{
    const payload=req.body

    try{
      const list=new TodoModel(payload)
      await list.save()
      res.send({"msg":"created successfully"})
    }
    catch(err){
        res.send("something wrong")
    }
})

todoRouter.patch("/update/:todoID",async(req,res)=>{
    const todoID=req.params.todoID
    const payload=req.body
   // const userID=req.body.userID
   // const list=await TodoModel.findOne({_id:todoID})
    // if(userID!==list.userID){
    //     res.send("not authorised")
    // }
   // else{
        await TodoModel.findByIdAndUpdate({_id:todoID},payload)
        res.send("updated")    
    //}
})

todoRouter.delete("/delete/:todoID",async(req,res)=>{
    const todoID=req.params.todoID
    await TodoModel.findByIdAndDelete({_id:todoID})
    res.send("deleted successsfully")
})

module.exports={todoRouter}