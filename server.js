require('dotenv').config(); //load in my .env variables
const express = require('express');//bring in express to make our express app
const morgan = require('morgan'); //import morgan - morgan is a package 
const methodOverride = require('method-override'); //To use put and delete routes
const mongoose = require('mongoose'); //import mongoose - the package that allows the express application to interact w/ the mongodb
const wOrderRouter = require('./controllers/adminRoutes')
const UserRouter = require('./controllers/user');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const workOrdwer = require('./models/workOrder')

const app = express();

//////MidleWere Section/////
app.use(express.static('public'));
app.use(morgan('tiny')); //makes use of morgan
app.use(methodOverride('_method')); //makes use of method-override
app.use(express.urlencoded({ extended: true })); // parse urlencoded requests. reads form data
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DBURL}),
    saveUninitialized: true,
    resave: false,
}));

///////////Routes///////////////
app.use('/workflow', wOrderRouter);//placement of the routes dependencie is critical to be below all other dependencies
app.use('/user', UserRouter);

app.get('/', async (req, res) => {
    const allWOrders = await workOrdwer.find({});
    res.render("landing.ejs", { allWOrders });
});

app.listen(process.env.PORT, () => {
    console.log(`listening on port: ${process.env.PORT}`)
})