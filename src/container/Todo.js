import React, { Component } from 'react';
import TodoList from "../components/TodoList";
import InputTodo from "../components/InputTodo";

class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            text: "",
        };
    }

    addTodo = () => {
        const tmp = this.state.todos;
        this.setState({
            todos: [...tmp, {
                task: this.state.text,
                complete: false
            }]
        });
    }

    changeText = (e) => {
        this.setState({
            text: e.target.value,
        });
    }

    deleteTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter((item, index) => {
                console.log(index);
                return index !== id;
            })
        });
    }

    completeTodo = (id) => {
        this.setState({
            todos: this.state.todos.map((item, index) => {
                if (index === id)
                {
                    item.complete = !item.complete;
                }
                return item;
            })
        });
    }

    render() {
        return (
            <div className="todo">
                <TodoList todos={this.state.todos} deleteTodo={(id) => this.deleteTodo(id)} completeTodo={(id) => this.completeTodo(id)} />
                <InputTodo addTodo={this.addTodo} changeText={this.changeText} text={this.state.text} />
            </div>
        );
    }
}

export default Todo;