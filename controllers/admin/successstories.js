const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);
var jwt = require('jsonwebtoken');



//delete city from database by id
exports.deleteStore = (req,res) =>{
    // console.log('delete request reached')
    con.query('DELETE FROM store WHERE storeid = ?',[req.params.id], function(err,result){
        if(err){
            // console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'Store deleted successfully'
            })
        }
    })
}


//update city information by id 
exports.updateByID = (req, res) =>{
    console.log(req.body)
    updateStore = {
        nameEnglish: req.body.nameEnglish,
        nameArabic: req.body.nameArabic,
        bio:req.body.bio,
        cityid:req.body.cityid,
        street:req.body.street,
        x_cord: req.body.x_cord,
        y_cord: req.body.y_cord,
    }
    con.query('UPDATE store SET ? WHERE storeid = ?',[updateStore, req.params.id],
    function(err,result){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'Store updated successfully'
            })
        }
    })
}



//get one store by id 
exports.getStoreById = (req, res) =>{
    store = []
    con.query('SELECT * FROM store WHERE storeid = ?',[req.params.id], function(err, rows, fields){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            store = rows[0]
            res.status(200).json({
                store
            })
        }
    })
}




//######################################





//view brands in admin dashbored
exports.getStores = (req, res) => {
    stores = []
    con.query('SELECT * from store', function(err,rows,fields){
        if(err){
            res.status(400).json({
                massage : err
            });
        }else{
            stores = rows
            res.status(200).json({
                stores
            })
        }
    })
}



//adding store page 
exports.addStore = (req,res) =>{
    cities = []
    con.query('SELECT * FROM cities', function(err,rows,fields){
        if(err){
            res.status(404).json({
                error:err
            })
        }else{
            cities = rows
            res.status(200).json({
                cities
            })
        }
    })
}


exports.createStore = (req, res) => {

    createStore = {
        nameArabic: req.body.nameArabic,
        nameEnglish:req.body.nameEnglish,
        bio: req.body.bio,
        cityid: req.body.cityid,
        street:req.body.street,
        x_cord: req.body.x_cord,
        y_cord: req.body.y_cord,
    }
    con.query('INSERT INTO store SET ?',
    [createStore],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING STORE", err)
            res.status(400).json({
                massage : err
            });
            return;
        }else{
            res.status(200).json({
                message : 'STORE ADDED TO DATABASE'
            })
            return;
        }
    });
    
};