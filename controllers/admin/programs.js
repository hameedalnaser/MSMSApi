const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);



// //upload images of carousel
// exports.images = (req, res) => {
//     // console.log('request@@@@@#$$$##$#$', req.files)
//     if(req.files === null){
//         return res.status(400).json({
//             massage: 'No file uploaded'
//         })
//     }else{
//         const file = req.files.file;
//         file.name = Date.now()+file.name
//         // console.log(file)
//         // console.log('reached else state')
//         file.mv(`public/uploads/carousel/${file.name}`,err =>{
//             if(err){
//                 // console.error('upload error@@@@@@@@@@@', err);
//                 return res.status(500).send(err);
//             }
    
//             res.json({fileName: file.name, filePath: `/uploads/carousel/${file.name}`});
//         });
//     }

// }

// //delete carousel from database by id
// exports.deleteCarousel = (req,res,next) =>{
//     carouselid = req.params.id
//     // console.log('delete request reached')
//     con.query('DELETE FROM carousel WHERE carouselid = ?',[carouselid], function(err,result){
//         if(err){
//             // console.log(err)
//             res.status(400).json({
//                 error : err
//             });
//         }else{
//             // console.log('reached success deletewed')
//             res.status(200).json({
//                 message: 'carousel deleted successfully'
//             })
//         }
//     })
// }


// //update carousel information by id 
// exports.updateCarousel = (req, res) =>{
//     updateCarousel = {
//         link: req.body.link,
//         image: req.body.image,
//         notes: req.body.notes,
//         itemid: req.body.itemid,
//         name:req.body.name,
//         group:req.body.group,
//         active:req.body.active,
//         sequence:req.body.sequence
//     }
//     con.query('UPDATE carousel SET ? WHERE carouselid = ?',[updateCarousel, req.params.id],
//     function(err,result){
//         if(err){
//             // console.log(err)
//             res.status(400).json({
//                 error : err
//             });
//         }else{
//             res.status(200).json({
//                 message: 'carousel updated successfully'
//             })
//         }
//     })
// }



// //get one carousel by id 
// exports.getCarouselById = (req, res) =>{
//     carousel = []
//     con.query(`SELECT * FROM carousel WHERE carouselid = ?`,[req.params.id], function(err, rows, fields){
//         if(err){
//             res.status(400).json({
//                 error : err
//             });
//         }else{
//             carousel = rows[0]
//             res.status(200).json({
//                 carousel
//             })
//         }
//     })
// }


//##########################


//view programs in admin dashbored
exports.getPrograms = (req, res) => {
    programs = []
    con.query('SELECT * from programs', function(err,rows,fields){
        if(err){
            res.status(400).json({
                massage : err
            });
        }else{
            programs = rows
            res.status(200).json({
                programs
            })
        }
    })
}



// //create carousel
// exports.create = (req, res) => {
    
//     createCarousel = {
//         link: req.body.link,
//         image: req.body.image,
//         notes: req.body.notes,
//         itemid: req.body.itemid,
//         name: req.body.name,
//         group:req.body.group,
//         active:req.body.active,
//         sequence:req.body.sequence
//     }
//     con.query('INSERT INTO carousel SET ?',
//     [createCarousel],
//     function(err, result){
//         if(err){
//             console.log("ERROR IN ADDING carousel", err)
//             res.status(400).json({
//                 massage : err
//             });
//             return;
//         }else{
//             res.status(200).json({
//                 message : 'carousel ADDED TO DATABASE'
//             })
//             return;
//         }
//     });
    
// };