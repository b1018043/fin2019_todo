import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import './App.css';
import firebase from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={user: null};
  } 
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })
  }
  // state = {
  //   drawerOpen: false
  // };
  // toggleDrawer = bool => {
  //   this.setState({
  //     drawerOpen: bool
  //   });
  // };

  // changeLink(link) {
  //   console.log("hoge");
  //   console.log(this.props.history.location.pathname);
  //   switch (link) {
  //     case "Home":
  //       this.props.history.push("/");
  //       break;
  //     case "Count":
  //       this.props.history.push("/count");
  //       break;
  //     case "Todo":
  //       this.props.history.push("/todo");
  //       break;
  //     default:
  //       this.props.history.push("/");
  //   }
  // }
  render() {
    return (
      <div>
        <h2>hoge</h2>
      </div>
    );
  }
}

export default withRouter(App);

