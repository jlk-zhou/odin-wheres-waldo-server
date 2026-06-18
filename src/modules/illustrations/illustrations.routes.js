import { Router } from "express";
import * as illustrationsController from "./illustrations.controller.js"; 

const router = Router();

router.get("/", illustrationsController.getAllIllustrations);

export default router;
