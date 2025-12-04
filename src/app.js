import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.NODE_ENV === "test"
      ? ".env.test"
      : ".env",
});
import http from "http";
import express from "express";
const app = express();
const server = http.createServer(app);
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import initDBConnect from "./utils/mongoose.js";

// express router
import usersRouter from "./routes/users.js"

// bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV !== "test")
  app.use(morgan("dev"));

// cors
app.use(
  cors({
    // disable cors domain restriction
    origin: true,
    credentials: true,
    methods: [
      "GET",
      "PUT",
      "POST",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Origin",
      "Content-Type",
      "Content-Length",
      "X-Requested-With",
      "cache-control",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Origin",
    ],
  }),
);

// add security headers
app.use(helmet());

initDBConnect();

// api routes
app.use(usersRouter);

app.use(express.static("public"));

app.get("/", (req, res) => {
  return res.status(200).json({ ok: true });
});

// app ready
if (process.env.NODE_ENV !== "test") {
  server.listen(process.env.PORT, () => {
    console.log(`
  --------------------------------
  Listening on port: ${process.env.PORT}
  --------------------------------
         ___       _____     __
        /   \\     |   _  \\  |  |
       /  ^  \\    |  |_)  | |  |
      /  /_\\  \\   |   ___/  |  |
     /  _____  \\  |  |      |  |
    /__/     \\__\\ |__|      |__|
  --------------------------------
  `);
  });
}

// export Express API
export default app;