import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
import cors from "cors";
import express from "express";

import routes from "./routes/index.js";

import notFoundHandler from "./errors/notFoundHandler.js";
import errorMiddleware from "./errors/errorMiddleware.js"; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/illustrations", routes.illustrations);
app.use(notFoundHandler); 
app.use(errorMiddleware); 

export default app;
