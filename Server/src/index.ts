import express from 'express';
import './database'; // Import database connection
import cors from 'cors';
import usersRouter from './routers/userRouter';
import { IUser } from './models/user';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;



// Parse cookies
app.use(cookieParser());

declare global{
  namespace Express{
      interface Request{
          user?:IUser; //Add user property to Request Interface
      }
  }
}
// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/users', usersRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
