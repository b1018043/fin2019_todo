import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import './App.css';
import firebase from './firebase';
import Login from './container/Login';
import MyAppBar from './components/MyAppBar';
import Home from './container/Home';
import SignUp from "./container/SignUp";
import Todo from "./container/Todo";
import SideBar from "./components/SideBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      authenticated: false,
      drawerOpen: false,
      uid: ""
    };
  }

  async fetchUser() {
    await firebase.auth().onAuthStateChanged(user => {
      if (user)
      {
        this.setState({
          authenticated: true,
          user: user,
          loading: false,
          uid: user.uid
        });
      } else
      {
        this.setState({
          authenticated: false,
          user: null,
          loading: false,
          uid: null
        });
      }
      return user;
    });
  }

  logout = () => {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
  }

  componentDidMount() {
    this.fetchUser();
  }

  loginWithEmail = (email, pass) => {
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

  createWithEmailAndPassword = (email, pass) => {
    firebase.auth().createUserWithEmailAndPassword(email, pass)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/weak-password')
        {
          alert('The password is too weak.');
        } else
        {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  drawerChange = (bool) => {
    this.setState({
      drawerOpen: bool,
    });
  }

  render() {
    const { authenticated, uid } = this.state;
    console.log("test", authenticated);
    return (
      <div>
        {authenticated ? <MyAppBar logout={this.logout} drawerChange={(bool) => this.drawerChange(bool)} /> : null}
        <SideBar drawerOpen={this.state.drawerOpen} onClose={() => this.drawerChange(false)} />
        <Switch>
          <Route exact path="/signup" render={() => !authenticated ? <SignUp createWithEmailAndPassword={this.createWithEmailAndPassword} /> : <Redirect to="/home" />} />
          <Route exact path="/" render={() => !authenticated ? <Login loginWithEmail={this.loginWithEmail} /> : <Redirect to="/home" />} />
          <Route exact path="/todo" render={() => authenticated ? <Todo uid={uid} /> : <Redirect to="/" />} />
          <Route exact path="/home" render={() => authenticated ? <Home /> : <Redirect to="/" />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

