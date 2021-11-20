import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import logo from './logo.svg'
import { Display } from './components/display'
import { LoginWindow, SignupWindow, LoadClients } from './components/client'
import { Finder } from './components/finder'
import { BrowserRouter, Switch,Route, Link, Redirect } from 'react-router-dom'
import { Router } from 'react-router'
import { sendAjax } from './utilities'
import { Search } from './components/search'
import './App.css'




class RecipeFinder extends React.Component {
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
        <Route exact path={`/`}> 
            <LoginWindow csrf={this.state.csrf}></LoginWindow>
          </Route>
          <Route exact path={`/login`}  > 
            <LoginWindow csrf={this.state.csrf}></LoginWindow>
          </Route>
          <Route exact path={`/signup`}  > 
            <SignupWindow csrf={this.state.csrf}></SignupWindow>
          </Route>
          <Route exact path={`/finder`}  > 
          <Finder csrf={this.state.csrf}></Finder>
          </Route> 
          
        </Switch>
      </BrowserRouter>
      
    </Display>
  }

  
}

export const App = (props)=>{
    
  return (<Display>
      
    <BrowserRouter>
    
      <Switch>
      <Route exact path={`/`}> 
          <LoginWindow ></LoginWindow>
        </Route>
        <Route exact path={`/login`}  > 
          <LoginWindow ></LoginWindow>
        </Route>
        <Route exact path={`/signup`}  > 
          <SignupWindow ></SignupWindow>
        </Route>
        <Route exact path={`/finder`}  > 
        <Finder ></Finder>
        </Route> 
        <Route exact path={`/recipes`}  > 
          <Search ></Search>
        </Route> 
      </Switch>
    </BrowserRouter> 
    
  </Display>)
  
}



export default RecipeFinder
