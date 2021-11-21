const controllers = require('./controllers');
const mid = require('./middleware');
const fs = require('fs')
const path = require('path')
const { createServer: createViteServer } = require('vite')
//const csrf = require('csurf');
const router = (app) => {
 // app.get('/getToken', controllers.Account.getToken);
  app.get('/recipes-json', controllers.recipes.GETSearchedRecipes); // mid.requiresSecure, mid.requiresLogout,
  /*app.get('/assets/index.a5111596.js', mid.requiresSecure, mid.requiresLogout,(req, res)=>{
    res.status(200).set({ 'Content-Type-Options': 'nosniff' }).render('app')
    console.log("script");
    res.sendFile(path.join(__dirname + '/../dist/assets/index.a5111596.js'));
  });*/
  /*app.get('/css', (req, res)=>{

    res.sendFile(__dirname+'/assets/index.8f77e6d6.css');
  });
  app.get('/vendor', (req, res)=>{
 
    res.sendFile(__dirname+'/assets/vendor.57c8bb31.js');
  });
  app.get('/script', (req, res)=>{

    res.sendFile(__dirname+'/assets/index.16524689.js');
  });*/
  app.get('/', mid.requiresSecure, mid.requiresLogout,(req, res)=>{
   // res.render('app')
    //res.render('app')
    //res.sendFile(path.join(__dirname + '/../dist/index.html'));
    res.sendFile(path.join(__dirname + '/../dist/index.html'));
  });
  app.get('/login', mid.requiresSecure, mid.requiresLogout, (req, res)=>{
    //console.log(req);
    //res.render('app');
    res.sendFile(path.join(__dirname + '/../dist/index.html'));
  });
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, (req, res)=>{
    //console.log(req);
    //res.render('app');
    res.sendFile(path.join(__dirname + '/../dist/index.html'));
  });
  app.get('/finder', mid.requiresLogin, (req, res)=>{
    //console.log(req);
    //res.render('app');
    res.sendFile(path.join(__dirname + '/../dist/index.html'));
  }) // mid.requiresLogin,
  app.get('/recipes', mid.requiresLogin, (req, res)=>{
    //console.log('/recipes');
    //res.render('app');
    res.sendFile(path.join(__dirname + '/../dist/index.html'));
  })
  
  app.post('/login', mid.requiresSecure, mid.requiresLogout,controllers.Account.login); //mid.requiresSecure, mid.requiresLogout,
  app.post('/signup', mid.requiresSecure, mid.requiresLogout,controllers.Account.signup); //mid.requiresSecure, mid.requiresLogout,
  app.post('/recipes-json', controllers.recipes.POSTSearchedRecipes);
   //mid.requiresSecure,
  /*
  app.get('/signup', (req, res)=>{ 
    //let cs = { csrfToken: req.csrfToken() }

    //console.log(req.csrfToken())
    res.render('app');
  });
  app.get('/finder', (req, res)=>{ 
    res.render('app');
  });
  app.post('/signup', controllers.Account.signup); //mid.requiresSecure, mid.requiresLogout,*/ 


  //app.post('/login',controllers.Account.login); //, mid.requiresSecure, mid.requiresLogout, 
  /*app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Domo.make);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);*/
};

module.exports = router;
