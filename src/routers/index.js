import express from 'express';
import authRouter from './auth.router.js'
import linkRouter from './link.router.js'

const router = express.Router();


router.use(authRouter);
router.use(linkRouter);


export default router;
