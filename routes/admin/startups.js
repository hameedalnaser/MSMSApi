const express = require('express');
const router = express.Router();

const { getStartups, create, images, getStartupById, updateStartup } = require("../../controllers/admin/startups");


const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')



router.get('/startups/:userid',requireSignin,isAuth,isAdmin, getStartups)
router.post('/startups/create/:userid',requireSignin,isAuth,isAdmin,create)
router.get('/startups/update/:id/:userid',requireSignin,isAuth,isAdmin,getStartupById)
router.put('/startups/update/:id/:userid',requireSignin,isAuth,isAdmin,updateStartup)
// // router.delete('/logistics/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteLogistics)
// router.post('/logistics/upload/:userid',requireSignin,isAuth,isAdmin,images);

router.param('userid', userById);



module.exports = router;