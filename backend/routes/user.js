const express = require('express')
const router = express.Router();
const userCtrl = require('../controllers/user')

const admin = require('../middleware/admin')

router.post('/signUp', userCtrl.signUp)
router.post('/signIn', userCtrl.signIn)
router.post('/signInToken', userCtrl.signInToken)
router.put('/role/:id', admin, userCtrl.updateRole)
router.get('/all', admin, userCtrl.getUsers)
router.delete('/:id', admin, userCtrl.deleteUser)

module.exports = router