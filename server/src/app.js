const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('../src/routes/userRoutes')

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}))

// app.use(bodyParser.urlencoded({ extended: true })) 

app.get('/', (req, res) => {
  res.send('API..กำลังทำงาน');
})
app.use('/', userRoutes)

module.exports = app