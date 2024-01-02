import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  logoutUser
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

import jwt from "jsonwebtoken";
const jwtKey = "e-com";

const router = express.Router();

// const verifyToken = (req, resp, next) =>
// {
//   const bearerHeader = req.headers['authorization'];
  
//   if (typeof bearerHeader !== 'undefined') 
//   {
//     const bearer = bearerHeader.split(" ");
//     const token  = bearer[1];
//     req.token = token;
//     next();
//   }
//   else {
//     resp.send({
//       result:'Token is not valid'
//     })
//   }
// }

router.route('/').post(registerUser).get(getUsers);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(deleteUser).get(getUserById).put( updateUser);

export default router;