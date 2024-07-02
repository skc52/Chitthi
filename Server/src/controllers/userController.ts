import {Request, Response} from 'express';
import User, {IUser} from '../models/user';
// import { parseISO, differenceInYears } from 'date-fns'
// REGISTER USER
export const createUser = async(req:Request, res:Response): Promise<void>=>{
    try {
        
        const { name, password, dateOfBirth, country, username, photoLink } = req.body;

        // Create a new user document
        const newUser: IUser = new User({
            name,
            password,
            dateOfBirth,
            country,
            username,
            photoLink
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        const token = savedUser.generateAuthToken();

        res.cookie('authToken', token, {httpOnly:true})

        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
}




export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const loginUser: IUser | null = await User.findOne({ username }).select("+password");

        if (!loginUser) {
            // User not found, send error response
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // Check if the password matches
        const isPasswordValid: boolean = await loginUser.comparePassword(password);

        if (isPasswordValid) {
            // Password matches, login successful
            const token = loginUser.generateAuthToken();

            res.cookie('authToken', token, { httpOnly: true });
            res.status(200).json({ message: 'Login successful' });

        } else {
            // Invalid password, send error response
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        // Server error
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


export const logout = async(req:Request, res:Response) : Promise<void> =>{
    try {
        res.cookie("authToken", null, {
            expires:new Date(Date.now()),
            httpOnly:true,
        });

        res.status(200).json({
            success:true,
            message:"Logged Out",
        })

    } catch (error) {
         // Server error
         console.error('Error logging out:', error);
         res.status(500).json({ error: 'Server error' });
    }
}

export const getOwnProfile = (req: Request, res: Response) => {
    if (req.user) {
        const currentUser: IUser = req.user;
        res.json({ user: currentUser });
    } else {
        res.status(401).json({ error: 'Unauthorized: User not found' });
    }
};

export const getProfile = async(req: Request, res: Response):Promise<void> => {
    try {
        const { username } = req.params;

        // Find the user by username
        const user: IUser | null = await User.findOne({ username: username });

        if (!user){
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json({
            user:user,
            message:"User found!"
        })

    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).json({ error: 'Server error' });
    }
};



export const getRandomUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract filters from the request body
    // ageRange = [x, y] meaning from age x to y , for example from age 18 to 22
    // countries = [a, b, c]; list of country names
    const { countries, ageRange } = req.body;

    // Build the query object based on filters
    const query: any = {};

    if (countries && countries.length > 0) {
      query.country = { $in: countries };
    }

    if (ageRange && ageRange.length == 2) {
        const currentDate = new Date();

        const minAge = ageRange[1]; 
        const maxAge = ageRange[0]; 
  
        const minBirthDate = new Date(currentDate.getFullYear() - minAge, currentDate.getMonth(), currentDate.getDate());
        const maxBirthDate = new Date(currentDate.getFullYear() - maxAge, currentDate.getMonth(), currentDate.getDate());
  
        query.dateOfBirth = {
          $gte: minBirthDate,
          $lte: maxBirthDate
        };
    }

    // Count the total number of users matching the query
    const count = await User.countDocuments(query);

    if (count === 0) {
      res.status(404).json({ error: 'No users found matching the criteria' });
      return;
    }

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * count);

    // Fetch one random user by skipping to the random index
    const randomUser: IUser | null = await User.findOne(query).skip(randomIndex);

    if (!randomUser) {
      res.status(404).json({ error: 'No users found in the database' });
      return;
    }

    res.status(200).json(randomUser);
  } catch (error) {
    console.error('Error fetching random user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
