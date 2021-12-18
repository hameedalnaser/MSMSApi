const express = require('express');
const router = express.Router();

const {createEvent,getAllProgramslist,getEvents,updateEvent,getEventById,addarrayAttendee,addarraySpeakers} = require("../../controllers/admin/events");

const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')


router.get('/events/:userid',requireSignin,isAuth,isAdmin, getEvents)
router.post('/events/create/:userid',requireSignin,isAuth,isAdmin,createEvent)
router.post('/events/addarrayattendee/:id',addarrayAttendee)
router.post('/events/addarrayspeakers/:id',addarraySpeakers)
router.get('/events/:id/:userid',requireSignin,isAuth,isAdmin,getEventById)
router.put('/events/update/:id/:userid',requireSignin,isAuth,isAdmin,updateEvent)
// // router.delete('/brands/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteBrand)
// router.post('/brands/upload/:userid',requireSignin,isAuth,isAdmin,images);

router.param('userid', userById);


module.exports = router;