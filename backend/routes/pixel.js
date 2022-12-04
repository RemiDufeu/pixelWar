const express = require('express')
const router = express.Router();
const pixelCtrl = require('../controllers/pixel')

const auth = require('../middleware/auth')
const myInfo = require('../middleware/myInfo')

router.get('/userPixel/:id/:x/:y', pixelCtrl.getUserPixel)
router.get('/allPixelBoardsByUser/:id',myInfo, pixelCtrl.getAllPixelBoardsByUser)
router.get('/nbPixelsByUser/:id',myInfo, pixelCtrl.getNbPixelByUser)


module.exports = router