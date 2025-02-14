import fs from 'fs';
import path from 'path';
// import { users } from '../utils/index.util.js';
import User from "../models/user.model.js";
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
const uploadsDir = path.resolve("./uploads");


const getUserInfo = async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-__v -password");
    try {
        if (user) {
            res.status(200).json(new ApiResponse(200,user,"User details fetched successfully."));
        } else {
            res.status(404).json(new ApiError(404,null,"User not found."));
        }
        
    } catch (error) {
        res.status(500).json(new ApiError(500,error,"Internal server error"));
    }
    
};

const getUserFiles = async(req, res) => {    
    const userId = req.user.id;
    const userDir = path.join(uploadsDir);
    try {
        fs.readdir(userDir, (err, files) => {
            if (err) {
                return res.status(500).json({ message: 'Error reading directory' });
            }
            let userFiles=[];
            files.map((file)=>{
                
                if(file.startsWith(userId)){
                    const extension = path.extname(file);
                    const fileSizeInBytes = fs.statSync(path.join(userDir, file)).size/1000;
                    userFiles.push({ name: file, type:extension, size: fileSizeInBytes });
                }
            
        });
            res.status(200).json(new ApiResponse(200,{files: userFiles},"Files fetched successfully."));
        });
        
    } catch (error) {
        res.status(500).json(new ApiError(500,error,"Internal server error"));
    }
   
};

const addUserFiles = (req, res) => {
    const userId = req.user.id;
    const file = req.file;
    if (!file) {
        return res.status(422).json(new ApiError(422,null,"No file Uploaded"));
    }

    const filePath = path.join(uploadsDir, req.user.id+"-#-"+file.originalname);
    try {
        if(fs.existsSync(filePath)){
            res.status(201).json(new ApiResponse(201,null,"File uploaded successfully."));
        }
        else{
            return res.status(500).json(new ApiError(500,null,"Error saving file"));
        }
    } catch (error) {
        res.status(500).json(new ApiError(500,error,"Internal server error"));
    }
    
   
};

const deleteUserFiles = (req, res) => {
    const userId = req.user.id;
    const fileId = req.params.fileId;
    const filePath = path.join(uploadsDir,userId+"-#-"+fileId);

    try {
        if(fs.existsSync(filePath)){
            fs.unlink(filePath, (err) => {
                if (err) {
                    return res.status(500).json(new ApiError(500,err,"Error occurred while deleting the file."));
                }
                res.status(200).json(new ApiResponse(200,null,"File Deleted successfully."));
            });
            return ;
        }
        res.status(404).json(new ApiError(404,null,"File not found."));
        
    } catch (error) {
        res.status(500).json(new ApiError(500,error,"Internal server error"));

    }
    
    
};

export default {
    getUserInfo,
    getUserFiles,
    addUserFiles,
    deleteUserFiles
};