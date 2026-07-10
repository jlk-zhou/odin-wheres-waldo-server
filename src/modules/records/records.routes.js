import { Router } from "express";
import * as recordsController from "./records.controller.js";
import { validateRecord } from "./middlewares/validatePlayerName.js";
import { validate } from "uuid";

const router = Router();

router.get("/", recordsController.getAllRecords);

router.post(
  "/",
  validateRecord, 
  recordsController.createRecord,
);

export default router;
