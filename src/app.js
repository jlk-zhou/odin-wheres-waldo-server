import express from "express";
import cors from "cors";

import routes from "./routes/index.js";

import notFoundController from "./errors/notFoundController.js";
import errorHandler from "./errors/errorHandler.js"; 
import { prismaErrorHandler } from "./errors/prismaErrorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: `${process.env.CLIENT_URL}`, 
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use("/illustrations", routes.illustrations);
app.use("/records", routes.records); 

app.use(notFoundController); 
app.use(prismaErrorHandler); 
app.use(errorHandler); 

export default app;
