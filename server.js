const express = require('express')
const cors=require('cors')
const app = express()
const connectDB=require('./src/config/db')
require('dotenv').config()

const port = process.env.PORT

connectDB()

app.use(express.urlencoded({extended:true}))
app.use(
  cors({
      origin: process.env.CORS_URL,
      credentials: true
  })
)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});