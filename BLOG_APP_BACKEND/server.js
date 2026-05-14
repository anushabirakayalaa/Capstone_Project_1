import exp from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { userRoute } from "./APIS/UserAPI.js"
import { authorRoute } from './APIS/AuthorAPI.js'
import { adminRoute } from './APIS/AdminAPI.js'
import cookieParser from "cookie-parser";
import { commonRoute } from './APIS/CommonAPI.js'
import cors from 'cors'
config()//process.env

const PORT = process.env.PORT || 4000

//create express application    
const app = exp()
//use cors middleware
const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  const deployedOrigins = ["https://blogtest1.onrender.com"];

  if (deployedOrigins.includes(origin)) {
    return true;
  }

  try {
    const { hostname, protocol } = new URL(origin);
    return protocol === "http:" && ["localhost", "127.0.0.1"].includes(hostname);
  } catch {
    return false;
  }
};

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
        //why did we write credentials:true??
//ADDING BODY PARSER MIDDLEWARE
app.use(exp.json())//function.function? why
//add cookie parser middleware
app.use(cookieParser())
//Connect APIs
app.use('/user-api',userRoute)
app.use('/author-api',authorRoute)
app.use('/common-api',commonRoute) 
app.use('/admin-api',adminRoute)

//logout for user,author and admin
// app.post('/logout',(req,res)=>
// {
//     //clear the cookie named token
//     res.clearCookie('token',{
//         httpOnly:true, //Must match original settings
//         secure:false, //Must match original settings
//         sameSite:"lax" //Must match original settings
//     })
// })
//connect to db
const connectDB = async()=>
{   try{
    if (!process.env.DB_URL) {
      throw new Error("DB_URL is missing in .env")
    }

    await connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 10000,
    })//access from .env file
    console.log("DB Connection succesful")
    //start http server
    app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))
   }catch(err)
   {
    console.log("Error in DB Connection",err)
   }
}
connectDB()

// //random test route--not required, its only to check if the server is working or not  
// app.get('/test',(req,res)=>{
//     res.send("Server working")
// })


//dealing with invalid-path----keep it always on top of the error handling (To handle any inavlid urls in req.http)
app.use((req,res,next)=>
{
    console.log(req.url)
    res.json({message:`${req.url} is invalid path`})
})

//error handling
app.use((err, req, res, next) => {

  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Full error:", err);

  // mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  // ✅ HANDLE CUSTOM ERRORS
  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // default server error
  res.status(500).json({
    message: "error occurred",
    error:
      process.env.NODE_ENV === "development"
        ? err.message || "Server side error"
        : "Server side error",
  });
});

