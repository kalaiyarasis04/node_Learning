//import the exoress module
const express = require('express');

const helloRoute = require(`./routes/hello`);
const mongoose = require('mongoose');
const authRouter = require(`./routes/auth`);
const bannerRouter = require('./routes/banner');
const categoryRouter = require('./routes/category');
const subCategoryRouter = require('./routes/subCategory');
const productRouter = require('./routes/product')
const productReview = require('./routes/product_review');

//Define the port number the server will listen on 
const PORT = 3000;

//Create an instance of an express application
//because it give us the starting point

const app = express();
//mongodb string
const DB = "mongodb+srv://kalaiyarasi:Kalai123@cluster0.1mwycjl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json());
app.use(authRouter);
app.use(bannerRouter);
app.use(categoryRouter);
app.use(subCategoryRouter);
app.use(productRouter);
app.use(productReview);
//middleware - to register routes or to mount routes
//app.use(helloRoute);

mongoose.connect(DB).then(() => { 
    console.log(`Mongodb Connected`);
    
});
// app.get("/hello", (req, res) => {
//     res.send(`Hello World`);
// });

//start the server and listen on the specified port
app.listen(PORT, "0.0.0.0", function () {
    //LOG THE NUMBER
    console.log(`server is running on port ${PORT}`);
});


//console.log("hello world");