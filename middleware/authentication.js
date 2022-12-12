const jwt=require("jsonwebtoken")

const authneticate=(req,res,next)=>{
    const token=req.headers?.authorization?.split(" ")[1]

    if(token){
        const decoded=jwt.verify(token,"hush")
        if(decoded){
            const userID=decoded.userID
            req.body.userID=userID
            next()
        }
        else{
            res.send("Please Login first")
        }
    }else{
        res.send("please login")
    }
}


module.exports={authneticate}