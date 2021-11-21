const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const fs = require('fs');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const url = require('url');
//const csrf = require('csurf');
const React = require('react');
const ReactDOM = require('react-dom');
const router = require('./router.js');
var cors = require('cors')
//express.static.mime.define({'text/plain': ['md']});
//const router = require('./src/router.js');
//const render = require('react-dom').render
const { createServer: createViteServer } = require('vite');

console.log('Server');
 
const port = process.env.PORT || process.env.NODE_PORT || 3000;
const dbURL = process.env.MONGODB_URI
|| 'mongodb+srv://tfire09:Facetime217!@cluster0.qga9p.mongodb.net/myFirstDatabaseAAAA?retryWrites=true&w=majority'
|| 'mongodb://localhost/project2AAAA';
mongoose.connect(dbURL, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});
const app = express()
//app.use(express.static(path.join(__dirname +'/../dist/assets', 'assets')));
app.use('/assets', express.static(path.join(__dirname, "/../dist/assets"))); //path.resolve(`${__dirname}/../dist/assets`)

//app.use(cookieParser());
/*const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));*/
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }
  console.log('Missing CSRF Token');
  return false;
});
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  key: 'sessionid',
  
  secret: 'Recipe Finder',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
}));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.disable('x-powered-by');
app.use(cookieParser());
//app.use(csrf());

router(app);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(__dirname)
  console.log(`Listening on port ${port}`);
});


//createServer()
//app.use(express.static('public'))
//console.log(`${__dirname}/../dist/`)
//app.use('/assets', express.static(path.join(`${__dirname}/../dist/`)))
//app.use('/assets', express.static(path.join(`${__dirname}/../dist/`)));
//app.use('/static', express.static(path.join(__dirname, 'public')))
/*
const app = express();
app.set('/bundle', express.static(path.resolve(__dirname + '/../dist')));
app.set('view engine', 'html');
app.get('/', (req, res) => { 
    res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
    //res.json({msg: "Test"})
});

app.listen(port, () => {
  console.log(`Server listening on: localhost:${port}`);
});*/
