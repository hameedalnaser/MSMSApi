const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);
var jwt = require('jsonwebtoken');


//update usd value equivelent to iqd
exports.updateusd = (req, res) =>{
    updateusd = {
        parameter_value: req.body.usdvalue,
    }
    con.query('UPDATE parameters SET ? WHERE parameterid = ?',[updateusd, 1],
    function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'dollars value updated successfully'
            })
        }
    })
}


exports.getusd = (req,res) =>{
    con.query('SELECT parameter_value FROM parameters WHERE parameterid = ?',[1],
        function(err,rows,fields){
            
            if(err){
                res.status(400).json({
                    error: 'error geting the valeu'
                })
            }else{
                usdtoiqd=rows[0].parameter_value
                console.log(usdtoiqd)
                res.status(200).json({
                    usdtoiqd
                })
            }
        }
    )
}





//##########################