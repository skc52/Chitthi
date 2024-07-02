import express from 'express';
import { createUser, loginUser, logout, getOwnProfile, getRandomUser, getProfile } from '../controllers/userController';
import { authenticateUser } from '../middlewares/authmiddleware';
const router = express.Router();

// POST /users
router.post('/', createUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/profile/own").get(authenticateUser,getOwnProfile);
router.route("/profile/:username").get(authenticateUser,getProfile);

router.route("/getRandomUser").get(authenticateUser,getRandomUser);

export default router;
