import React, { Component } from "react";

const TodoList = (props) => {
    return (
        <ul>
            {props.todos.map((todo, id) => {
                return (
                    <li key={id}>
                        <span
                            style={{
                                textDecoration: todo.complete ? "line-through" : ""
                            }}
                        >{todo.task}</span>
                        <button onClick={()=>props.completeTodo(id)}>Complete</button>
                        <button onClick={() => {
                            props.deleteTodo(id)
                        }}>delete</button>
                    </li>
                );
            })}
        </ul>
    );
}

export default TodoList;