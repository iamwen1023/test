import e from 'express';
import prisma from './prisma.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;
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
        const token = jwt.sign({ email: foundUser.email }, secretKey, { expiresIn: '24h' });
        return res.json({ token, message: 'Login successful' });
        // return res.status(200).send('login successful');
      } else {
        return res.status(400).json({
          errors: [{ detail: "Invalid password" }],
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to login user" });
  }
};
