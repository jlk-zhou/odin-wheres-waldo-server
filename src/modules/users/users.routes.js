import { Router } from "express";
import * as usersController from "./users.controller.js"; 
const router = Router();

router.get("/", usersController.getAllUsers); 
router.get("/:userId", usersController.getUser);

export default router;
