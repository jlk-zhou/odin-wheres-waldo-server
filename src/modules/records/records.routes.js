import { Router } from "express";
import * as recordsController from "./records.controller.js"; 

const router = Router();

router.get("/", recordsController.getAllRecords);

export default router;
