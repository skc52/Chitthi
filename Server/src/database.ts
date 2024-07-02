import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI as string;

import  { ConnectOptions } from 'mongoose';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  } as ConnectOptions);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MONGODB connection error:'));
db.once('open', ()=>{
    console.log('Connected to MONGODB');
});


