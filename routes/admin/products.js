const express = require('express');
const router = express.Router();

const { getProducts, create, getProductById, updateProduct } = require("../../controllers/admin/products");


const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')


router.get('/products/:userid',requireSignin,isAuth,isAdmin, getProducts)
 router.post('/products/create/:userid',requireSignin,isAuth,isAdmin,create);
 router.get('/products/update/:id/:userid',requireSignin,isAuth,isAdmin,getProductById)
router.put('/products/update/:id/:userid',requireSignin,isAuth,isAdmin,updateProduct)

router.get('/products/:id/:userid',requireSignin,isAuth,isAdmin, getProductById)
// router.get('/dashboard/:pageid/:userid',requireSignin,isAuth,isAdmin,getDashboardProducts)
// router.get('/dashboard/sales/:userid',requireSignin,isAuth,isAdmin,getDashboardSales)
// router.get('/dashboard/new/:userid',requireSignin,isAuth,isAdmin,getDashboardNew)
// router.get('/dashboard/outofstock/:userid',requireSignin,isAuth,isAdmin,getDashboardoutofStock)
// router.get('/dashboard/vip/:userid',requireSignin,isAuth,isAdmin,getDashboardVIP)
// router.get('/products/create/:userid',requireSignin,isAuth,isAdmin, addProductPage)
// router.post('/products/create/:userid',requireSignin,isAuth,isAdmin,create);
// router.get('/styles/create/:userid',requireSignin,isAuth,isAdmin, addStyle);
// router.post('/styles/create/:userid',requireSignin,isAuth,isAdmin,createStyles);
// router.post('/products/upload/:userid',requireSignin,isAuth,isAdmin,images);
// router.put('/styles/update/:id/:userid',requireSignin,isAuth,isAdmin,updateStyle)
// router.put('/products/update/:id/:userid',requireSignin,isAuth,isAdmin,updateProduct)
// router.put('/products/dynamiclink/:id/:userid',requireSignin,isAuth,isAdmin,updatedynamiclink) //new dynamic link
// // router.delete('/styles/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteStyle)
// // router.delete('/products/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteProduct)
// router.get('/styles/:id/:userid',requireSignin,isAuth,isAdmin,getStyleById)
// router.get('/products/:id/:userid',requireSignin,isAuth,isAdmin,getProductById)
// router.get('/store/all/:userid',requireSignin,isAuth,isAdmin,getStores)
// router.get('/storestyles/:id/:userid',requireSignin,isAuth,isAdmin,getStoreStyles)

router.param('userid', userById);


module.exports = router;