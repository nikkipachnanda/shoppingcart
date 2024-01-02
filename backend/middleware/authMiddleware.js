import Jwt  from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";
import { JWT_SECRET } from '../seckey.js';


const protect = asyncHandler(async (req, res, next) => {
   let token;
  
    // Read JWT from the 'jwt' cookie

    token = req.cookies.jwtoken;
   // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTdmMGQ4ZWNiODM5M2Y2NDQzYjE2OTEiLCJpYXQiOjE3MDI4MzAxNjR9.24j1r3RFaCDdFS_EqNYk9v5LEYHUBawxHIVMQ-qqi4g";
    console.log("tooken"+ token);
  
    if (token) {
      try {
        const decoded = Jwt.verify(token, "abc123");
       // req.user = await User.findById(decoded.userId).select('-password');

         const rootUser = await User.findOne({_id:decoded._id, "tokens.token": token});
         req.token = token;
         req.rootUser = rootUser;
         req.userId = rootUser.id;
       console.log("user id tokens" + req.userId);
        next();
          console.log("token verified done");
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  });
  
  // User must be an admin
  const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error('Not authorized as an admin');
    }
  };
  
  export { protect, admin };
