import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes.js";
import prisma from "./prisma.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
  }));
app.use(bodyParser.json({ type: "application/vnd.api+json", strict: false }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  createInitialUser();
});

prisma.$connect().catch((error) => {
  console.error('Prisma connection error:', error);
});


async function createInitialUser() {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: 'john@example.com',
      },
    });

    if (existingUser) {
      console.log('User with this email already exists.');
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: 'john@example.com',
          name: 'Initial User',
          password: 'securepassword',
        },
      });
      console.log('Initial user created:', newUser);
    }
  } catch (error) {
    console.error('Error checking or creating initial user:', error);
  } finally {
    await prisma.$disconnect();
  }
}