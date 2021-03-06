import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import App from './modules/App'
import ProjectView from './modules/ProjectView'
import Repos from './modules/Repos'


render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/project/:project_id" component={ProjectView}/>
    
  </Router>
), document.getElementById('app'))
