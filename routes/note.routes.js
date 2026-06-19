import express from "express";
import { createNote, getAllNotes , updateNote , deleteNote } from "../controllers/note.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", verifyToken, createNote);
router.get("/all", verifyToken, getAllNotes);
router.put("/update/:id", verifyToken, updateNote);   
router.delete("/delete/:id", verifyToken, deleteNote); 

export default router;