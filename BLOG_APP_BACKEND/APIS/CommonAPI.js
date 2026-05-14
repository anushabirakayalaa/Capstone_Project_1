import exp from 'express';
import { authenticate } from '../services/authService.js';
import {verifyToken} from '../middlewares/verifyToken.js';
import { UserTypeModel } from '../models/userModel.js';
export const commonRoute=exp.Router()

//login 
commonRoute.post("/login",async(req,res)=>
{
    //get user cred Object
        let userCred = req.body
        //call authenticate service
        let{token,user}=await authenticate(userCred)
        //save token as http only cookie
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"lax",
            secure:false,
    })
    //send response
    res.status(200).json({message:"Login Successful",token,payload:user})
})

//logout
const logoutHandler = (req,res)=>
{
    //clear the cookie named token
    res.clearCookie('token',{
        httpOnly:true, //Must match original settings
        secure:false, //Must match original settings
        sameSite:"lax" //Must match original settings
    })
    res.status(200).json({message:"Logged out successfully"})
}

commonRoute.get('/logout',logoutHandler)
commonRoute.post('/logout',logoutHandler)

//change password
// commonRoute.put('/change-password/:userId',async(req,res)=>
// {
//     //get current pass and new pass
//     //let user=req.params.userId
//     //check the current pass and new password
//     //replace current password 
//     //send res
// })


//page refresh
commonRoute.get("/check-auth",verifyToken("USER","AUTHOR","ADMIN"),async(req,res,next)=>
{
    try {
        const user = await UserTypeModel.findById(req.user.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message:"authentication",
            payload:user
        });
    } catch (error) {
        next(error);
    }
});
