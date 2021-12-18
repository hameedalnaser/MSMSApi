const express = require('express');
const router = express.Router();

const { getTrainings,addarrayStudent, addarrayInstructors } = require("../../controllers/admin/trainings");


const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')


// router.post('/boothorders/:userid',requireSignin,isAuth,isAdmin,usdiqdmiddleware,Boothordersubmit)
router.get('/trainings/:userid',requireSignin,isAuth,isAdmin, getTrainings)
router.post('/trainings/addarraystudent/:id',addarrayStudent)
router.post('/trainings/addarrayinstructor/:id',addarrayInstructors)
// router.get('/orders/supplier/:orderid/:userid',requireSignin,isAuth,isAdmin,usdiqdmiddleware,getSupplierOrderByID)
// router.get('/orders/:orderid/:userid',requireSignin,isAuth,isAdmin,usdiqdmiddleware,getOrderByID)
// router.patch('/orders/update/:orderid/:userid',requireSignin,isAuth,isAdmin,updateOrderStatus)
// router.patch('/orders/cancel/:orderid/:userid',requireSignin,isAuth,isAdmin,cancelOrder)
// // router.get('/orders/suppliers/list/:userid',supplierlist)
// router.get('/ordersbysupplier/:userid',requireSignin,isAuth,isAdmin,usdiqdmiddleware,supplierproducts)
// router.patch('/orders/notes/:orderid/:userid',requireSignin,isAuth,isAdmin,updateOrderNotes)


router.param('userid', userById);



module.exports = router;