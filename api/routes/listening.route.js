import express from 'express';
import { createListening } from "../controllers/Listening.controller.js";
import { verifyToken } from '../utils/verifyUser.js';
const router =express.Router();

router.post('/create',verifyToken,createListening);

export default router;
