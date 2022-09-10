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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
}
// There is no 404 setup, so we send people back to Homepage
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// app.get("/", (req, res) => {
//     res.send("API is running");
// });


app.use('/api/products',productRoutes)

app.use(notFound)
app.use(errorHandler)
app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.bold
    )
);
