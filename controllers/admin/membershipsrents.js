const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);
var jwt = require('jsonwebtoken');

//upload images of logistic agrements
exports.imagesLogistics = (req, res) => {
    // console.log('request@@@@@#$$$##$#$', req.files)
    if(req.files === null){
        return res.status(400).json({
            massage: 'No file uploaded'
        })
    }else{
        const file = req.files.file;
        file.name = Date.now()+file.name
        console.log(file)
        console.log('reached else state')
        file.mv(`public/uploads/logistics/${file.name}`,err =>{
            if(err){
                // console.error('upload error@@@@@@@@@@@', err);
                return res.status(500).send(err);
            }
    
            res.json({fileName: file.name, filePath: `/uploads/logistics/${file.name}`});
        });
    }

}

//delete city from database by id
exports.deleteLogistics = (req,res) =>{
    // console.log('delete request reached')
    con.query('DELETE FROM dbkwaysi.logistics WHERE logisticsid = ?',[req.params.id], function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'logistics record deleted successfully'
            })
        }
    })
}


//update logistics record information by id 
exports.updateLogistics = (req, res) =>{
    updateLogistics = {
        itemname: req.body.itemname,
        itemdescription: req.body.itemdescription,
        serialnumber: req.body.serialnumber,
        servicestate:req.body.servicestate,
        itembrand:req.body.itembrand,
        hrid:req.body.hrid,
        deliverystatus:req.body.deliverystatus,
        deliverydate:req.body.deliverydate,
        transactionid:req.body.transactionid,
        updatedby:req.params.userid,
        agrimage:req.body.agrimage
    }
    con.query('UPDATE dbkwaysi.logistics SET ? WHERE logisticsid = ?',[updateLogistics, req.params.id],
    function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'logistics item updated successfully'
            })
        }
    })
}



//get one logistics item by id 
exports.getLogisticsById = (req, res) =>{
    logistics = []
    con.query(`SELECT * FROM dbkwaysi.logistics WHERE logisticsid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            logistics = rows[0]
            res.status(200).json({
                logistics
            })
        }
    })
}


//##########################


//view logistics items in admin dashbored
exports.getLogistics = (req, res) => {
    logistics = []
    con.query('SELECT * from dbkwaysi.logistics', function(err,rows,fields){
        if(err){
            res.status(400).json({
                massage : err
            });
        }else{
            logistics = rows
            res.status(200).json({
                logistics
            })
        }
    })
}



//create logistics
exports.createLogistics = (req, res) => {
    
    createLogistics = {
        itemname: req.body.itemname,
        itemdescription: req.body.itemdescription,
        serialnumber: req.body.serialnumber,
        servicestate:req.body.servicestate,
        itembrand:req.body.itembrand,
        hrid:req.body.hrid,
        deliverystatus:req.body.deliverystatus,
        deliverydate:req.body.deliverydate,
        transactionid:req.body.transactionid,
        createdby:req.params.userid,
        updatedby:req.params.userid,
        agrimage:req.body.agrimage
    }
    con.query('INSERT INTO dbkwaysi.logistics SET ?',
    [createLogistics],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING logistics item", err)
            res.status(400).json({
                massage : err
            });
            return;
        }else{
            res.status(200).json({
                message : 'Logistics item ADDED TO DATABASE'
            })
            return;
        }
    });
    
};