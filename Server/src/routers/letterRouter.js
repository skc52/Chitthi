import express from 'express';
import { sendLetter, getAllLetters, getLettersWithUser} from '../controllers/letterController';
import { authenticateUser } from '../middlewares/authmiddleware';
const router = express.Router();


router.route("/sendLetter").post(authenticateUser,sendLetter);
router.route("/letters/own").get(authenticateUser,getAllLetters);
router.route("/letter/:userId").get(authenticateUser,getLettersWithUser);


export default router;
