import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET,users } from '../utils/index.util.js';

// Signup function
export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { fullname, email, password: hashedPassword };
        users.push(newUser);
        console.log("signup");
        
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Signin function
export const signin = async (req, res) => {
    
    const { email, password } = req.body;

    try {
        const user = users.find(user => user.email === email);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'User signed in successfully', token,user });
    } catch (error) {
        res.status(500).json({ message: 'Error signing in', error });
    }
};

