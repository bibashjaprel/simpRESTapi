const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//connecting with mongodb cloud
mongoose.connect("mongodb+srv://root9t2:"+encodeURIComponent("SpLG43YpMko9KY8h")+"@cluster0.wtf2xkb.mongodb.net/", {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(()=>{
    console.log("DB connection sucessful")
}).catch((err)=>{
    console.log(err)
});



const app = express();
var host = "localhost";
var port = 4500;



app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());



//Declearing Schema
const productSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
})

const Product = new mongoose.model("Product",productSchema)



app.get("/",(req,res)=>{
    res.send(`this is free dump api and you can  for your project. api link : http://${host}:${port}/api/v1/products`);
    
})
//Creating product
app.post("/api/v1/product/new",async(req,res)=>{

   const Products = await Product.create(req.body);
    res.status(201).json({
        success:true,
        Products
    })

})

//Fetching products

app.get("/api/v1/products",async(req,res)=>{
   const Products = await Product.find();
    res.status(200).json({sucess:true,Products})
})


//updating product
app.put("/api/v1/product/:id",async(req,res)=>{

    let singleproduct = await Product.findById(req.params.id);
    singleproduct = await Product.findByIdAndUpdate(req.params.id,req.body,
        {
            new:true,
            useFindAndModify:false,
            runValidators:true
        }) 

        res.status(200).json({
            success:true,
            singleproduct
        })
})


//Deleting Product

app.delete("/api/v1/product/:id",async(req,res)=>{

    let deleteproduct = await Product.findById(req.params.id);

    await deleteproduct.deleteOne();

    res.status(200).json({
        success:true,
        message:"Product is deleted sucessfully"
    })
})



app.listen(port, ()=>{
    console.log(`Server is Running on http://${host}:${port}`);
})