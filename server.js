const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./src/config/db')
const http = require('http');
const server = http.createServer(app);
require('dotenv').config()

const port = process.env.PORT

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(
    cors({
        origin: process.env.CORS_URL,
        credentials: true
    })
)

app.use('/',require('./src/routes/userRoutes'))
app.use('/', require('./src/routes/authRoutes'))

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
