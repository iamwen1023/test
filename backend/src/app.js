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
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
  }));
app.use(bodyParser.json({ type: "application/vnd.api+json", strict: false }));
// Configure body parsing for JSON requests


app.use("/api", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Ensure Prisma client is connected
prisma.$connect().catch((error) => {
  console.error('Prisma connection error:', error);
});
