import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.route.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import userRouter from "./routes/user.route.js";
import fs from "fs";
import path from "path";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello i am up and running fine.!');
});

app.get("/uploads/:filename/:token",authMiddleware,function (req,res){
    const userId = req.user.id;
    const filename = userId+"-#-"+decodeURIComponent(req.params.filename);
   const filePath = path.join(path.resolve("."),"uploads",filename);
    
    if(!fs.existsSync(filePath)){
        res.send("Access denied or Invalid filename");
    }
    else{
        const file = fs.readFileSync(filePath);
        const fileType = path.extname(filePath);
        res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
        const mimeTypes = {
            '.txt': 'text/plain',
            '.html': 'text/html',
            '.js': 'application/javascript',
            '.json': 'application/json',
            '.css': 'text/css',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.pdf': 'application/pdf',
        };
        const contentType = mimeTypes[fileType] || 'application/octet-stream';
        res.setHeader('Content-Type', contentType);
        res.send(file);
    }
})

app.use("/auth",authRouter);
app.use("/user",authMiddleware,userRouter);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});