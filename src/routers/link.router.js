import express from 'express';
import {createLink, showLink, updateCounter, showLinksByUsername, showLinksByTag} from '../controllers/link.controller.js'
import {verifyToken} from '../middlewares/authJwt.js'

const router = express.Router();

router.post('/create', [verifyToken], createLink);
router.post('/t', showLink);
router.put('/t', updateCounter)
router.post('/statistics', [verifyToken], showLinksByUsername);
router.post('/tag', showLinksByTag)

export default router;