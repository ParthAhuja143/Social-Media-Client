import React, { useContext } from 'react'
import {BrowserRouter as Router , Redirect, Route } from 'react-router-dom'
import {Container} from 'semantic-ui-react'

import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import {AuthContext} from './utils/context.js'
import SinglePost from './pages/SinglePost.js'
import User from './pages/User.js'
import Error404 from './pages/Error404.js'

function App() {

  const context = useContext(AuthContext)
  //console.log(context)

  return (
    <Router>
      <Container >
      <Route exact path = '/' component = {Home}/>
      {context.user ? (<Redirect to = '/'/>) : (<Route exact path = '/login' component = {Login}/>)}
      {context.user ? (<Redirect to  = '/'/>) : (<Route exact path = '/register' component = {Register}/>)}
      <Route exact path = '/posts/:postId' component = {SinglePost} />
      <Route exact path = '/user/:username' component = {User} />
      <Route exact path = '/404' component = {Error404} />
      </Container>
    </Router>
  );
}

export default App;
