const mongoose=require("mongoose")
const todoSchema=mongoose.Schema({
    taskname:String,
    status:String,
    tag:String
})

const TodoModel=mongoose.model("todolist",todoSchema)

module.exports={
    TodoModel
}