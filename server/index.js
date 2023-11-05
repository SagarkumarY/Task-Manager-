const express = require('express')
const connectToMongo = require('../server/db/dataBase')
const app = express()
const port = 5000
connectToMongo()
 
// middleware for req.body
app.use(express.json())

// import route //////

const authRoutes  = require('./routes/auth')
const taskRoutes  = require('./routes/task')

 
app.get('/', (req, res) => {
  res.send('Hello World!')
})



  // use routes
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
  

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})