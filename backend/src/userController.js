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
      data: { name, email, password },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Update an existing user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email, password },
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
export const chatRugby = async (req, res) => {
  console.log(req.body);



  // Generate a random rugby-related message with a touch of humor
  const messages = [
    "The try line beckons, but the defense holds firm!",
    "A bone-crushing tackle sends shivers down the spine!",
    "The conversion soars through the posts, a moment of pure exhilaration!",
    "The whistle blows, a tense battle concludes with a handshake of respect.",
    "The rain pours down, but the passion for the game burns bright!",
    "A daring chip kick bamboozles the opposition, a flash of brilliance!",
    "The haka echoes through the stadium, a spine-tingling war cry.",
    "The camaraderie of teammates, a bond forged in the heat of competition.",
    "The roar of the crowd erupts as the underdog claims victory!",
    "The smell of freshly cut grass mingles with the cheers of the fans."
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return res.status(200).json({
    message: randomMessage
  });
}
export const loginUser = async (req, res, next) => {
  console.log(req.body);
  // console.log(JSON.stringify(req.body));
  const { email, password } = req.body.data.attributes;
  try {
    let foundUser = await prisma.user.findUnique({  where: { email } });
    if (foundUser == null) {
      return res.status(200).json({
        errors: [{ detail: "Credentials don't match any existing users" }],
      });
    } else {
      const validPassword = (password===foundUser.password);
      console.log(validPassword);
      if (validPassword == true){
        return res.status(200).send('login successful');
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

// app.use(express.json());

// app.get('/resource', (req, res) => {
//   res.status(200).json({ data: "Here is the requested resource" });
// });

// app.post('/resource', (req, res) => {
//   // Assuming the resource is created and has an ID of 12345
//   res.status(201).location('/resource/12345').json({ message: "Resource created successfully", resourceId: "12345" });
// });

// app.put('/resource/:id', (req, res) => {
//   res.status(200).json({ message: "Resource updated successfully" });
// });

// app.delete('/resource/:id', (req, res) => {
//   res.status(204).send();
// });

// app.patch('/resource/:id', (req, res) => {
//   res.status(200).json({ message: "Resource updated successfully" });
// });