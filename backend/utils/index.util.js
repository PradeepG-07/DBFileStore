import bcrypt from "bcrypt";

export const JWT_SECRET= "jackandjillwentupthehill";
export const users=[];
export function hashPassword(plaintext){
    return bcrypt.hashSync(plaintext,bcrypt.genSaltSync(10));
}