import dotenv from "dotenv";
import express from "express";
import dbconnect from "./database/index.js";
dotenv.config({
    path: "./.env"
})

dbconnect()






















// const app = express();
// (async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         console.log("DB connection successful")

//         app.on('error',(error)=>{
//             console.log("ERROR:", error)
//             throw error
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
//     }
//     catch(error){
//         console.log("ERROR:", error)
//         throw error
//     }
// })()