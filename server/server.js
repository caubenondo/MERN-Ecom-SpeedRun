import  express from "express";
import  dotenv from "dotenv";
// add color on console log to debug
import colors from 'colors'
import connectDB from "./config/connection.js";
import productRoutes from './routes/productRoutes.js'
import { errorHandler, notFound } from "./util/errorMiddleware.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3001;

connectDB()
app.get("/", (req, res) => {
    res.send("API is running");
});
app.use('/api/products',productRoutes)

app.use(notFound)
app.use(errorHandler)
app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.bold
    )
);
