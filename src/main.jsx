import React from 'react'
import ReactDOM from 'react-dom'

import RecipeFinder, { App } from './App'

import { LoadClients } from './components/client'

import { sendAjax } from './utilities'

/*sendAjax('GET', '/getToken', null, (result)=>{
  let state = {
      csrf: result.csrfToken,
      username: "",
      pass: "",
      pass2: "",
    };
    //t = this.state
  console.log(state);
  ReactDOM.render(
    <React.StrictMode>
      <App csrf={result.csrfToken} />
    </React.StrictMode>,
    document.getElementById('root')
  )
})*/

App()
//LoadClients()