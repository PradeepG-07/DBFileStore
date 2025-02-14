import express from 'express';
import userController from '../controllers/user.controller.js';
import upload from '../utils/multer.js';

const userRouter = express.Router();

// Get list of images
userRouter.get('/files', userController.getUserFiles);
// Get user info
userRouter.get('/:id', userController.getUserInfo);

// Add an image
userRouter.post('/files',upload.single("image"), userController.addUserFiles);

// Delete an image
userRouter.delete('/files/:fileId', userController.deleteUserFiles);

export default userRouter;