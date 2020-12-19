var express = require('express');
var router = express.Router();


/// --- DB CONNECTION OBJ/LIB
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongoose = require('mongoose');


/// --- DB Model / Schema
var ProductSchema = require('../models/productModel').ProductSchema;

/// --- DB config
var dbconfig = require('../configs/config_DB');

/// --- Code CONTROLLERs
router.use(function timeLog (req, res, next) {
    console.log('\n\t Product controller - Time: ', Date().toString());
    next();
})

/// ..................................................
router.get('/', productPage);
function productPage(req, res) {
    res.render('product');
}

/// ..................................................
router.get('/list', listProductPage);
function listProductPage(req, res) {
  mongoose.connect( dbconfig.urldb, {useNewUrlParser: true, useUnifiedTopology: true} ,
    function(err) {
      if (err) throw err;
      var Product = mongoose.model("Product", ProductSchema, "product");

      Product.find({} , function(err, xproducts) {
        if (err) throw err;
        res.render("product-list",  {
          title: "ATN-Shop PRODUCT page", 
          username: "",
          products : xproducts 
          , configHeader: null , currpage: "Product"
          });
        console.log('Found:', xproducts);
      } );
    } );


}

/// ..................................................
router.get('/view', productViewPage);
function productViewPage(req, res) {

    MongoClient.connect( dbconfig.urldb, { useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db( dbconfig.dbname );
            dbo.collection("product").find({}).toArray(function(err, productlist) {
              if (err) throw err;
              
                res.render("product-list",  {
                    title: "ATN-Shop PRODUCT page", 
                    username: "",
                    products : productlist 
                    , configHeader: null , currpage: "Product"
                    });
                console.log('Found:', productlist);

              db.close();
            });
          });

    console.log("\n\t ... connect PRODUCT from ", req.connection.remoteAddress, req.headers.host);
}


/// --- EXports
module.exports = router;


