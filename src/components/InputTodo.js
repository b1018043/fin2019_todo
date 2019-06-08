import React, { Component } from 'react';

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const InputTodo = (props) => {
    return (
        <div>
            <TextField label="todo text" value={props.text} onChange={props.changeText} />
            <Button variant="contained" color="primary" onClick={props.addTodo}>Add</Button>
        </div>
    );
}

export default InputTodo;