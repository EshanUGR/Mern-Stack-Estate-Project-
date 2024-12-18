import express from 'express';
import {
  createListening,
  deleteListing,
  updateListing,
  getListing,
} from "../controllers/Listening.controller.js";
import { verifyToken } from '../utils/verifyUser.js';
const router =express.Router();

router.post('/create',verifyToken,createListening);
router.delete('/delete/:id',verifyToken,deleteListing);

router.post('/update/:id',verifyToken,updateListing);

router.get('/get/:id',getListing);

export default router;
