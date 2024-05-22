import express from "express";
import { loginUser, chatRugby } from "./userController.js";

const router = express.Router();


router.post("/login", loginUser);
router.post("/chatRugby", chatRugby);

export default router;
