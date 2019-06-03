import React, { Component } from 'react';

const InputTodo = (props) => {
    return (
        <div>
            <input type="text" value={props.text} onChange={props.changeText} />
            <button onClick={props.addTodo}>Add</button>
        </div>
    );
}

export default InputTodo;