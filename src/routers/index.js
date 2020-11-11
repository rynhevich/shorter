import express from 'express';
import path from 'path';
import {signin, signup} from '../controllers/auth.controller.js'
import authRouter from './auth.router.js'

const router = express.Router();


router.use(authRouter);


//router.get('/statistics', (req,res) => {
//    var list = ["first", "second", "third"];
//    res.json(list);
//    console.log('Sent list of items');
//});




export default router;
