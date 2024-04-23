require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require ('express-session')
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const artistRoutes = require('./routes/artists/artists');
const artRoutes = require('./routes/arts/arts');
const commentsRoutes = require('./routes/comments/comments');
const globalErrHandler = require('./middlewares/globalHandler');
const Art = require('./models/art/Art');
const { truncateArt } = require('./utils/helpers');
require("./config/dbConnect");

const app = express();

//helpers
app.locals.truncateArt = truncateArt

//middlewares
//------
//configure ejs
app.set("view engine","ejs")
app.set('views', path.join(__dirname, 'views'));
//serve static path
app.use(express.static(path.join(__dirname, 'views')));

//pass data
app.use(express.json())//pass incoming data
app.use(express.urlencoded({extended:true}))//pass form data

//method override
app.use(methodOverride("_method"));
let store = new MongoStore({
        mongoUrl:process.env.MONGO_URL,
        ttl:24*60*60, //1 day
        collection: "sessions"
    })

//session config
app.use(session({
    secret:process.env.SESSION_KEY,
    resave:false,
    saveUninitialized:true,
    store: store
}))
//save the login artist into locals
app.use((req,res,next)=>{
    if(req.session.artistAuth){
        res.locals.artistAuth = req.session.artistAuth

    }else{
        res.locals.artistAuth = null;
    }
    next()
})
//routes
//------
//render home
app.get('/',async (req,res)=>{
    try {
        const arts = await Art.find().populate("artist")
        res.render('index',{arts})
    } catch (error) {
        res.render('index',{error : error.message})
    }
})

app.get('/hello',async (req,res)=>{
    try {
        const arts = await Art.find().populate("artist")
        res.send('Hello World!')
    } catch (error) {
        res.send(error)
    }
})

//------
//artists route
app.use('/api/v1/artists/',artistRoutes)
//------

//------
//arts route
app.use('/api/v1/arts',artRoutes)
//------

//------
//comments route
app.use('/api/v1/comments',commentsRoutes)
//------

//Error handler middlewares
app.use(globalErrHandler)

//listen server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));
