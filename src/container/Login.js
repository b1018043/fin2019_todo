import React, { Component } from 'react';
import firebase from '../firebase';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            pass: ''
        };
    }
    emailChange = e => {
        this.setState({
            email: e.target.value
        });
    }
    passChange = e => {
        this.setState({
            pass: e.target.value
        });
    }

    loginWithEmail = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
        });
    }

    render() {
        return (
            <div className="login">
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <TextField
                    label="Email"
                    value={this.state.email}
                    onChange={this.emailChange}
                />
                <TextField
                    label="Password"
                    value={this.state.pass}
                    onChange={this.passChange}
                />
                <Button
                    onClick={this.loginWithEmail}
                >
                    submit
                </Button>
            </div>
        );
    }
}

export default Login;