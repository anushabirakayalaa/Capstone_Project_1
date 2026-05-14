import { UserTypeModel } from "../models/userModel.js";


export const checkUser = async(req,res,next)=>{
    let userId = req.params?.uid;
    if(userId === undefined){
        res.status(404).json({message:"no id is undefined"})
    }
    let isMatch = await UserTypeModel.findOne({_id:userId,role:"USER"});
    if(!isMatch){
        res.status(404).json({message:"No Access"})
    }

    next();
}