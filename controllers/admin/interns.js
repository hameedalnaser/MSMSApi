const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);
var jwt = require('jsonwebtoken');

//upload images of hr userid
exports.imagesHR = (req, res) => {
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
        file.mv(`public/uploads/hr/${file.name}`,err =>{
            if(err){
                // console.error('upload error@@@@@@@@@@@', err);
                return res.status(500).send(err);
            }
    
            res.json({fileName: file.name, filePath: `/uploads/hr/${file.name}`});
        });
    }

}

//delete hr from database by id
exports.deleteHR = (req,res) =>{
    console.log('delete request reached')
    con.query('DELETE FROM dbkwaysi.hr WHERE hrid = ?',[req.params.id], function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'hr record deleted successfully'
            })
        }
    })
}


//update hr information by id 
exports.updateHR = (req, res) =>{
    updateHR = {
        first: req.body.first,
        middle: req.body.middle,
        last: req.body.last,
        family:req.body.family,
        nationalid:req.body.nationalid,
        email:req.body.email,
        mobile:req.body.mobile,
        nationality:req.body.nationality,
        address:req.body.address,
        city:req.body.city,
        country:req.body.country,
        emplymentstatus:req.body.emplymentstatus,
        maritalstatus:req.body.maritalstatus,
        numofchildren:req.body.numofchildren,
        userid:req.body.euserid,
        idimage:req.body.idimage,
        editedby:req.params.userid,
        position:req.body.position
        
    }
    con.query('UPDATE dbkwaysi.hr SET ? WHERE hrid = ?',[updateHR, req.params.id],
    function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'hr record updated successfully'
            })
        }
    })
}



//get one hr by id 
exports.getHRById = (req, res) =>{
    hr = []
    con.query(`SELECT * FROM dbkwaysi.hr WHERE hrid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            hr = rows[0]
            res.status(200).json({
                hr
            })
        }
    })
}


//##########################


//view interns in admin pages
exports.getInterns = (req, res) => {
    interns = []
    con.query('SELECT * from interns', function(err,rows,fields){
        if(err){
            res.status(400).json({
                massage : err
            });
        }else{
            interns = rows
            res.status(200).json({
                interns
            })
        }
    })
}



//create hr employee record
exports.createHR = (req, res) => {
    
    createHR = {
        first: req.body.first,
        middle: req.body.second,
        last: req.body.last,
        family:req.body.family,
        nationalid:req.body.nationalid,
        email:req.body.email,
        mobile:req.body.mobile,
        nationality:req.body.nationality,
        address:req.body.address,
        city:req.body.city,
        country:req.body.country,
        emplymentstatus:req.body.emplymentstatus,
        maritalstatus:req.body.maritalstatus,
        numofchildren:req.body.numofchildren,
        userid:req.body.euserid,
        idimage:req.body.idimage,
        createdby:req.params.userid,
        editedby:req.params.userid,
        position:req.body.position
        
    }
    con.query('INSERT INTO dbkwaysi.hr SET ?',
    [createHR],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING Employee", err)
            res.status(400).json({
                massage : err
            });
            return;
        }else{
            res.status(200).json({
                message : 'Employee ADDED TO DATABASE'
            })
            return;
        }
    });
    
};


// $$$$$$$$$$$$$$$$$contracts$$$$$$$$$$$$$

//create hr employee record
exports.createContract = (req, res) => {
    
    createContract = {
        jobtitle:req.body.jobtitle,
        contracttype:req.body.contracttype,
        department:req.body.department,
        managername:req.body.managername,
        startdate:req.body.startdate,
        enddate:req.body.enddate,
        hrid:req.body.hrid,
        createdby:req.params.userid,
        editedby:req.params.userid,
        worktype:req.body.worktype,
        contractlink:req.body.contractlink,
    }
    con.query('INSERT INTO dbkwaysi.contracts SET ?',
    [createContract],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING Contract", err)
            res.status(400).json({
                error : err
            });
            return;
        }else{
            res.status(200).json({
                message : 'Contract ADDED TO DATABASE'
            })
            return;
        }
    });
    
};



//update contract information by id 
exports.updateContract = (req, res) =>{
    updateContract = {
        jobtitle:req.body.jobtitle,
        contracttype:req.body.contracttype,
        department:req.body.department,
        managername:req.body.managername,
        startdate:req.body.startdate,
        enddate:req.body.enddate,
        hrid:req.body.hrid,
        editedby:req.body.userid,
        worktype:req.body.worktype,
        contractlink:req.body.contractlink,
        
    }
    con.query('UPDATE dbkwaysi.contracts SET ? WHERE contractid = ?',[updateContract, req.params.id],
    function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'contract record updated successfully'
            })
        }
    })
}



//view all contracts in management pages
exports.getContracts = (req, res) => {
    contracts = []
    con.query('SELECT * from dbkwaysi.contracts', function(err,rows,fields){
        if(err){
            res.status(400).json({
                massage : err
            });
        }else{
            contracts = rows
            res.status(200).json({
                contracts
            })
        }
    })
}


//get one contract by id 
exports.getContractById = (req, res) =>{
    contracts = []
    con.query(`SELECT * FROM dbkwaysi.contracts WHERE contractid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            contracts = rows[0]
            res.status(200).json({
                contracts
            })
        }
    })
}


//delete contract from database by id
exports.deleteContract = (req,res) =>{
    // console.log('delete request reached')
    con.query('DELETE FROM dbkwaysi.contracts WHERE contractid = ?',[req.params.id], function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'contract record deleted successfully'
            })
        }
    })
}