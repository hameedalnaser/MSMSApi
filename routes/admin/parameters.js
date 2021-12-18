const express = require('express');
const router = express.Router();

const {updateusd, getusd} = require("../../controllers/admin/parameters");


const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')



router.put('/updateusd/:userid',requireSignin,isAuth,isAdmin,updateusd)
// router.delete('/cities/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteCity)
router.get('/getusd/:userid',requireSignin,isAuth,isAdmin,getusd)

router.param('userid', userById);



module.exports = router;