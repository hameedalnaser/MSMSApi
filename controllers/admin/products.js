const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);
const fileUpload = require('express-fileupload')
var jwt = require('jsonwebtoken');

//dashbard get product styles
exports.getProductStyles =(req,res,next)=>{
    styles=[]
    groups=[]
    listedgroups=[]
    productid=req.params.productid
    con.query('SELECT * FROM styles WHERE productid = ?',[productid],function(err,rows,fields){
        if(err){
            res.status(400).json({
                error:err
            })
        }else{
            styles = rows
            con.query('SELECT * FROM dbkwaysi.groups',function(err,rows,fields){
                if(err){
                    res.status(400).json({
                        error:err
                    })
                }else{
                    groups=rows
                    con.query('SELECT * FROM dbkwaysi.groups LEFT JOIN dbkwaysi.groupdetails ON groups.groupid = groupdetails.groupid WHERE groupdetails.productid = ?',[productid],
                    function(err,rows,fields){
                        if(err){
                            // console.log(err)
                            res.status(400).json({
                                error:err
                            })
                        }else{
                            listedgroups=rows
                            // console.log(listedgroups)
                            res.status(200).json({
                                styles,groups,listedgroups
                            })
                        }
                    })
                    
                }
            })
           
        }
    })
}


//dashboard products all
exports.getDashboardProducts =(req,res,next)=>{
    end=req.params.pageid*50
    start=(req.params.pageid*50)-50
    products=[]
    count={}
    con.query('SELECT * FROM products  ORDER BY productid DESC LIMIT ?,?',[start,end],function(err,rows,fields){
        if(err){
            res.status(400).json({
                error:err
            })
        }else{
            products = rows
            con.query('SELECT COUNT(*) AS count FROM products',function(err,rows,fields){
                if(err){
                    res.status(400).json({
                        error:err
                    })
                }else{
                    count=rows[0].count
                    res.status(200).json({
                        products,count
                    })
                }
            })
            
            
        }
    })
}

exports.getDashboardSales =(req,res,next)=>{
    products=[]
    con.query('SELECT * FROM products WHERE discount <> 0  ORDER BY productid DESC',function(err,rows,fields){
        if(err){
            res.status(400).json({
                error:err
            })
        }else{
            products = rows
            res.status(200).json({
                products
            })
        }
    })
}

exports.getDashboardNew =(req,res,next)=>{
    products=[]
    con.query('SELECT * FROM products WHERE isNew = 1  ORDER BY productid DESC',function(err,rows,fields){
        if(err){
            res.status(400).json({
                error:err
            })
        }else{
            products = rows
            res.status(200).json({
                products
            })
        }
    })
}

exports.getDashboardVIP =(req,res,next)=>{
    products=[]
    con.query('SELECT * FROM products WHERE isVip = 1 ORDER BY productid DESC',function(err,rows,fields){
        if(err){
            res.status(400).json({
                error:err
            })
        }else{
            products = rows
            res.status(200).json({
                products
            })
        }
    })
}

exports.getDashboardoutofStock =(req,res,next)=>{
    products=[]
    con.query('SELECT * FROM products WHERE isInStock = 0 ORDER BY productid DESC',function(err,rows,fields){
        if(err){
            res.status(400).json({
                error:err
            })
        }else{
            products = rows
            res.status(200).json({
                products
            })
        }
    })
}



//get style by id  for update support
exports.getStyleById = (req,res,next) =>{
    style = []
    con.query(`SELECT * FROM styles WHERE styleid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            style = rows[0]
            res.status(200).json({
                style
            })
        }
    })
}


//get product by id for update support
exports.getProductById =(req,res,next) =>{
    product = []
    con.query(`SELECT * FROM products WHERE productid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            product = rows[0]
            res.status(200).json({
                product
            })
        }
    })
}




//delete product by id 
exports.deleteProduct =(req,res,next)=>{
    con.query('DELETE FROM products WHERE productid = ?',[req.params.id], function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'brand deleted successfully'
            })
        }
    })
}


//update product by id
exports.updateProduct = (req, res, next) => {
    updateProduct = {
        brandid:req.body.brandid,
        cityid:req.body.cityid,
        categoryid:req.body.categoryid,
        storeid:req.body.storeid,
        subcateid:req.body.subcateid,
        classcateid: req.body.classcateid,
        name:req.body.name,
        description:req.body.description,
        useMethod:req.body.useMethod,
        cost:req.body.cost,
        margin:req.body.margin,
        price:req.body.price,
        discountMargin:req.body.discountMargin,
        discount:req.body.discount,
        discountPrice:req.body.discountPrice,
        imagePath:req.body.imagePath,
        isInStock:req.body.isInStock,
        isNew:req.body.isNew,
        isVip: req.body.isVip,
        model:req.body.model,
        productionDate:req.body.productionDate,
        expiryDate:req.body.expiryDate,
        serialnumber:req.body.serialnumber,
        priceType:req.body.priceType,
    }
    con.query('UPDATE products SET ? WHERE productid = ?',[updateProduct, req.params.id],
    function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'Product updated successfully'
            })
        }
    })
}

exports.updatedynamiclink = (req,res,next)=>{
    updatedlink = {dlink:req.body.shortLink}
    console.log('request body from react',req.body)
    con.query('UPDATE products SET ? WHERE productid = ?',[updatedlink, req.params.id],
    function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'dynamic link saved'
            })
        }
    })
}



//delete style by id 
exports.deleteStyle = (req,res,next) =>{
    con.query('DELETE FROM styles WHERE styleid = ?',[req.params.id], function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'style deleted successfully'
            })
        }
    })
}



//update style by id
exports.updateStyle = (req, res, next) =>{
    updateStyle = {
        productid:req.body.productid,
        color:req.body.color,
        name:req.body.name,
        images:req.body.images,
        cost:req.body.cost,
        margin:req.body.margin,
        price:req.body.price,
        discountMargin:req.body.discountMargin,
        discount:req.body.discount,
        discountPrice:req.body.discountPrice,
        quantity:req.body.quantity,
        size:req.body.size,
        priceType:req.body.priceType,
        ssnumber:req.body.ssnumber
    }
    con.query('UPDATE styles SET ? WHERE styleid = ?',[updateStyle, req.params.id],
    function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'Style updated successfully'
            })
        }
    })
}


//############################

//view products in admin dashboared it will send styles so each specific product will appearss
//get all products in list
exports.getProducts = (req, res, next) =>{
    let products = [];
    con.query('SELECT * FROM styles',function(err, rows, fields){
        if(err){
            res.status(404).json({
                error: err
            })
        }else{
            products = rows
            for(let i=0;i<products.length;i++){
                con.query(`SELECT name,description,useMethod,isInStock,isNew,isVip,model,serialnumber,productionDate,expiryDate FROM products WHERE productid = ?`,[products[i].productid], function(err,rows,fields){
                    if(err){
                        res.status(404).json({
                            error: err
                        })
                    }else{
                        products[i].product=rows
                        if(i==products.length-1){
                            res.status(200).json({
                                products
                            })
                        }
                    }
                    
                })
                
            }
            
            
        }
    })
}




//upload images of products
exports.images = (req, res) => {
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
        file.mv(`public/uploads/products/${file.name}`,err =>{
            if(err){
                // console.error('upload error@@@@@@@@@@@', err);
                return res.status(500).send(err);
            }
    
            res.json({fileName: file.name, filePath: `/uploads/products/${file.name}`});
        });
    }

}

// adding product page (provide children data to add parent)
exports.addProductPage = (req, res) => {
    let brands = [];
    let categories = [];
    let subcategories = [];
    let classcategories = [];
    let store = [];
    let cities = [];
    
    con.query('SELECT * FROM brands',
    function(err, rows, fields){
        if(err){
            res.status(404).json({error: err})
        }else{
            brands = rows
            con.query('SELECT * FROM categories',
            function(err, rows, fields){
                if(err){
                    res.status(404).json({error: err})
                }else{
                    categories = rows
                    con.query('SELECT * FROM subcategories',
                    function(err, rows, fields){
                        if(err){
                            res.status(404).json({error: err})
                        }else{
                            subcategories = rows
                            con.query('SELECT * FROM classcategories',
                            function(err, rows, fields){
                                if(err){
                                    res.status(404).json({error: err})
                                }else{
                                    classcategories = rows
                                    con.query('SELECT * FROM store',
                                    function(err, rows, fields){
                                        if(err){
                                            res.status(404).json({error: err})
                                        }else{
                                            store = rows
                                            con.query('SELECT * FROM cities',
                                            function(err, rows, fields){
                                                if(err){
                                                    res.status(404).json({error: err})
                                                }else{
                                                    cities = rows
                                                    res.status(200).json({
                                                        brands, categories, subcategories, classcategories, store, cities
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

exports.create = (req, res) => {

    createProduct = {
        brandid:req.body.brandid,
        cityid:req.body.cityid,
        categoryid:req.body.categoryid,
        storeid:req.body.storeid,
        subcateid:req.body.subcateid,
        classcateid: req.body.classcateid,
        name:req.body.name,
        description:req.body.description,
        useMethod:req.body.useMethod,
        cost:req.body.cost,
        margin:req.body.margin,
        price:req.body.price,
        discountMargin:req.body.discountMargin,
        discount:req.body.discount,
        discountPrice:req.body.discountPrice,
        imagePath:req.body.imagePath,
        isInStock:req.body.isInStock,
        isNew:req.body.isNew,
        isVip: req.body.isVip,
        model:req.body.model,
        productionDate:req.body.productionDate,
        expiryDate:req.body.expiryDate,
        serialnumber:req.body.serialnumber,
        priceType:req.body.priceType,
    }
    con.query('INSERT INTO products SET ?',
    [createProduct],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING PRODUCT", err)
            res.status(400).json({
                massage : err
            });
            return;
        }else{
            productid = result.insertId
            res.status(200).json({
                message : `PRODUCT ADDED TO DATABASE PRODUCT ID IS (${productid})`
            })
            return;
        }
    }); 
};

//adding style page
exports.addStyle = (req,res,next) => {
    let products = []
    con.query('SELECT * FROM products', function(err, rows, fields){
        if(err){
            res.status(404).json({error: err})
        }else{
            products = rows
            res.status(200).json({
                products
            })
        }
    })
}

//create product styles
exports.createStyles= (req,res,next) => {
    
    createStyle = {
        productid:req.body.productid,
        color:req.body.color,
        name:req.body.name,
        images:req.body.images,
        cost:req.body.cost,
        margin:req.body.margin,
        price:req.body.price,
        discountMargin:req.body.discountMargin,
        discount:req.body.discount,
        discountPrice:req.body.discountPrice,
        quantity:req.body.quantity,
        size:req.body.size,
        priceType:req.body.priceType,
        ssnumber:req.body.ssnumber,
    }
    con.query('INSERT INTO styles SET ?',
    [createStyle],
    function(err,result){
        if(err){
            res.status(404).json({
                error:err
            })
        }else{
            res.status(200).json({
                massage:`Style added to product id ${req.body.productid} with style id ${result.insertId}`
            })
        }
    })

    
}



//get stores 
exports.getStores = (req,res,next) => {
    // console.log('request reached')
    let stores = []
    con.query('SELECT * FROM dbkwaysi.store', function(err, rows, fields){
        if(err){
            res.status(404).json({error: err})
            
        }else{
            stores = rows
            res.status(200).json({
                stores
            })
        }
    })
}


//get all styles of suppliers
exports.getStoreStyles =(req,res,next) =>{
    styles = []
    con.query(`SELECT styles.*,products.isInStock,products.isNew,products.isVip,products.serialnumber,products.name as productname FROM styles LEFT JOIN products ON styles.productid = products.productid WHERE products.storeid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            styles = rows
            res.status(200).json({
                styles
            })
        }
    })
}