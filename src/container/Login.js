import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import "./Login.css";
import { Link } from "react-router-dom";

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

    render() {
        const { email, pass } = this.state;
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
                    type="password"
                    value={this.state.pass}
                    onChange={this.passChange}
                />
                <Button
                    variant="contained" color="primary"
                    onClick={()=>this.props.loginWithEmail(email,pass)}
                >
                    submit
                </Button>
                <br/>
                <Link to="/signup">signup</Link>
            </div>
        );
    }
}

export default Login;