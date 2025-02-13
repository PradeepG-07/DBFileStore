import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.route.js";
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello i am up and running fine.!');
});

app.use("/auth",authRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});