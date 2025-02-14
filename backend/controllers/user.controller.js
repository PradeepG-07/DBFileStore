import fs from 'fs';
import path from 'path';
import { users } from '../utils/index.util.js';
const uploadsDir = path.resolve("./uploads");


const getUserInfo = (req, res) => {
    const userId = req.params.id;
    const userInfo = users.find(user=>user.id==userId);
    if (userInfo) {
        delete userInfo.password;
        res.json(userInfo);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const getUserFiles = async(req, res) => {    
    const userId = req.user.id;
    const userDir = path.join(uploadsDir);
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
        res.status(200).json({files: userFiles});
    });
};

const addUserFiles = (req, res) => {
    const userId = req.user.id;
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = path.join(uploadsDir, req.user.id+"-#-"+file.originalname);
    
    if(fs.existsSync(filePath)){
        res.status(201).json({ message: 'File uploaded successfully' });
    }
    else{
        return res.status(500).json({ message: 'Error saving file' });
    }
};

const deleteUserFiles = (req, res) => {
    const userId = req.user.id;
    const fileId = req.params.fileId;
    const filePath = path.join(uploadsDir,userId+"-#-"+fileId);
    
    if(fs.existsSync(filePath)){
        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting file' });
            }
            res.json({ message: 'File deleted successfully' });
        });
        return ;
    }
    res.json({message: "File not found."})
};

export default {
    getUserInfo,
    getUserFiles,
    addUserFiles,
    deleteUserFiles
};