import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pool from "./config/connection.js";
import adminRoutes from "./routes/adminRouter.js";
import instructorRoutes from "./routes/instructorRouter.js";
import studentRoutes from "./routes/studentRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: "https://college-management-system-r4wh9zs8g.vercel.app" }));
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use(adminRoutes);
app.use(instructorRoutes);
app.use(studentRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Test database connection
pool.getConnection()
  .then(() => console.log("Database connection established."))
  .catch((err) => console.error("Database connection failed:", err.message));
