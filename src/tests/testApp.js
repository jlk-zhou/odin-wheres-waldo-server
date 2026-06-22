import express from "express";
import routes from "../routes";
import notFoundController from "../errors/notFoundController";
import { prismaErrorHandler } from "../errors/prismaErrorHandler";
import errorHandler from "../errors/errorHandler";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/illustrations", routes.illustrations);
app.use("/records", routes.records); 

app.use(notFoundController); 
app.use(prismaErrorHandler); 
app.use(errorHandler); 

export default app; 