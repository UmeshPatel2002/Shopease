import express, { json } from "express";
import cors from "cors";
import { upload } from "./middlewares/multer.middleware.js";
import { Product } from "./models/product.model.js";
import { User } from "./models/user.models.js";
import jwt from 'jsonwebtoken'

const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("expres app is running")
})

// creating upload endpoint for images
app.use('/temp',express.static('public/temp'))

app.post('/public',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${process.env.PORT || 4000}/temp/${req.file.filename}`
    })
})


app.post('/addproduct', async (req, res) => {
    let products=await Product.find({});
    let id;
    if (products.length > 0) {
         let last_product = products[products.length - 1];
        id = last_product.id + 1; 
    } else {
         id = 1; 
    }

    const { name, image, category, new_price, old_price } = req.body;

    if (!id || !name || !image || !category || !new_price || !old_price) {
         return res.status(400).json({ error: "All fields are required." });
    }
    try {
        const product = new Product({
            id,
            name,
            image,
            category,
            new_price,
            old_price,
        });
        console.log(product);
        await product.save();
        console.log("saved");
        res.json({
            success: 1,
            name,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to save product." });
    }
});

// creating API for deleting the products
  app.post('/removeproduct', async(req,res)=>{
     await Product.findOneAndDelete({id:req.body.id});
     console.log("deleted",req.body.id);
     res.json({
        success:true,
        name:req.body.name,
     })
  })

  app.get('/allproducts', async (req, res) => {
    let products=await Product.find({});
    // console.log(products);
    res.send(products)

  })

//   creating endspoint for new collection
   app.get('/newcollection',async(req,res)=>{
     let products=await Product.find({})
     let newcollection=products.slice(1).slice(-8)
     res.send(newcollection)
   })

// creating endpoints popular in women

app.get('/popularinwomen',async(req,res)=>{
    let products=await Product.find({category:"women"})
    let popular_in_women=products.slice(0,4)
    res.send(popular_in_women)
  })

//   creating middleware to fetch user

const fetchUser=async(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        res.status(401).send({errors:"please authenticat using validating"})
    }
    else{
        try{
            const data=jwt.verify(token,'secret_ecom')
            req.user=data.user
            next()

        }
        catch(error){
            res.status(401).send({error: "please authenticate"})
        }
    }
}

  app.post('/addtocart',fetchUser,async(req,res)=>{
       let userdata=await User.findOne({_id:req.user.id})
       userdata.cart[req.body.itemId]+=1
       await User.findOneAndUpdate({_id:req.user.id},{cartData:userdata})
       res.send("Added")
  })

//   creating endpoint to remove product from cartdata

app.post('/removefromcart',fetchUser,async(req,res)=>{
    let userdata=await User.findOne({_id:req.user.id})
    if(userdata.cart[req.body.itemId]>0){
         userdata.cart[req.body.itemId]-=1
    }
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userdata})
    res.send("Removed")
})

app.get('/getcart',fetchUser,async(req,res)=>{
    let userdata=await User.findOne({_id:req.user.id})
    res.json(userdata.cart)
})


  app.post('/signup', async (req, res) => {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "existing user" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ name,email,password, error: "All fields are required." });
    }

    try {
        const user = new User({
            name,
            email,
            password,
            cart,
        });
        await user.save();

        const data = {
            user: {
                id: user.id,
            }
        };
        console.log(data)

        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

app.post('/login',async(req,res)=>{
    let user=await User.findOne({email:req.body.email});
    if(user){
        if(req.body.password===user.password){
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false, error:"wrong password"})
        }
       
    }
    else{
        res.json({success:false, error:"wrong email id"})
    }
})





export {app}