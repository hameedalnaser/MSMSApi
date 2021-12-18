const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);
var jwt = require('jsonwebtoken');

// //upload images of trainings
// exports.images = (req, res) => {
//     // console.log('request@@@@@#$$$##$#$', req.files)
//     if(req.files === null){
//         return res.status(400).json({
//             massage: 'No file uploaded'
//         })
//     }else{
//         const file = req.files.file;
//         file.name = Date.now()+file.name
//         console.log(file)
//         console.log('reached else state')
//         file.mv(`public/uploads/brands/${file.name}`,err =>{
//             if(err){
//                 // console.error('upload error@@@@@@@@@@@', err);
//                 return res.status(500).send(err);
//             }
    
//             res.json({fileName: file.name, filePath: `/uploads/brands/${file.name}`});
//         });
//     }

// }

// //delete city from database by id
// exports.deleteBrand = (req,res) =>{
//     console.log('delete request reached')
//     con.query('DELETE FROM brands WHERE brandid = ?',[req.params.id], function(err,result){
//         if(err){
//             console.log(err)
//             res.status(400).json({
//                 error : err
//             });
//         }else{
//             res.status(200).json({
//                 message: 'brand deleted successfully'
//             })
//         }
//     })
// }


//update training information by id 
exports.updateTraining = (req, res) =>{
    updateTraining = {
        nameEnglish: req.body.nameEnglish,
        nameArabic: req.body.nameArabic,
        bio:req.body.bio,
        logo:req.body.logo
    }
    con.query('UPDATE trainings SET ? WHERE trainingid = ?',[updateTraining, req.params.id],
    function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'Training has been updated'
            })
        }
    })
}



// //get one city by id 
// exports.getBrandById = (req, res) =>{
//     brand = []
//     con.query(`SELECT * FROM brands WHERE brandid = ?`,[req.params.id], function(err, rows, fields){
//         if(err){
//             res.status(400).json({
//                 error : err
//             });
//         }else{
//             brand = rows[0]
//             res.status(200).json({
//                 brand
//             })
//         }
//     })
// }


//##########################


//view trainings in admin dashbored
exports.getTrainings = (req, res) => {
    trainings = []
    con.query('SELECT * from trainings', function(err,rows,fields){
        if(err){
            res.status(400).json({
                massage : err
            });
        }else{
            trainings = rows
            res.status(200).json({
                trainings
            })
        }
    })
}


// adding students to the training
exports.addarrayStudent = (req,res,next)=>{
    console.log('reached controller')
    console.log(req.params.id)
    trainingid=req.params.id
    studentArray = req.body;
    for(let i=0;i<studentArray.length;i++){
        con.query('SELECT * FROM community WHERE com_email_1 = ? OR com_email_2 = ?',[studentArray[i].com_email_1,studentArray[i].com_email_1],function(err,rows,fields){
            // console.log('rows up', rows.length)
            if(err){
                res.status(404).json({
                    error: err
                })
            }else{
                // console.log(rows.length)
                if(rows.length !== 0){
                    trainingSet ={
                        communityid: rows[0].communityid,
                        trainingid: trainingid,
                    }
                    con.query('INSERT INTO trainingsstudents SET ?',[trainingSet],function(err,result){
                        if(err){
                            console.log(err)
                        }
                    })
                }else{
                    con.query('INSERT INTO community SET ?',[studentArray[i]],function(err, result){
                        // console.log('result',result)
                        if(err){
                            console.log('error in insert',err)
                        }else{
                            trainingSet ={
                                communityid: result.insertId,
                                trainingid: trainingid,
                            }
                            con.query('INSERT INTO trainingsstudents SET ?',[trainingSet],function(err,result){
                                if(err){
                                    console.log(err)
                                }
                            })
                        }
                    })
                }
                if(i===studentArray.length-1){
                    res.status(200).json({
                        message: 'The process has  done successfuly'
                    })
                }   
            }
        })
    }
    
}



// adding students to the training
exports.addarrayInstructors = (req,res,next)=>{
    console.log('reached controller')
    console.log(req.params.id)
    trainingid=req.params.id
    instructorArray = req.body;
    for(let i=0;i<instructorArray.length;i++){
        con.query('SELECT * FROM community WHERE com_email_1 = ? OR com_email_2 = ?',[instructorArray[i].com_email_1,instructorArray[i].com_email_1],function(err,rows,fields){
            // console.log('rows up', rows.length)
            if(err){
                res.status(404).json({
                    error: err
                })
            }else{
                // console.log(rows.length)
                if(rows.length !== 0){
                    trainingSet ={
                        communityid: rows[0].communityid,
                        trainingid: trainingid,
                    }
                    con.query('INSERT INTO traininginstructors SET ?',[trainingSet],function(err,result){
                        if(err){
                            console.log(err)
                        }
                    })
                }else{
                    con.query('INSERT INTO community SET ?',[instructorArray[i]],function(err, result){
                        // console.log('result',result)
                        if(err){
                            console.log('error in insert',err)
                        }else{
                            trainingSet ={
                                communityid: result.insertId,
                                trainingid: trainingid,
                            }
                            con.query('INSERT INTO traininginstructors SET ?',[trainingSet],function(err,result){
                                if(err){
                                    console.log(err)
                                }
                            })
                        }
                    })
                }
                if(i===instructorArray.length-1){
                    res.status(200).json({
                        message: 'The process has  done successfuly'
                    })
                }   
            }
        })
    }
    
}


// //create brands
// exports.create = (req, res) => {
    
//     createBrand = {
//         nameArabic: req.body.nameArabic,
//         nameEnglish: req.body.nameEnglish,
//         bio: req.body.bio,
//         logo:req.body.logo
//     }
//     con.query('INSERT INTO brands SET ?',
//     [createBrand],
//     function(err, result){
//         if(err){
//             console.log("ERROR IN ADDING BRAND", err)
//             res.status(400).json({
//                 massage : err
//             });
//             return;
//         }else{
//             res.status(200).json({
//                 message : 'BRAND ADDED TO DATABASE'
//             })
//             return;
//         }
//     });
    
// };