const express = require('express')
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors'); // Import the 'cors' package
const connectToMongo = require('../server/db/dataBase')
const app = express()
const port = process.env.PORT || 5000; // Use the PORT from .env or default to 5000
connectToMongo()

// middleware for req.body
app.use(express.json())


// Enable CORS for all routes
app.use(cors());



// import route //////

const authRoutes = require('./routes/auth')
const taskRoutes = require('./routes/task')


app.get('/', (req, res) => {
  res.send('Hello World!')
})



// use routes
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)


app.listen(port, () => {
  console.log(`Task app backend listening on port http://localhost:${port}`)
})