const mongoose=require("mongoose")
require("dotenv").config()
const connection=mongoose.connect(process.env._url)

module.exports={
    connection
}



//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2Mzk2ZjNmODUzMDc3NTYzMWYwYTYzNWEiLCJpYXQiOjE2NzA4Mzc5MTR9.7oMUvCeefiRc-xwNX17wRsFcBGPgYBXjN1Lfac1rSi8