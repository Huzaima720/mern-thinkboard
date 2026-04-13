import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notes.routes.js";
// import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
dotenv.config();

const app = express();
app.use(express.json());

const __dirname = path.resolve();
// app.use(rateLimiter);

if (process.env.NODE_ENV !== "production") {

  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
}
  
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
});
