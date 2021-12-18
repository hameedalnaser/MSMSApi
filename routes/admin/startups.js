const express = require('express');
const router = express.Router();

const {} = require("../../controllers/admin/startups");


const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')



// router.get('/logistics/:userid',requireSignin,isAuth,isAdmin, getLogistics)
// router.post('/logistics/create/:userid',requireSignin,isAuth,isAdmin,createLogistics)
// router.get('/logistics/:id/:userid',requireSignin,isAuth,isAdmin,getLogisticsById)
// router.put('/logistics/update/:id/:userid',requireSignin,isAuth,isAdmin,updateLogistics)
// // router.delete('/logistics/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteLogistics)
// router.post('/logistics/upload/:userid',requireSignin,isAuth,isAdmin,imagesLogistics);

router.param('userid', userById);



module.exports = router;