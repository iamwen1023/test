import express from "express";
import { getAllUsers, createUser, updateUser, deleteUser, getAllTasks } from "./userController.js";

const router = express.Router();

router.get('/tasks', getAllTasks);
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
