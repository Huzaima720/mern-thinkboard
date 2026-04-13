import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notes.routes.js";
// import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"

dotenv.config();

const app = express();
app.use(express.json());
// app.use(rateLimiter);
app.use(cors({
  origin : "http://localhost:5173"
}))

app.use("/api/notes", notesRoutes);

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
});
