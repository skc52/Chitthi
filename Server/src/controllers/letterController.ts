import {Request, Response} from 'express';
import User, {IUser} from '../models/user';
import Letter, {ILetter} from '../models/letter';


//SEND LETTER
export const sendLetter = async(req:Request, res:Response):Promise<void>=> {
    try {
        const { message, receiver} = req.body;

        //
        const dateOfWriting:Date = new Date();
        const arrivalDate:Date = new Date();

        //calculate arrivalDate
        //TODOget the distances between countries of sender and receiver - 500 miles = 1 hour


        // Create a new user document
        const newLetter: ILetter = new Letter({
            message:message,
            sender:req.user?._id,
            receiver:receiver._id,
            dateOfWriting,
            arrivalDate
        });

        // Save the user to the database
        const savedLetter = await newLetter.save();


        res.status(201).json(savedLetter);

    } catch (error) {
        console.error('Error sending letter:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

export const getAllLetters = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const letters = await Letter.find({ sender: userId });
        res.status(200).json(letters);
    } catch (error) {
        console.error('Error fetching letters:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

// GET LETTERS WITH SPECIFIC USER
export const getLettersWithUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        const specificUserId = req.params.userId;

        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const letters = await Letter.find({ sender: userId, receiver: specificUserId });
        res.status(200).json(letters);
    } catch (error) {
        console.error('Error fetching letters with user:', error);
        res.status(500).json({ error: 'Server error' });
    }
}