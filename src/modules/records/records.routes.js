import { Router } from "express";
import * as recordsController from "./records.controller.js"; 

const router = Router();

router.get("/", recordsController.getAllRecords);

router.post("/", recordsController.createRecord); 

export default router;
