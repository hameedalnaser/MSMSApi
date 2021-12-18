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
        train_title: req.body.train_title,
        train_description: req.body.train_description,
        train_startdate: req.body.train_startdate,
        train_enddate: req.body.train_enddate,
        train_durationdays: req.body.train_durationdays,
        train_durationshours: req.body.train_durationshours,
        train_price: req.body.train_price,
        train_modality: req.body.train_modality,
        train_formlink: req.body.train_formlink,
        train_type: req.body.train_type
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



//get one city by id 
exports.getTrainingById = (req, res) =>{
    brand = []
    con.query(`SELECT * FROM trainings WHERE trainingid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            brand = rows[0]
            res.status(200).json({
                brand
            })
        }
    })
}


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



//create trainings
exports.create = (req, res) => {
    
    createTraining = {
        train_title: req.body.train_title,
        train_description: req.body.train_description,
        train_startdate: req.body.train_startdate,
        train_enddate: req.body.train_enddate,
        train_durationdays: req.body.train_durationdays,
        train_durationshours: req.body.train_durationshours,
        train_price: req.body.train_price,
        train_modality: req.body.train_modality,
        train_formlink: req.body.train_formlink,
        train_type: req.body.train_type,
        programid: req.body.programid,
    }

    con.query('INSERT INTO trainings SET ?',
    [createTraining],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING Trainings", err)
            res.status(400).json({
                massage : err
            });
            return;
        }else{
            res.status(200).json({
                message : 'Trainings ADDED TO DATABASE'
            })
            return;
        }
    });
    
};