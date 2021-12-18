const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);

// //upload images 
// exports.images = (req, res) => {
//     // console.log('request@@@@@#$$$##$#$', req.files)
//     if(req.files === null){
//         return res.status(400).json({
//             message: 'No file uploaded'
//         })
//     }else{
//         const file = req.files.file;
//         file.name = Date.now()+file.name
//         // console.log(file)
//         // console.log('reached else state')
//         file.mv(`public/uploads/beautycenters/${file.name}`,err =>{
//             if(err){
//                 // console.error('upload error@@@@@@@@@@@', err);
//                 return res.status(500).send(err);
//             }
    
//             res.json({fileName: file.name, filePath: `/uploads/beautycenters/${file.name}`});
//         });
//     }

// }

//create an event 
exports.createEvents = (req, res,next) => {

    createEvent = {
        event_type:req.body.event_type,
        event_name:req.body.event_name,
        event_description:req.body.event_description,
        programid:req.body.programid,
        event_place:req.body.event_place,
        event_durationdays:req.body.event_durationdays,
        event_durationhours:req.body.event_durationhours,
        event_startdate:req.body.event_startdate,
        event_enddate:req.body.event_enddate,
        event_createdby:req.params.userid,
        event_editedby:req.params.userid
    }
    con.query('INSERT INTO events SET ?',
    [createEvent],
    function(err, result){
        if(err){
            res.status(400).json({
                error : "Error in adding the event"
            })
        }else{
            res.status(200).json({
                message : "Event has been added"
            })
        }
    });
    
};


//update event by id
exports.updateEvent = (req, res, next) =>{
    updateEvent = {
        event_type:req.body.event_type,
        event_name:req.body.event_name,
        event_description:req.body.event_description,
        programid:req.body.programid,
        event_place:req.body.event_place,
        event_durationdays:req.body.event_durationdays,
        event_durationhours:req.body.event_durationhours,
        event_startdate:req.body.event_startdate,
        event_enddate:req.body.event_enddate,
        event_editedby:req.params.userid
    }
    con.query('UPDATE events SET ? WHERE eventid = ?',[updateEvent, req.params.id],
    function(err,result){
        if(err){
            // console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'Event has been updated'
            })
        }
    })
}



//get programs list for creating an event
// exports.getAllProgramslist =(req,res,next) =>{
//     programs = []
//     con.query(`SELECT * FROM programs`,function(err, rows, fields){
//         if(err){
//             res.status(400).json({
//                 error : err
//             });
//         }else{
//             programs = rows
//             res.status(200).json({
//                 programs
//             })
//         }
//     })
// }




//get all events 
exports.getEvents =(req,res,next) =>{
    console.log('reached controller')
    events = []
    con.query(`SELECT * FROM events`,function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            events = rows
            res.status(200).json({
                events
            })
        }
    })
}

// get event by id for updating single event
exports.getEventById = (req, res) =>{
    events = []
    con.query(`SELECT * FROM events WHERE eventid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            events = rows[0]
            res.status(200).json({
                events
            })
        }
    })
}
