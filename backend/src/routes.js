import express from "express";
import { getAllUsers, createUser, updateUser, deleteUser, getAllTasks, loginUser, chatRugby } from "./userController.js";

const router = express.Router();

router.get('/tasks', getAllTasks);
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.post("/login", loginUser);
  
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.post("/chatRugby", chatRugby);

export default router;
