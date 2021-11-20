// const { request } = require('express');
const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

let token

const getToken = (req, res) => {
  if(token === undefined){
    //token = req.csrfToken()
  }
  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };
  console.log("getToken");
  console.log(csrfJSON);
  res.json(csrfJSON);
  
};

/* const signupPage = (req, res) => {
  res.render('signup', { csrfToken: req.csrfToken() });
}; */

const logout = (req, res) => {
  
  req.session.destroy();
  res.redirect('/');
};

const login = (req, res) => {
  console.log("Login Account");
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'RAWR! All fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }
    //token = undefined
    //sets account for the session 
    req.session.account = Account.AccountModel.toAPI(account);
    //console.log(req.session.account)
    return res.json({ redirect: '/finder' });
  });
};

const signup = (req, res) => {
  console.log("SIGN UP");
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'RAWR! Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);
    //console.log(newAccount)
    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/maker' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }

      return res.status(400).json({ error: 'An error occured' });
    });
  });
};

module.exports = {
  loginPage,
  login,
  logout,
  /* signupPage, */
  getToken,
  signup,
};
