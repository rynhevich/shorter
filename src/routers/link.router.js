import express from 'express';
import {createLink, showLink, updateCounter} from '../controllers/link.controller.js'
import {verifyToken} from '../middlewares/authJwt.js'


const router = express.Router();

router.post('/create', [verifyToken], createLink);
router.post('/t', showLink);
router.put('/t', updateCounter)



export default router;