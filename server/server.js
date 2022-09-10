import  express from "express";
import  dotenv from "dotenv";
// add color on console log to debug
import colors from 'colors'
import connectDB from "./config/connection.js";
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from "./util/errorMiddleware.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3001;

connectDB()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API is running");
});
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use(notFound)
app.use(errorHandler)
app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.bold
    )
);
