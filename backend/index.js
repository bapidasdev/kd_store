import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { connectDB } from "./config/connectDB.js";
dotenv.config();

import userRoutes from "./routes/user.routes.js"
import sellerRoutes from "./routes/seller.routes.js"
import productRoutes from "./routes/product.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import orderRoutes from './routes/order.routes.js'
import addressRoutes from "./routes/address.routes.js"


import { connectCloudinary } from "./config/cloudinary.js";

const app = express();
connectDB();
connectCloudinary()

const allowedOrigins = [
    "http://localhost:5173",
    "https://kd-store-pi.vercel.app",

];
// const allowedOrigins = [
//   "https://kd-store-pi.vercel.app"
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // ✅ allow cookies
}));

//middleware
app.use(express.json())
// app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

//api
app.get('/', (req, res) => {
    res.send("Hello world")
})

//store add product images
app.use("/images", express.static("uploads"))

app.use("/api/user", userRoutes)
app.use("/api/seller", sellerRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/address", addressRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//  mongodb+srv://das316456_db_user:kdstore@cluster0.t9uu7b7.mongodb.net/?
// retryWrites=true&w=majority&appName=Cluster0