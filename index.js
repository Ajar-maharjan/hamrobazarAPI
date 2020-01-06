const express= require("express");
const mongoose = require('mongoose');
const uploadRouter = require('./routes/upload');



const app= express();
app.use('/upload', uploadRouter);


app.use (express.static("public"));

mongoose.connect("mongodb://localhost:27017/Hamrobazar", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const productSchema = {
    name:String,
    price: Number,
    condition: String,
    image:{
       type: String
      }
  };

  const Products = mongoose.model("products",productSchema);




  
  app.route("/products")
  .get(function(req,res){
    Products.find(function(err, foundProducts){
  if(!err){
    res.send(foundProducts)
  }else{
    res.send(err);
  }
  
    });
  })
  
  
  app.route("/products/:productTitle")
  .get(function(req, res){
    Products.findOne({title: req.params.products},function(err, foundProducts){
      if(foundProducts){
        res.send(foundProducts);
      }else{
        res.send("no products");
      }
    });
  });
  
app.listen(3000, function(){
  console.log("server started on port 3000");
});
