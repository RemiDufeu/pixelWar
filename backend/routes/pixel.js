const express = require('express')
const router = express.Router();
const pixelCtrl = require('../controllers/pixel')

const auth = require('../middleware/auth')

//router.post('/addPixelIn/:id',auth,pixelCtrl.create)
router.get('/:id', pixelCtrl.getOne)
router.get('/userPixel/:id/:x/:y', pixelCtrl.getUserPixel)

module.exports = router