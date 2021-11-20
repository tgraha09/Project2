const models = require('../models');
const { defaultRecipe, defaultSearch } = require('./defaults');
const http = require('https');
const query = require('querystring');
const { Domo } = models;
const userSearchParameters = [];
const userRecipes = [];
const searchIdx = -1;
var latestFood, latestTag
const GETSearchedRecipes = (req, res) =>{
  console.log("GETSearchedRecipes");
  
  let query = req.query
  const food = `${query.food}`;
  const tag = `${query.tag}`;
  if (!food || !tag) { //just need to check search fields 
    return res.status(400).json({ error: 'RAWR! All fields are required' });
  }
  console.log(query)
  if(userSearchParameters.length == 0){
    userSearchParameters.push(defaultSearch)
  }
  //console.log(userSearchParameters);
  let result;
  for (let i = 0; i < userSearchParameters.length; i += 1) {
    const recipeObj = userSearchParameters[i];
    if (recipeObj.food === food && recipeObj.tag === tag) {
      result = recipeObj;
    }
  }

  if(result == undefined || result == ""){
    console.log("NULL");
    //console.log(recipe)
    return res.status(200).json({ userSearchParameters });
  }
  return res.status(200).json({ result });
  //console.log(userSearchParameters);
  //res.status(400).json({ error: 'RAWR! No Resources found' });
  //return res.json({ redirect: '/recipes' });
}

const POSTSearchedRecipes = (req, res) =>{
  console.log("POSTSearchedRecipes");
  let query = req.body
  const food = `${query.food}`;
  const tag = `${query.tag}`;
  console.log(query);
  if (!food || !tag) { //just need to check search fields 
    return res.status(400).json({ error: 'RAWR! All fields are required' });
  }
  //console.log(query);
  const options = {
    method: 'GET',
    hostname: 'tasty.p.rapidapi.com',
    port: null,
    path: `/recipes/list?from=0&size=20&tags=${tag}&q=${food}`,
    headers: {
      'x-rapidapi-host': 'tasty.p.rapidapi.com',
      'x-rapidapi-key': '170e038a70mshc48a677384b7b29p120f51jsn123cfd31d18c',
      useQueryString: true,
    },
  };

  const tasty = http.request(options, (_res) => {
    const chunks = [];

    _res.on('data', (chunk) => {
      chunks.push(chunk);
    });

    _res.on('end', () => {
      const body = JSON.parse(Buffer.concat(chunks).toString());
      const results = [];
      // //console.log(body);
      body.results.forEach((json) => {
        // //console.log(json);
        const recipeObj = {
          name: json.name,
          id: json.id,
          searchIndex: json.position,
          thumbnail: json.thumbnail_url,

        };
        /**/
        results.push(recipeObj);
      });
      // //console.log(arr);
      // //console.log(body);
      userSearchParameters.push({
        searchedAt: new Date(),
        food,
        tag,
        results,
      });

      let recipe;
      for (let i = 0; i < userSearchParameters.length; i += 1) {
        const recipeObj = userSearchParameters[i];
        if (recipeObj.food === food && recipeObj.tag === tag) {
          recipe = recipeObj;
          latestFood = food
          latestTag = tag
        }
      }

      
      
      //console.log(userSearchParameters);
     // console.log(recipe)
      /*if (acceptedTypes.includes('text/xml')) {
        //const content = buildXML(recipe);
        //respond(request, response, 201, content, 'text/xml');
      } else {
        // //console.log(recipe)
        //respond(request, response, 201, JSON.stringify(recipe), 'application/json');
      }*/
    });
  });

  tasty.end();
  //return res.json({ userSearchParameters });
  //res.redirect('/recipes')
}



const makerPage = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};

const makeDomo = (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.height) {
    return res.status(400).json({ error: 'RAWR! Both name, age and height are requried' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    height: req.body.height,
    owner: req.session.account._id,
  };

  console.log(domoData);

  const newDomo = new Domo.DomoModel(domoData);
  console.log(newDomo);
  const domoPromise = newDomo.save();

  domoPromise.then(() => res.json({ redirect: '/maker' }));

  domoPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists.' });
    }

    return res.status(400).json({ error: 'An error occured' });
  });
  return domoPromise;
};

const getDomos = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    // console.log(docs)
    return res.json({ domos: docs });
  });
};

/*module.exports.makerPage = makerPage;
module.exports.getDomos = getDomos;
module.exports.make = makeDomo;*/
module.exports = {
  POSTSearchedRecipes,
  GETSearchedRecipes
}
