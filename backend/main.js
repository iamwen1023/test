const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // For handling CORS (if needed)
const { Pool } = require('pg'); // PostgreSQL client
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const app = express();
const port = 5000; // Use environment variable for port

app.use(cors()); // Enable CORS if needed
app.use(bodyParser.json()); // Parse JSON request bodies

const pool = new Pool({
  user: 'postgres', // Replace with your database credentials
  host: 'localhost',
  database: 'template1', // Replace with your database name
  password: 'password', // Replace with your database password
  port: 5432,
});

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await prisma.task.findMany();
    // res.json(result.rows);
    res.json("hello")
    console.log('database connected')
  } catch (error) {
    console.error(error);
  }
})
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
