import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mulRoutes from "./routes/mul.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(authRoutes);
app.use(mulRoutes);
app.use(userRoutes);

export default app;
