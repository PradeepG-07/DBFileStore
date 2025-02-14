import mongoose from "mongoose";

export default async function connectToDatabse(){
    await mongoose.connect("mongodb://localhost:27017",{
        dbName: "day10code"
    });
}