import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import './App.css';
import firebase from './firebase';
import Login from './container/Login';
import MyAppBar from './components/MyAppBar';
import Home from './container/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      authenticated: false,
      link: this.props.history.location.pathname
    };
  }

  // static getDerivedStateFromProps(nextProps,prevState){
  //   let new_link="/";
  //   if(prevState.user!==null){
  //     if (nextProps.history.location.pathname === "/" || nextProps.history.location.pathname === "/signup") nextProps.history.push("/home");
  //     new_link=nextProps.history.location.pathname;
  //   }
  //   else if(nextProps.history.location.pathname==="/signup"){
  //     new_link=nextProps.history.location.pathname;
  //   }else{
  //     if(nextProps.history.location.pathname!=="/"){
  //       nextProps.history.push('/');
  //     }
  //   }
  //   return {
  //     link: new_link
  //   }
  // }

  async fetchUser() {
    const user = await firebase.auth().onAuthStateChanged(user => {
      if (user)
      {
        this.setState({
          authenticated: true,
          user: user,
          loading: false
        });
        // this.props.history.push("/home");
      } else
      {
        this.setState({
          authenticated: false,
          user: null,
          loading: false
        });
        // this.props.history.push("/");
      }
      return user;
    });
  }

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    const { authenticated } = this.state;
    return (
      <div>
        {authenticated ? <MyAppBar /> : null}
        <Switch>
          <Route exact path="/" render={() => !authenticated ? <Login /> : <Redirect to="/home" />} />
          <Route exact path="/home" render={() => authenticated ? <Home /> : <Redirect to="/" />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

