import User from "../models/user.model.js";
import { hashPassword } from "./index.util.js";


export default async function seedToDb(){
    const existingUser = await User.findOne({
        email: "admin@gmail.com",
    });
    if(existingUser) return;
    const defaultUser = await User.insertOne({
        fullname: "admin",
        email: "admin@gmail.com",
        password: hashPassword("admin")
    });
    console.log("-----Default--------");
    console.log(defaultUser);
}