const controllers = require('./controllers');
const mid = require('./middleware');
//const csrf = require('csurf');
const router = (app) => {
 // app.get('/getToken', controllers.Account.getToken);
  app.get('/recipes-json', controllers.recipes.GETSearchedRecipes); // mid.requiresSecure, mid.requiresLogout,
  app.get('/', mid.requiresSecure, mid.requiresLogout,(req, res)=>{
    //console.log(req);
    res.render('app');
  });
  app.get('/login', mid.requiresSecure, mid.requiresLogout, (req, res)=>{
    //console.log(req);
    res.render('app');
  });
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, (req, res)=>{
    //console.log(req);
    res.render('app');
  });
  app.get('/finder', mid.requiresLogin, (req, res)=>{
    //console.log(req);
    res.render('app');
  }) // mid.requiresLogin,
  app.get('/recipes', mid.requiresLogin, (req, res)=>{
    console.log('/recipes');
    res.render('app');
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
