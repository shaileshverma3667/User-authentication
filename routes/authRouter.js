const express=require('express');
const {signup,signIn,logout, getAllUsers, deleteUser} = require('../controller/authController');


const router=express.Router();
console.log("router",router)

router.post('/signup',signup)
router.post('/login',signIn)
router.post('/logout', logout);
router.get('/user',getAllUsers)
router.delete('/user/:id',deleteUser)

module.exports=router;