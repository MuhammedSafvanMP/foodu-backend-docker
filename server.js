import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import adminRoute from "./routes/adminRoute.js";
import cors  from "cors";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 7000

app.use(cors({
    origin: "http://localhost:3029",
    credentials: true
  }));


// middlewares
// users
app.use("/api/users", authRoute);
app.use("/api/users", productRoute);
// admin
app.use("/api/admin", adminRoute);



// DB connecting

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds
  connectTimeoutMS: 30000          // 30 seconds
})
.then(() => console.log("DB connected"))
.catch(error => console.log("DB connection error:", error));


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));