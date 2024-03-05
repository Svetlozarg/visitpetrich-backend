import express from "express";
import { validateToken } from "../middleware/validateTokenHandler";
import {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller";

const router = express.Router();

router.get("/all", getAllEvents);
router.get("/:id", getEvent);
router.post("/create", validateToken, createEvent);
router.put("/:id", validateToken, updateEvent);
router.delete("/:id", validateToken, deleteEvent);

export default router;
