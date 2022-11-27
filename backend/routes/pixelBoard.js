const express = require('express')
const router = express.Router();
const pixelBoardCtrl = require('../controllers/pixelBoard')

const admin = require('../middleware/admin');
const auth = require('../middleware/auth');

router.post('/',admin, pixelBoardCtrl.create)
router.get('/',admin, pixelBoardCtrl.getAll)
router.get('/public', pixelBoardCtrl.getAllPublicActif)
router.get('/actif', pixelBoardCtrl.getAllActif)
router.get('/:id', pixelBoardCtrl.getOnePublic,auth, pixelBoardCtrl.getOne)

module.exports = router 