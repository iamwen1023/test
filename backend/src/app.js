import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes.js";
import prisma from "./prisma.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Ensure Prisma client is connected
prisma.$connect().catch((error) => {
  console.error('Prisma connection error:', error);
});
