import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { error, success } from "./helpers/logger";
import authRoutes from "./routes/auth.routes";
import eventRoutes from "./routes/event.routes";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use("/api/event", eventRoutes);
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "404: Route Not Found" });
});

mongoose
  .connect(process.env.MONGO_CONNECTION_URL!)
  .then((connect) => {
    success(`Server successfully started and running on port ${PORT}`);
    success(
      `Database successfully connected => Host: ${connect.connection.host} / DB Name: ${connect.connection.name}`
    );
    app.listen(PORT);
  })
  .catch((err) => {
    error("Failed to connect to database. Server is shutting down...");
    console.log("Error: ", err.message);
    process.exit(1);
  });
