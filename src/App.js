import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch  ,Redirect} from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
//route
import Home from './pages/Home';
import Lost from './pages/Lost';
import Found from './pages/Found';
import Search from './pages/Search';
import Result from './pages/Search/Result/Result';
import NotMatch from './pages/404'
import login from './pages/login'
import ItemList_Student from './components/ItemList_student'
import search_result_Detail from './pages/Search/Result/Result'
// Admin
import manage from './pages/manage'
import ItemEdit from './pages/manage/Item/Edit'
 

class App extends Component {
  render() {
    return (
      <Router history={History}>
        <Switch>
          {/* Basic Routes */}
          <Route exact path="/" component={Home} />
          {/* Auth Routes */}
          <Route exact path="/lost" component={Lost} />
          <Route exact path="/found" component={Found} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/search/Result" component={Result} />
          <Route exact path="/login" component={login} />
          <Route exact path="/itemList_Student/:id" component={ItemList_Student} />
          <Route exact path="/search_result_Detail/:id/:status" component={search_result_Detail} />
          {/* Admin */}
          <Route exact path="/manage" component={manage} />
          <Route exact path="/Items/edit/:id" component={ItemEdit} />
          {/* NotMatch Routes */}
          <Redirect to="/" />
          <Route component={NotMatch} />
        </Switch>
      </Router>
    )
  }
}

export default App;

          
          

