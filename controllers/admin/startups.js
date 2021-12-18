const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);



//add product to group by groupid and product id
exports.addproducttogroup = (req,res)=>{
    product={
        groupid: req.body.selectedgroupid,
        productid: req.body.productid
    }
    // console.log(product)
    con.query('INSERT INTO dbkwaysi.groupdetails SET ?',[product],function(err,result){
        if(err){
            // console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message : 'product added to the group'
            })
        }
    })
}


//upload images of groups
exports.images = (req, res) => {
    // console.log('request@@@@@#$$$##$#$', req.files)
    if(req.files === null){
        return res.status(400).json({
            massage: 'No file uploaded'
        })
    }else{
        const file = req.files.file;
        file.name = Date.now()+file.name
        // console.log(file)
        // console.log('reached else state')
        file.mv(`public/uploads/groups/${file.name}`,err =>{
            if(err){
                // console.error('upload error@@@@@@@@@@@', err);
                return res.status(500).send(err);
            }
    
            res.json({fileName: file.name, filePath: `/uploads/groups/${file.name}`});
        });
    }

}

//delete groups from database by id
exports.deleteGroup = (req,res,next) =>{
    groupid = req.params.id
    // console.log('delete request reached')
    con.query('DELETE FROM dbkwaysi.groups WHERE groupid = ?',[groupid], function(err,result){
        if(err){
            // console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            // console.log('reached success deletewed')
            res.status(200).json({
                message: 'group deleted successfully'
            })
        }
    })
}


//update group information by id 
exports.updateGroup = (req, res) =>{
    updateGroup = {
        nameArabic: req.body.nameArabic,
        image: req.body.image,
        nameEnglish:req.body.nameEnglish,
        info: req.body.info,
        active:req.body.active,
        link:req.body.link,
        notes:req.body.notes,
        itemid:req.body.itemid,
        sequence:req.body.sequence
    }
    con.query('UPDATE dbkwaysi.groups SET ? WHERE groupid = ?',[updateGroup, req.params.id],
    function(err,result){
        if(err){
            // console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'group updated successfully'
            })
        }
    })
}



//get one group by id 
exports.getGroupById = (req, res) =>{
    groups = []
    con.query(`SELECT * FROM dbkwaysi.groups WHERE groupid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            groups = rows[0]
            res.status(200).json({
                groups
            })
        }
    })
}


//##########################


//view groups in admin dashbored
exports.getGroup = (req, res) => {
    groups = []
    con.query('SELECT * FROM dbkwaysi.groups', function(err,rows,fields){
        if(err){
            // console.log(err)
            res.status(400).json({
                massage : err
            });
        }else{
            groups = rows
            // console.log(groups)
            res.status(200).json({
                groups
            })
        }
    })
}



//create group
exports.create = (req, res) => {
    
    createGroup = {
        nameArabic: req.body.nameArabic,
        nameEnglish:req.body.nameEnglish,
        image: req.body.image,
        active:req.body.active,
        info: req.body.info,
        link:req.body.link,
        notes:req.body.notes,
        itemid:req.body.itemid,
        sequence:req.body.sequence
    }
    // console.log(createGroup)
    con.query('INSERT INTO dbkwaysi.groups SET ?',[createGroup],
    function(err, result){
        if(err){
            // console.log("ERROR IN ADDING group", err)
            res.status(400).json({
                massage : err
            });
            return;
        }else{
            res.status(200).json({
                message : 'group ADDED TO DATABASE'
            })
            return;
        }
    });
    
};