import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { hashPassword, JWT_SECRET } from '../utils/index.util.js';
import User from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

// Signup function
export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        
        const existingUser = await User.findOne({email: email});
        
        if(existingUser){
            res.status(422).json(new ApiError(422,error,"Email already exists."));
            return ;
        }
        const hashedPassword = hashPassword(password);
        const newUser = User.create({
            fullname,
            email,
            password: hashedPassword
        })        
        res.status(201).json(new ApiResponse(201,newUser,"User created successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(500,error,"Error registering user"));
    }
};

// Signin function
export const signin = async (req, res) => {
    
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email: email}).select("-__v");
        const isPasswordValid = await bcrypt.compare(password, user?.password || "invalid-passwordkfjldsjfldsajkdsjgjd");
        
        if (!user || !isPasswordValid) {
            return res.status(422).json(new ApiError(422,null,"Invalid username or password"));
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json(new ApiResponse(200,{token,user},"User signed in successfully."));
    } catch (error) {
        res.status(500).json(new ApiError(500,error,"Error signing in"));
    }
};

