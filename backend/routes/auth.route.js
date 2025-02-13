import express from "express";
import * as  authController from "../controllers/auth.controller.js"; 
const authRouter = express.Router();

// Signin route
authRouter.post('/signin', authController.signin);

// Signup route
authRouter.post('/signup', authController.signup);


export default authRouter;