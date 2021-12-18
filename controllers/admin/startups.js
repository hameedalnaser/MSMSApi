const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);


//add product to group by groupid and product id
// exports.addproducttogroup = (req,res)=>{
//     product={
//         groupid: req.body.selectedgroupid,
//         productid: req.body.productid
//     }
//     // console.log(product)
//     con.query('INSERT INTO dbkwaysi.groupdetails SET ?',[product],function(err,result){
//         if(err){
//             // console.log(err)
//             res.status(400).json({
//                 error : err
//             });
//         }else{
//             res.status(200).json({
//                 message : 'product added to the group'
//             })
//         }
//     })
// }


//upload images of groups
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
//         file.mv(`public/uploads/startups/${file.name}`,err =>{
//             if(err){
//                 // console.error('upload error@@@@@@@@@@@', err);
//                 return res.status(500).send(err);
//             }
    
//             res.json({fileName: file.name, filePath: `/uploads/startups/${file.name}`});
//         });
//     }

// }

// //delete groups from database by id
// exports.deleteGroup = (req,res,next) =>{
//     groupid = req.params.id
//     // console.log('delete request reached')
//     con.query('DELETE FROM dbkwaysi.groups WHERE groupid = ?',[groupid], function(err,result){
//         if(err){
//             // console.log(err)
//             res.status(400).json({
//                 error : err
//             });
//         }else{
//             // console.log('reached success deletewed')
//             res.status(200).json({
//                 message: 'group deleted successfully'
//             })
//         }
//     })
// }


//update startup information by id 
exports.updateStartup = (req, res) =>{
    updateGroup = {
        startup_name: req.body.startup_name,
        startup_logo:req.body.startup_logo,
        startup_idea: req.body.startup_idea,
        startup_sector:req.body.startup_sector,
        startup_stage: req.body.startup_stage,
        startup_startdate:req.body.startup_startdate,
        startup_facebook:req.body.startup_facebook,
        startup_instagram:req.body.startup_instagram,
        startup_website:req.body.startup_website
    }
    con.query('UPDATE startups SET ? WHERE startupid = ?',[updateGroup, req.params.id],
    function(err,result){
        if(err){
            // console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'Startup updated successfully'
            })
        }
    })
}



//get one group by id 
exports.getStartupById = (req, res) =>{
    startup = []
    con.query(`SELECT * FROM startups WHERE startupid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            startup = rows[0]
            res.status(200).json({
                startup
            })
        }
    })
}


//##########################


//view groups in admin dashbored
exports.getStartups = (req, res) => {
    startups = []
    con.query('SELECT * FROM startups', function(err,rows,fields){
        if(err){
            // console.log(err)
            res.status(400).json({
                massage : err
            });
        }else{
            startups = rows         
            console.log(startups)
            res.status(200).json({
                startups
            })
        }
    })
}



// create startup
exports.create = (req, res) => {
    
    createGroup = {
        startup_name: req.body.startup_name,
        startup_logo:req.body.startup_logo,
        startup_idea: req.body.startup_idea,
        startup_sector:req.body.startup_sector,
        startup_stage: req.body.startup_stage,
        startup_startdate:req.body.startup_startdate,
        startup_facebook:req.body.startup_facebook,
        startup_instagram:req.body.startup_instagram,
        startup_website:req.body.startup_website
    }

    // console.log(createGroup)
    con.query('INSERT INTO startups SET ?',[createGroup],
    function(err, result){
        if(err){
            // console.log("ERROR IN ADDING group", err)
            res.status(400).json({
                massage : err
            });
            return;
        }else{
            res.status(200).json({
                message : 'Startup ADDED TO DATABASE'
            })
            return;
        }
    });
    
};