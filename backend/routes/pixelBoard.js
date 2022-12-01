const express = require('express')
const router = express.Router();
const pixelBoardCtrl = require('../controllers/pixelBoard')

const admin = require('../middleware/admin');
const isPublicBoard = require('../middleware/isPublicBoard');
const auth = require('../middleware/auth')

router.post('/',admin, pixelBoardCtrl.create)
router.get('/',admin, pixelBoardCtrl.getAll)
router.get('/public', pixelBoardCtrl.getAllPublicActif)
router.get('/actif', pixelBoardCtrl.getAllActif)
router.get('/:id', isPublicBoard,pixelBoardCtrl.getOne)
router.put('/pixel/:id',isPublicBoard,auth,pixelBoardCtrl.putPixel)
router.get('/public/stats', pixelBoardCtrl.getAllInfos)

module.exports = router 