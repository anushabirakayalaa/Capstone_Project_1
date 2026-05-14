import { UserTypeModel } from "../models/userModel.js" 
export const checkAuthor=async(req,res,next)=>
{
    //get author id
    let aid=req.body?.author || req.params?.authorId
    //verify author
    let author= await UserTypeModel.findById(aid);
    if(!author,author.role!=="AUTHOR")
    {
         return res.status(404).json({
        message: "Author not found or invalid role"
      });
    }
    //if author blocked
    if(!author.isActive)
    {
        return res.status(403).json({message:"User is not Active"})
    }
    //if author found but role is different
    if(author.role!=='AUTHOR')
    {
        return res.status(403).json({message:"User Not Author"})
    }
//forward req to next
next();
}