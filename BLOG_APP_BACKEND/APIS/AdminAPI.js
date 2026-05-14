import exp from 'express'
import { verifyToken } from '../middlewares/verifyToken.js';
import { ArticleModel } from '../models/articleModel.js';
import { UserTypeModel } from '../models/userModel.js';
import { checkAdmin } from '../middlewares/checkAdmin.js';

export const adminRoute=exp.Router()


//authenticate admin --> this method is in common api
// adminRoute.post('/login',async(req,res)=>{
//     let {email,password} = req.body;
//     let findAdmin = await UserTypeModel.findOne({email:email});
//     if(!findAdmin){
//         res.status(403).json({message:"Invalid admin"})
//     }
//     if(findAdmin.password !== password){
//         res.status(403).json({message:"Invalid admin password"})
//     }
//     res.status(200).json({message:"Admin loggedin"})
// })


//read all articles(optional)
adminRoute.get("/:aid/articles",verifyToken,checkAdmin,async(req,res)=>{
    // reading all the articles available
    let allArticles = await ArticleModel.find();

    res.status(200).json({message:"all articles",payload:allArticles});
})

//Block users
adminRoute.put('/:aid/block/:userId',verifyToken,checkAdmin,async(req,res)=>
{
    //get user id
    let user=req.params.userId
    //get user from userId
    let userObj = await UserTypeModel.findOne(user)
    if(!userObj)
    {
        res.status(401).json({message:"User not found "})
    }
let blockedUser=await UserTypeModel.findByIdAndUpdate(user, { isActive: false })
res.status(200).json({message:"Blocked successfully "})
})

//Unblock user 

adminRoute.put('/:aid/unblock/:userId',verifyToken,checkAdmin, async (req, res) => {
    let userId = req.params.userId
    let unblockedUser= await UserTypeModel.findByIdAndUpdate(userId, { isActive: true })
    res.json({ message: "User unblocked successfully" })
})

// db.users.insertOne({firstName:"admin",lastName:"admin",email:"admin@gmail.com",
//     password:"$2a$12$rAsDrTvHblegirYgzmtnauPdl0Eg8nj20tVo319eC9HN9DOrIhG9m",role:"ADMIN"})