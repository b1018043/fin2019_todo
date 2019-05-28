import React, { Component } from "react";
import { Route, Switch ,Redirect,withRouter} from "react-router-dom";
import './App.css';
import firebase from './firebase';
import Login from './container/Login'
import MyAppBar from './components/MyAppBar'

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
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

  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     this.setState({ user })
  //   })
  // }

  UNSAFE_componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          user: user,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          user: null,
          loading: false
        });
      }
    });
  }  

  render() {
    return (
      <div>
        {this.state.user?<MyAppBar/>:<p>fuga</p>}
        <Login/>
      </div>
    );
  }
}

export default withRouter(App);

