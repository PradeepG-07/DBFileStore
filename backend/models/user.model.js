import mongoose, {Schema} from "mongoose";

const userSchema  =  new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});
const userModel  = mongoose.model("users",userSchema);
export default userModel;