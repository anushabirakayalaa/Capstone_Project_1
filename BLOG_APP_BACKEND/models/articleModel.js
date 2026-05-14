import {Schema,model} from 'mongoose'
//embedded
//create user comment Schems
const userCommentSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,//
        ref:"user",
    },
    comment:{
        type:String,
    },
});
//create article Schema
const articleSchema = new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:[true,"Author id required"],
    },
    title:{
        type:String,
        required:[true,"title required"],
    },
    category:{
        type:String,
        required:[true,"Category required"],
    },
    content:{
        type:String,
        required:[true,"Content required"],
    },
    imageUrl:{
        type:String,
    },
    comments:[userCommentSchema],
    isArticleActive:{
        type:Boolean,
        default:true,
    },

},{
    strict:"throw",
    timestamps:true,
    versionKey:false
})

export const ArticleModel=model("article",articleSchema)
