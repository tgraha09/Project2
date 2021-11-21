import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import { renderToNodeStream, renderToString } from 'react-dom/server'
import { Display } from './components/display'
import { LoginWindow, SignupWindow, LoadClients } from './components/client/index.jsx'
import { Finder } from './components/finder'
import { BrowserRouter, Switch,Route, Link, Redirect } from 'react-router-dom'
import { Router } from 'react-router'
import { sendAjax } from './utilities'
import { Search } from './components/search'
import './App.css'




export class RecipeFinder extends React.Component {
  constructor(props){
    super(props);
    console.log(props.csrf);
    this.state = {
      csrf: props.csrf,
     
    };
    
    
  }

  
  render(){
    
    return <Display>
    
    <BrowserRouter>
    
      <Switch>
      <Route exact path={'/'}> 
          <LoginWindow ></LoginWindow>
        </Route>
        <Route exact path={'/login'}  > 
          <LoginWindow ></LoginWindow>
        </Route>
        <Route exact path={'/signup'}  > 
          <SignupWindow ></SignupWindow>
        </Route>
        <Route exact path={'/finder'}  > 
        <Finder ></Finder>
        </Route> 
        <Route exact path={'/recipes'}  > 
          <Search ></Search>
        </Route> 
      </Switch>
    </BrowserRouter> 
    
  </Display>
  }

  
}

export const App = (props)=>{
  //const App = this.render
  ReactDOM.render(
    <React.StrictMode>
    <Display>
    
    <BrowserRouter>
    
      <Switch>
      <Route exact path={'/'}> 
          <LoginWindow ></LoginWindow>
        </Route>
        <Route exact path={'/login'}  > 
          <LoginWindow ></LoginWindow>
        </Route>
        <Route exact path={'/signup'}  > 
          <SignupWindow ></SignupWindow>
        </Route>
        <Route exact path={'/finder'}  > 
        <Finder ></Finder>
        </Route> 
        <Route exact path={'/recipes'}  > 
          <Search ></Search>
        </Route> 
      </Switch>
    </BrowserRouter> 
    
  </Display>
  </React.StrictMode>,
    document.getElementById('root')
  )
 
}



export default RecipeFinder
