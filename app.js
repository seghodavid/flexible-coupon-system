const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");



dotenv.config()
const app = express()

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit each IP request to  100 requests per window
  })
);

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(xss())
app.use(morgan('dev'))


app.get('/', (req, res, next) => {
    res.send("<h1>Welcome to the Scello Assessment homepage</h1>")
})

const PORT= process.env.PORT || 5001



const start = async() => {
    await app.listen(PORT, console.log(`Server is running on port ${PORT}...`))
}

start();