import { Router } from "express";
import * as illustrationsController from "./illustrations.controller.js"; 

const router = Router();

router.get("/", illustrationsController.getAllIllustrations);
router.get("/:illustrationId/characters", illustrationsController.getIllustrationCharacters); 
router.get("/:illustrationId/artist", illustrationsController.getIllustrationArtist); 

export default router;
