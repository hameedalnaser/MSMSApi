const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);


// exports.getSubmittedOrders = (req,res,next)=>{
//     con.query('SELECT * FROM orders WHERE orderstatus = ? OR orderstatus = ?',['submitted','on delivery'],(err,rows,fields)=>{
//         if(err){
//             res.status(400).json({
//                 error : err
//             });
//         }else{
//             orders = rows
//             res.status(200).json({
//                 orders
//             })
//         }
//     })
// }

// exports.cancelOrder = (req,res,next)=>{
//     orderid = req.params.orderid
//     products = req.body.products
//     updatestatus = {orderstatus: 'cancelled'}
//     con.query('UPDATE orders SET ? WHERE orderid = ?',[updatestatus,orderid],(err,result)=>{
//         if(err){
//             res.status(400).json({
//                 error:err
//             })
//         }else{
//             for(i=0;i<products.length;i++){
//                 quantity= products[i].quantity + products[i].style.quantity
//                 quantity = {quantity: quantity}
//                 styleid = products[i].style.styleid
//                 con.query('UPDATE styles SET ? WHERE styleid = ?',[quantity, styleid],(err,result)=>{})
//                 if(i == (products.length)-1){
//                     console.log('response sent')
//                     res.status(200).json({
//                         message: 'تم الغاء الطلب واعادة الكمية الى المنتجات'
//                     })
//                 }
//             }
//         }
//     })
    
// }

// //suplier order by id
// exports.getSupplierOrderByID = (req,res,next)=>{
//     orderid = req.params.orderid
//     address = {}
//     products ={}
//     orderinfo = {}
//     con.query('SELECT * FROM orders WHERE orderid = ?',[orderid],(err,rows,fields)=>{
//         if(err){
//             res.status(400).json({
//                 error : err
//             });
//         }else{
//             orderinfo = rows[0]
//             addressid = rows[0].addressid
//             userid= rows[0].userid
//             con.query('SELECT * FROM address WHERE addressid = ?',[addressid],(err,rows,fields)=>{
//                 if(err){
//                     res.status(400).json({
//                         error : err
//                     });
//                 }else{
//                     address = rows[0]
//                     orderinfo.address = address
//                     con.query(`SELECT * FROM orderdetails WHERE orderid = ?`,[orderid],(err,rows,fields)=>{
//                         if(err){
//                             res.status(400).json({
//                                 error : err
//                             });
//                         }else{
//                             products = rows
//                             // console.log('######################',products)
//                             orderinfo.products = products
//                             for(let i=0;i<products.length;i++){
//                                 con.query(`SELECT * FROM styles WHERE styleid = ?`,[products[i].styleid],(err,rows,fields)=>{
//                                     orderinfo.products[i].style = rows[0]
//                                     productid=rows[0].productid//modified
//                                     if(i === products.length-1 ){
//                                         for(let i =0;i<products.length;i++){
//                                             con.query(`SELECT * FROM products INNER JOIN store ON products.storeid = store.storeid WHERE productid = ?`,[products[i].style.productid],(err,rows,fields)=>{
//                                                 orderinfo.products[i].product = rows[0]
//                                                 if(i === products.length-1 ){
//                                                     res.status(200).json({
//                                                         orderinfo
//                                                     })
//                                                 }
//                                             })
//                                         }
//                                     }
//                                 })
//                             }
//                         }
//                     })
//                 }
//             })
//         }
//     })
// }

// exports.getOrderByID = (req,res,next)=>{
//     orderid = req.params.orderid
//     address = {}
//     products ={}
//     orderinfo = {}
//     con.query('SELECT * FROM orders WHERE orderid = ?',[orderid],(err,rows,fields)=>{
//         if(err){
//             res.status(400).json({
//                 error : err
//             });
//         }else if(rows[0] === undefined){
//             // console.log(rows)
//             res.status(400).json({
//                 error: "orderid is undefined"
//             })
//         }
//         else{
//             // console.log("end else",rows[0])
//             orderinfo = rows[0]
//             addressid = rows[0].addressid
//             userid= rows[0].userid
//             con.query('SELECT * FROM address INNER JOIN cities ON address.cityid = cities.cityid WHERE address.addressid = ?',[addressid],(err,rows,fields)=>{
//                 if(err){
//                     // console.log(err)
//                     res.status(400).json({
//                         error : err
//                     });
//                 }else{
//                     // console.log(rows)
//                     address = rows[0]
//                     orderinfo.address = address
//                     con.query(`SELECT * FROM orderdetails WHERE orderid = ?`,[orderid],(err,rows,fields)=>{
//                         if(err){
//                             res.status(400).json({
//                                 error : err
//                             });
//                         }else{
//                             products = rows
//                             // console.log('######################',products)
//                             orderinfo.products = products
//                             for(let i=0;i<products.length;i++){
//                                 con.query(`SELECT * FROM styles WHERE styleid = ?`,[products[i].styleid],(err,rows,fields)=>{
//                                     orderinfo.products[i].style = rows[0]
//                                     productid=rows[0].productid//modified
//                                     if(i === products.length-1 ){
//                                         for(let i =0;i<products.length;i++){
//                                             con.query(`SELECT * FROM products WHERE productid = ?`,[products[i].style.productid],(err,rows,fields)=>{
//                                                 orderinfo.products[i].product = rows[0]
//                                                 if(i === products.length-1 ){
//                                                     res.status(200).json({
//                                                         orderinfo
//                                                     })
//                                                 }
//                                             })
//                                         }
//                                     }
//                                 })
//                             }
//                         }
//                     })
//                 }
//             })
//         }
//     })
// }


// exports.updateOrderStatus = (req,res,next)=>{
//     orderid = req.params.orderid
//     updateorder = {
//         orderstatus: req.body.orderstatus
//     }
//     con.query('UPDATE orders SET ? WHERE orderid = ?',[updateorder, orderid],
//     function(err,result){
//         if(err){
//             res.status(200).json({
//                 error: err
//             })
//         }else{
//             res.status(200).json({
//                 message: 'order has been updated successfully'
//             })
//         }
//     })
// }

// //update order notes
// exports.updateOrderNotes = (req,res,next)=>{
//     orderid = req.params.orderid
//     updateorder = {
//         notes: req.body.notes
//     }
//     con.query('UPDATE orders SET ? WHERE orderid = ?',[updateorder, orderid],
//     function(err,result){
//         if(err){
//             res.status(200).json({
//                 error: err
//             })
//         }else{
//             res.status(200).json({
//                 message: 'order notes has been updated successfully'
//             })
//         }
//     })
// }


exports.getRecommandation = (req,res,next)=>{
    recomm = []
    con.query('SELECT * from recommendations',function(err,rows,result){
        
        if(err){
            res.status(400).json({
                error:err
            })
        }else{
            recomm = rows
            res.status(200).json({
                recomm
            })
        }
    })
}

// add recommandations
exports.createRecommandation = (req, res,next) => {

    createRecom = {
        recom_title:req.body.recom_title,
        recom_letter:req.body.recom_letter,
        recom_date:req.body.recom_date,
        recom_madeby:req.body.recom_madeby,
        communityid:req.body.communityid
    }


    con.query('INSERT INTO recommendations SET ?',
    [createRecom],
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

// get recommendation by id
exports.getRecommandationById = (req, res) =>{
    recommendation = []
    con.query(`SELECT * FROM recommendations WHERE recommendationid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            recommendation = rows[0]
            res.status(200).json({
                recommendation
            })
        }
    })
}


// update recommendations

exports.updateRecommendation = (req, res, next) =>{
    updateRecomm = {
        recom_title:req.body.recom_title,
        recom_letter:req.body.recom_letter,
        recom_date:req.body.recom_date,
        recom_madeby:req.body.recom_madeby,
    }

    con.query('UPDATE recommendations SET ? WHERE recommendationid = ?',[updateRecomm, req.params.id],
    function(err,result){
        if(err){
            // console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'recommandation has been updated'
            })
        }
    })
}




// //under testing 
// exports.supplierproducts = (req,res,next)=>{
//     // storeid=req.params.storeid
//     stores = []
//     orders = []
//     con.query('SELECT * from store',function(err,rows,result){
//         stores=rows
//     })
//     con.query(`SELECT * FROM orderdetails LEFT JOIN orders ON orderdetails.orderid = orders.orderid WHERE orders.orderstatus = ?`,['submitted'],function(err,rows,result){
//         if(err){
//             res.status(400).json({
//                 error:err
//             })
//         }else{
//             orders = rows
//             for(let i=0;i<orders.length;i++){
//                 con.query(`SELECT * FROM styles WHERE styleid = ?`,[orders[i].styleid],(err,rows,fields)=>{
//                     orders[i].style = rows[0]
//                     productid=rows[0].productid//modified
//                     if(i === orders.length-1 ){
//                         for(let i =0;i<orders.length;i++){
//                             con.query('SELECT * FROM products INNER JOIN store ON products.storeid = store.storeid WHERE productid = ?',[orders[i].style.productid],(err,rows,fields)=>{
//                                 orders[i].product = rows[0]
//                                 if(i === orders.length-1 ){
//                                     res.status(200).json({
//                                         orders,stores
//                                     })
//                                 }
//                             })
//                         }
//                     }
//                 })
//             }
//         }
//     })
// }



// // submit order for booth 
// exports.Boothordersubmit = async (req,res,next) =>{
//     // console.log(req.body)
//     // address = {
//     //     cityid:req.body.cityid,
//     //     userid: req.params.userid, 
//     //     reciverName: req.body.recivername, 
//     //     phone_number: req.body.reciverphone,
//     //     address: req.body.reciveraddres, 
//     //     referencePoint: req.body.reciverRP,
//     //     promocode:req.body.promocode,
//     //     gift:req.body.gift
//     // }
//     addressid=req.body.addressid
//     userid = req.params.userid
//     orderdetails= req.body.orderdetails
//     order ={userid: userid, addressid: addressid, orderstatus: "booth"}
//     //  function addAddress(address){
//     //   let order = new Promise((res,rej)=>{
//     //       con.query('INSERT INTO address SET ?',[address],(err, result)=>{
//     //         if(err){
//     //             rej( err);
//     //         }else{
//     //             addressid = result.insertId;
//     //            let order = {userid: userid, addressid: addressid}
//     //             res( order);
//     //         }
//     //     })
//     //   });
//     //     return order;
//     // }
//      function addOrder(order){
//         let orderId= new Promise((res,rej)=>{
//          con.query('INSERT INTO orders SET ?',order, (err, result)=>{
//             if(err){
//                 rej(err);
//             }else{
//                 let orderId = result.insertId;
//                 res(orderId);
//             }
//         })
//     });
//         return orderId;
//     }

//     //  function addOrderDetails(orderid,productid, styleid, count){
//         function addOrderDetails(orderid, styleid, count){
//         let resultFun= new Promise((res,rej)=>{
//          con.query(`SELECT IF(priceType=0,FLOOR(cost * ${req.usdtoiqd}),cost) AS cost,IF(priceType=0,FLOOR(price * ${req.usdtoiqd}),price) AS price,IF(priceType=0,FLOOR(discountPrice * ${req.usdtoiqd}),discountPrice) AS discountPrice,quantity FROM styles WHERE styleid = ?`,styleid,(err,rows,field)=>{
//             if(err){
//                 rej(err);

//             }else{
//                 orderdetail = {
//                     orderid: orderid,
//                     // productid: productid,
//                     styleid: styleid,
//                     cost:rows[0].cost,
//                     price: rows[0].price,
//                     discountPrice: rows[0].discountPrice,
//                     quantity: count
//                 }
                

//                 updatedquantity=(rows[0].quantity)-count
//                 quantity = {quantity: updatedquantity}
//                 // console.log('qut updated',quantity,updatedquantity)
//                 con.query('INSERT INTO orderdetails SET ?',orderdetail,(err,result)=>{
//                     if(err){
//                         rej(err);
//                     }
//                 })
//                 // console.log('qut updated',quantity,updatedquantity)
//                 con.query('UPDATE styles SET ? WHERE styleid = ?',[quantity, styleid],(err,result)=>{
//                     if(err){
//                         rej(err);
                        
//                     }else{
//                         res(true);
//                     }
//                 })
                    
                

//             }
//         });
//     });

//     return resultFun;
//     }
    
//     // let order = await addAddress(address)
//     orderid = await addOrder(order)
//     let boolMap = orderdetails.map(async (product)=>
//     {
//        let  {
//         //    productid,
//             styleid,
//             count} = product;

//         let bboooo=
//         await addOrderDetails(orderid,
//             // productid,
//              styleid, count);
//         return bboooo 
//     });
//         let mapmap = boolMap.reduce((e,ee)=>e&&ee); 
    
//     if(mapmap){
//         res.status(200).json({
//             message: 'تمت ارسال الطلبية سيتم توصيلها في اقرب وقت'
//         })
//     }else{
//         res.status(404).json({
//             error: 'حدث خطا في ارسال الطلبية الرجاء المحاولة مرة اخرى'
//         })
//     }
// }