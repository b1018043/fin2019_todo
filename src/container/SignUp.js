import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            pass: '',
            repass: ''
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

    rePassChange = e => {
        this.setState({
            repass: e.target.value
        });
    }


    render() {
        const { email, pass, repass } = this.state;
        return (
            <div className="login">
                <Typography variant="h5" gutterBottom>
                    SignUp
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
                <TextField
                    label="Password again"
                    type="password"
                    value={this.state.repass}
                    onChange={this.rePassChange}
                />
                <Button
                    onClick={() => {
                        if (pass === repass)
                        {
                            this.props.createWithEmailAndPassword(email, pass);
                        } else
                        {
                            console.log("error");
                        }
                    }}
                >
                    submit
                </Button>
            </div>
        );
    }
}

export default SignUp;