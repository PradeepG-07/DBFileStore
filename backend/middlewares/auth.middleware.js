import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/index.util.js";
const authMiddleware = (req, res, next) => {
    
    try {
        const token = req.headers?.authorization?.split('Bearer ')[1] || req.params?.token;
    
        if (!token) {
            return res.status(401).send({ error: 'No token provided' });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).send({ error: 'Invalid token' });
    }
};

export default authMiddleware;