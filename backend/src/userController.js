import e from 'express';
import prisma from './prisma.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
export const getAllTasks = async (req, res) => {
  console.log('hello')
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
    console.log(res);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { name, email, age },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Update an existing user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email, age },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// Login a user

export const loginUser = async (req, res, next) => {
  // console.log(JSON.stringify(req.body));
  const { email, password } = req.body.data.attributes;
  try {
    let foundUser = await prisma.user.findUnique({  where: { email } });
    if (foundUser == null) {
      return res.status(200).json({
        errors: [{ detail: "Credentials don't match any existing users" }],
      });
    } else {
      // const validPassword = await bcrypt.compare(password, foundUser.password);
      const validPassword = (password === foundUser.password);
      console.log(validPassword);
      if (validPassword) {
      // Generate JWT token
        const token = jwt.sign(
          { id: foundUser.id, email: foundUser.email },
          "token",
          {expiresIn: "24h",}
        );
        return res.status(200).json({
          token_type: "Bearer",
          expires_in: "24h",
          access_token: token,
          refresh_token: token,
        // return res.status(200).send('hello');
      });
      } else {
        return res.status(400).json({
          errors: [{ detail: "Invalid password" }],
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to login user" });
  }
  
};

