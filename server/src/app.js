import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", routes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server berjalan.",
  });
});

export default app;