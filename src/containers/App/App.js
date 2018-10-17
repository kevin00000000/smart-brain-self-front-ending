import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import Particles from 'react-particles-js'
import Navigation from '../../components/Navigation/Navigation'
import Signin from '../../components/Signin/Signin'
import Register from '../../components/Register/Register'
import Main from '../Main/Main'
import './App.css';

const initState = {
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = initState;
  }

  onGetUser = (user) => {
    this.setState({user});
  }


  render() {
    return (
      <div className="App">
        <Particles 
        className='particels' 
        params={particlesOptions}/>
        <Route path='*' component={Navigation} />
        <Switch>
          <Route exact path='/' render={(props) => (<Signin {...props} onGetUser={this.onGetUser}/>)} />
          <Route exact path='/register' render={(props) => (<Register {...props} onGetUser={this.onGetUser}/>)} />
          <Route exact path='/home' render={(props) => (<Main {...props} user={this.state.user}/>)} />
        </Switch>
      </div>
    );
  }
}

export default App;
