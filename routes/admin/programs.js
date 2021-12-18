const express = require('express');
const router = express.Router();

const { getPrograms } = require("../../controllers/admin/programs");

const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')


router.get('/programs/:userid',requireSignin,isAuth,isAdmin, getPrograms)
// router.post('/groups/create/:userid',requireSignin,isAuth,isAdmin,create)
// router.get('/groups/:id/:userid',requireSignin,isAuth,isAdmin,getGroupById)
// router.put('/groups/update/:id/:userid',requireSignin,isAuth,isAdmin,updateGroup)
// router.delete('/groups/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteGroup)
// router.post('/groups/upload/:userid',requireSignin,isAuth,isAdmin,images);
// router.post('/groups/addproduct/:userid',requireSignin,isAuth,isAdmin,addproducttogroup)

router.param('userid', userById);


module.exports = router;