import express from "express";
import { login, logout, almostThere,signup } from "../Controllers/auth.js";
import { protectRoute } from "../Middleware/auth_middleware.js";

const router=express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

router.post("/almostThere",protectRoute,almostThere);

router.get("/me",protectRoute,(req,res)=>{
    res.status(200).json({success:true,user:req.user});
});

export default router;