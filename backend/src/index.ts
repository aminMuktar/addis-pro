// "test": "jest --watchAll --no-cache"
import mongoose, { ConnectOptions } from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";

dotenv.config()
// console.log(process.env)
const init= async ()=>{
  if(!process.env.MONGO_URI){
    throw new Error('MONGO_URL is not setin environment')
  }
  try{
    await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true
  } as ConnectOptions);

  console.info('Connected to Songs MongoDB')
  }
  catch(error){
    console.error(error)
  }
  app.listen(5000, ()=>{
    console.log('Song service listening on port 5000')
  })
}

init()