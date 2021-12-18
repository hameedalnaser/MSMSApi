const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);
var jwt = require('jsonwebtoken');


//delete city from database by id
exports.deleteCity = (req,res) =>{
    // console.log('delete request reached')
    con.query('DELETE FROM cities WHERE cityid = ?',[req.params.id], function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'city deleted successfully'
            })
        }
    })
}


//update city information by id 
exports.updateByID = (req, res) =>{
    updateCity = {
        isOperational: req.body.isOperational,
        nameEnglish: req.body.nameEnglish,
        nameArabic: req.body.nameArabic,
        shippingCost:req.body.shippingCost,
        x_cord: req.body.x_cord,
        y_cord: req.body.y_cord,
    }
    con.query('UPDATE cities SET ? WHERE cityid = ?',[updateCity, req.params.id],
    function(err,result){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'city updated successfully'
            })
        }
    })
}



//get one city by id 
exports.getCityById = (req, res) =>{
    city = []
    con.query(`SELECT * FROM cities WHERE cityid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            city = rows[0]
            res.status(200).json({
                city
            })
        }
    })
}


//see cities on the list of admin
exports.getCities = (req, res) =>{
    cities = []
    con.query('SELECT * from cities', function(err,rows,fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            cities = rows
            res.status(200).json({
                cities
            })
        }
    })
}




//create city from admin page
exports.create = (req, res) => {
    createCity = {
        isOperational: req.body.isOperational,
        nameEnglish: req.body.nameEnglish,
        nameArabic: req.body.nameArabic,
        shippingCost:req.body.shippingCost,
        x_cord: req.body.x_cord,
        y_cord: req.body.y_cord,
    }
    console.log(createCity);
    con.query('INSERT INTO cities SET ?',
    [createCity],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING CITY", err)
            res.status(400).json({
                massage : err
            });
            return;
        }else{
            res.status(200).json({
                message : 'CITY ADDED TO DATABASE'
            })
            return;
        }
    });
    
};