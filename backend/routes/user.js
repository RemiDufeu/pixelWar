const express = require('express')
const router = express.Router();
const userCtrl = require('../controllers/user')

const admin = require('../middleware/admin')
const auth = require('../middleware/auth')
const myInfo = require('../middleware/myInfo')

router.post('/signUp', userCtrl.signUp)
router.post('/signIn', userCtrl.signIn)
router.post('/signInToken', userCtrl.signInToken)
router.patch('/role/:id', admin, userCtrl.updateRole)
router.patch('/passwordUpdate/:id', myInfo, userCtrl.updatePassword)
router.get('/all', admin,userCtrl.getUsers)
router.get('/user/:id',myInfo,userCtrl.getUser)
router.patch('/userUpdate/:id',myInfo,userCtrl.updateUser)
router.delete('/:id', myInfo||admin, userCtrl.deleteUser)


module.exports = router