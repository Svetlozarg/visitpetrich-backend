import express from "express";
import { validateToken } from "../middleware/validateTokenHandler";
import {
  getAllPlaces,
  getPlace,
  createPlace,
  updatePlace,
  deletePlace,
} from "../controllers/place.controller";

const router = express.Router();

router.get("/all", validateToken, getAllPlaces);
router.get("/:id", validateToken, getPlace);
router.post("/create", validateToken, createPlace);
router.put("/:id", validateToken, updatePlace);
router.delete("/:id", validateToken, deletePlace);

export default router;
