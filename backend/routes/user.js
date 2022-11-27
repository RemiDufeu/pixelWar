const express = require('express')
const router = express.Router();
const userCtrl = require('../controllers/user')

const admin = require('../middleware/admin')
const auth = require('../middleware/auth')

router.post('/signUp', userCtrl.signUp)
router.post('/signIn', userCtrl.signIn)
router.post('/signInToken', userCtrl.signInToken)
router.put('/role/:id', admin, userCtrl.updateRole)
router.get('/all', admin,userCtrl.getUsers)
router.get('/user/:id', userCtrl.getUser)
router.delete('/:id', admin, userCtrl.deleteUser)

module.exports = router