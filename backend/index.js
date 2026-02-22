require("dotenv").config()
const express = require('express')
const cors = require('cors')
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/Auth")
const productRoutes = require("./routes/Product")
const orderRoutes = require("./routes/Order")
const cartRoutes = require("./routes/Cart")
const brandRoutes = require("./routes/Brand")
const categoryRoutes = require("./routes/Category")
const userRoutes = require("./routes/User")
const addressRoutes = require('./routes/Address')
const reviewRoutes = require("./routes/Review")
const wishlistRoutes = require("./routes/Wishlist")
const paymentRoutes = require("./routes/Payment")
const { connectToDB } = require("./database/db")


// server init
const server = express()

// database connection
connectToDB()


// middlewares
const allowedOrigins = [
    'http://localhost:3000',
    'https://luxecraft-1.vercel.app',
    'https://luxecart-nine.vercel.app',
    process.env.ORIGIN
].filter(Boolean);

server.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or postman)
        if (!origin) return callback(null, true);

        // Always allow if it's one of our known domains
        if (allowedOrigins.some(o => o && origin.startsWith(o))) {
            return callback(null, origin);
        }

        // Otherwise, allow it if they somehow configured a wildcard
        if (process.env.ORIGIN === '*') {
            return callback(null, '*');
        }

        console.log("CORS BLOCKED request from origin:", origin);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    exposedHeaders: ['X-Total-Count'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
}))
server.use(express.json())
server.use(cookieParser())
server.use(morgan("tiny"))

// routeMiddleware
server.use("/auth", authRoutes)
server.use("/users", userRoutes)
server.use("/products", productRoutes)
server.use("/orders", orderRoutes)
server.use("/cart", cartRoutes)
server.use("/brands", brandRoutes)
server.use("/categories", categoryRoutes)
server.use("/address", addressRoutes)
server.use("/reviews", reviewRoutes)
server.use("/wishlist", wishlistRoutes)
server.use("/payment", paymentRoutes)



server.get("/", (req, res) => {
    res.status(200).json({ message: 'running' })
})

server.get("/health", (req, res) => {
    res.status(200).json({ status: 'ok', db: require('mongoose').connection.readyState === 1 ? 'connected' : 'disconnected' })
})

server.listen(8000, () => {
    console.log('server [STARTED] ~ http://localhost:8000');
})