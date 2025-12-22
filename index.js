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
const vendorRouter = require(`./routes/vendor`);
const orderRouter = require('./routes/order');

const cors = require('cors');
//Define the port number the server will listen on 
const PORT = 3000;
//Create an instance of an express application
//because it gsive us the starting point

const app = express();
//mongodb string
const DB = "mongodb+srv://kalaiyarasi:Kalai123@cluster0.1mwycjl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//const DB = "mongodb://devwrite1:devWrite1%40123@10.9.47.71:10051/admin?retryWrites=true&loadBalanced=false&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1/SalesDB";

app.use(express.json());
app.use(cors()); // enable cors for all routes and origin(Domain)
app.use(authRouter);
app.use(bannerRouter);
app.use(categoryRouter);
app.use(subCategoryRouter);
app.use(productRouter);
app.use(productReview);
app.use(vendorRouter);
app.use(orderRouter);

//middleware - to register routes or to mount routes
//app.use(helloRoute);

mongoose.connect(DB).then(() => {
    console.log(`Mongodb Connected`);

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));


db.once("open", () => {
    console.log("Connected to MongoDB");

    const itemsCollection = db.collection("Lead");
    
    // --- GET API ---
    app.get("/items", async (req, res) => {
      try {
        const items = await itemsCollection.find().toArray();
        res.json(items);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
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


