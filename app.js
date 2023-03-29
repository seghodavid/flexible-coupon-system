const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const cartRouter = require("./routes/cart")

const errorHandlerMiddleware = require("./middleware/error-handler")
const notFoundMiddleware = require("./middleware/not-found")

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

//Routes
app.use('/api/v1/cart', cartRouter)

// Error handling middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT= process.env.PORT || 5001



const start = async() => {
    await app.listen(PORT, console.log(`Server is running on port ${PORT}...`))
}

start();