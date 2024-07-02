import mongoose, {CallbackError, Document, Schema} from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

// DEFINE INTERFACE FOR USER DOCUMENT
export interface IUser extends Document{
    name:string;
    password:string;
    dateOfBirth:Date;
    country:string;
    username:string;
    photoLink:string;
    // Method to compare passwords
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateAuthToken():string;
}

// DEFINE USER SCHEMA
const UserSchema:Schema = new Schema({
    name: {type:String, required:true},
    password: {type:String, required:true, select:false},
    dateOfBirth: {type:Date, required:true},
    country: {type:String, required:true},
    username: {type:String, required:true, unique:true},
    photoLink: {type:String}
});


UserSchema.pre<IUser>('save', async function(next){
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error as CallbackError);
    }
})

UserSchema.methods.comparePassword = async function(candidatePassword:string):Promise<boolean>{
    try {
        const match = await bcrypt.compare(candidatePassword, this.password);
        return match;
        
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return false; // Return false on error or if passwords don't match
    }
}

UserSchema.methods.generateAuthToken = function():string{
    const token = jwt.sign({_id:this._id}, process.env.SECRET_KEY as string);
    return token;
}

// CREATE AND EXPORT THE MODEL
const User =  mongoose.model<IUser>('User', UserSchema);
export default User;
