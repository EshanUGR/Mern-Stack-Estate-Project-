import express from 'express';
import {
  createListening,
  deleteListing,
} from "../controllers/Listening.controller.js";
import { verifyToken } from '../utils/verifyUser.js';
const router =express.Router();

router.post('/create',verifyToken,createListening);
router.delete('/delete/:id',verifyToken,deleteListing);

export default router;
