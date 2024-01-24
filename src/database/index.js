import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
import { ApiError } from '../utils/ApiError.js';

const dbconnect = async ()=>{
    try{
        const connectionInstance=mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("DATABASE CONNECTION SUCCESSFUL, \nHOST:",(await connectionInstance).connection.host);
    }
    catch(error){
        throw new ApiError(410,"DATABASE CONNECTIVITY ERROR",error)
        process.exit(1);
    }
}

export default dbconnect;