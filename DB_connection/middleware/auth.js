const loginmmm=require("../src/dbschema/schema")
const jwt=require("jsonwebtoken")

const check=async(req,res,next)=>{
    try {
        const token=req.cookies.cook;
        const verified=jwt.verify(token,process.env.SECRET_KEY);
        const user=await loginmmm.findOne({email:req.body.email})
        req.token=token;
        req.user=user;     //creating by ourself
       if(user!==null)
        next()
        else{
            res.send(`<h1>Invalid details...User not found</h1>`)
        }

    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }
}

module.exports=check;