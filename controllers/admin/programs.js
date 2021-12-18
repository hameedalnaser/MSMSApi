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


//update carousel information by id 
exports.updateProgram = (req, res) =>{
    updatePrograme = {
        program_name: req.body.program_name,
        program_drivelink: req.body.program_drivelink,
        program_startdate: req.body.program_startdate,
        program_enddate: req.body.program_enddate,
        program_donor: req.body.program_donor,
        program_description:req.body.program_description,
        program_objectives:req.body.program_objectives,
        program_activities:req.body.program_activities,
        program_goals: req.body.program_goals,
        program_beneficiaries: req.body.program_beneficiaries
    }
    con.query('UPDATE programs SET ? WHERE programid = ?',[updatePrograme, req.params.id],
    function(err,result){
        if(err){
            // console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'programs updated successfully'
            })
        }
    })
}



//get one carousel by id 
exports.getProgramById = (req, res) =>{
    programs = []
    con.query(`SELECT * FROM programs WHERE programid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            programs = rows[0]
            res.status(200).json({
                programs
            })
        }
    })
}


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
exports.create = (req, res) => {
    
    createProgram = {
        program_name: req.body.program_name,
        program_drivelink: req.body.program_drivelink,
        program_startdate: req.body.program_startdate,
        program_enddate: req.body.program_enddate,
        program_donor: req.body.program_donor,
        program_description:req.body.program_description,
        program_objectives:req.body.program_objectives,
        program_activities:req.body.program_activities,
        program_goals: req.body.program_goals,
        program_beneficiaries: req.body.program_beneficiaries
    }
    con.query('INSERT INTO programs SET ?',
    [createProgram],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING program", err)
            res.status(400).json({
                massage : err
            });
            return;
        }else{
            res.status(200).json({
                message : 'program ADDED TO DATABASE'
            })
            return;
        }
    });
    
};