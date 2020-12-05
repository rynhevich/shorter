import express from 'express';
import {signin, signup} from '../controllers/auth.controller.js'
import {checkDuplicateUsername} from '../middlewares/verifySignUp.js'

const router = express.Router();

router.post('/regestration', [checkDuplicateUsername], signup);

router.post('/', signin);


export default router;
