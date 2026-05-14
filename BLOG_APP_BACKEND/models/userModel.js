import {Schema,model} from 'mongoose'

const userSchema = new Schema(
{
    firstName:{
        type:String,
        required:[true,"First NAme is required"]
    },
    lastName:{ 
        type:String,   
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email alrady existed"]
    }, password:{
        type:String,
        required:[true,"password is required"]
    },

    profileImageUrl:{
        type:String,
    },
    role:{
        type:String,
        enum:["AUTHOR","USER","ADMIN"],
        required:[true,"{Value} is Invalid Role"]
    },
    isActive:{
        type:Boolean,
        default:true,        
    },
},{
        timestamps:true,
        strict:"throw",
        versionKey:false,
},);
//create model
export const UserTypeModel = model("user",userSchema);//why used Type here