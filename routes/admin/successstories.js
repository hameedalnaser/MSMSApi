const express = require('express');
const router = express.Router();

const {} = require("../../controllers/admin/successstories");

const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')

// router.get('/stores/:userid',requireSignin,isAuth,isAdmin,getStores)
// router.get('/stores/create/:userid',requireSignin,isAuth,isAdmin,addStore)
// router.post('/stores/create/:userid',requireSignin,isAuth,isAdmin,createStore)
// router.put('/stores/update/:id/:userid',requireSignin,isAuth,isAdmin,updateByID)
// // router.delete('/stores/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteStore)
// router.get('/stores/:id/:userid',requireSignin,isAuth,isAdmin,getStoreById)


router.param('userid', userById);

module.exports = router;