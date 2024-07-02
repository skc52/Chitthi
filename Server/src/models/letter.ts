import mongoose, {CallbackError, Document, Schema} from "mongoose";
import { IUser } from "./user";
// DEFINE INTERFACE FOR USER DOCUMENT

export interface ILetter extends Document{
    message:string;
    sender:IUser; //username
    receiver:IUser; //username
    dateOfWriting:Date;
    arrivalDate:Date;
    
    // Methods here
    
}

// DEFINE LETTER SCHEMA
const LetterSchema:Schema = new Schema({
    message:{type:String, required:true},
    sender:{type:String, required:true},
    receiver:{type:String, required:true},
    dateOfWriting:{type:Date, required:true},
    arrivalDate:{type:Date, required:true},
    ticketType:{type:String} 
});








// CREATE AND EXPORT THE MODEL
const Letter =  mongoose.model<ILetter>('Letter', LetterSchema);
export default Letter;
