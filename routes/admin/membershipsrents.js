const express = require('express');
const router = express.Router();

const {} = require("../../controllers/admin/membershipsrents");

const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')



// router.post('/categories/create/:userid',requireSignin,isAuth,isAdmin,createCate)
// router.get('/subcategories/create/:userid',requireSignin,isAuth,isAdmin,addSubCate)
// router.post('/subcategories/create/:userid',requireSignin,isAuth,isAdmin,createSubCate)
// router.get('/classcategories/create/:userid',requireSignin,isAuth,isAdmin,addClassCate)
// router.post('/classcategories/create/:userid',requireSignin,isAuth,isAdmin,createClassCate)
// router.get('/categories/:userid', requireSignin,isAuth,isAdmin,allCategories)
// router.put('/categories/update/:id/:userid',requireSignin,isAuth,isAdmin,updateMainCategories)
// router.get('/categories/:id/:userid',requireSignin,isAuth,isAdmin,getMainCateById)
// router.get('/subcategories/:id/:userid',requireSignin,isAuth,isAdmin,getSubCateById)
// router.put('/subcategories/update/:id/:userid',requireSignin,isAuth,isAdmin,updateSubCate)
// // router.delete('/subcategories/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteSubCate)
// router.get('/classcategories/:id/:userid',requireSignin,isAuth,isAdmin,getClassCateById)
// router.put('/classcategories/update/:id/:userid',requireSignin,isAuth,isAdmin,updateClassCate)
// // router.delete('/classcategories/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteClassCate)
// router.post('/categories/upload/:userid',requireSignin,isAuth,isAdmin,images);


router.param('userid', userById);

module.exports = router;