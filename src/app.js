import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
import cors from "cors";
import express from "express";

import routes from "./routes/index.js";

import notFoundController from "./errors/notFoundController.js";
import errorHandler from "./errors/errorHandler.js"; 
import { prismaErrorHandler } from "./errors/prismaErrorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/illustrations", routes.illustrations);

app.use(notFoundController); 
app.use(prismaErrorHandler); 
app.use(errorHandler); 

export default app;
