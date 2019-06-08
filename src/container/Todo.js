import React, { Component } from 'react';
import TodoList from "../components/TodoList";
import InputTodo from "../components/InputTodo";
import firebase from "../firebase";
import "./Todo.css";

class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            text: "",
        };
    }

    componentDidMount() {
        this.getTasksData();
    }

    getTasksData() {
        let db = firebase.firestore();
        console.log(this.props.uid);
        db.collection('todos')
            .where('userId', '==', this.props.uid)
            .get()
            .then(snapShot => {
                let tasks = [];
                snapShot.forEach(doc => {
                    console.log(doc);
                    tasks.push({
                        id: doc.id,
                        task: doc.data().task,
                        complete: doc.data().complete
                    });
                });
                console.log(tasks);
                this.setState({
                    todos: tasks
                });
            });
    }

    addTodo = () => {
        let db = firebase.firestore();
        const { text } = this.state;
        const tmp = this.state.todos;
        this.setState({
            todos: [...tmp, {
                task: text,
                complete: 0
            }]
        });
        db.collection(`todos`).add({
            task: text,
            complete: 0,
            userId: this.props.uid
        }).then(() => {
            this.getTasksData();
            this.setState({
                text:""
            });
        });
    }

    changeText = (e) => {
        this.setState({
            text: e.target.value,
        });
    }

    deleteTodo = (id) => {
        let db = firebase.firestore();
        console.log(id);
        db.collection('todos')
            .doc(id)
            .delete()
            .then(() => {
                this.getTasksData()
            });
    }

    toggleTodo = (id, com) => {
        let db = firebase.firestore();
        console.log(id);
        db.collection('todos')
            .doc(id)
            .update({
                complete: com + 1
            })
            .then(() => {
                this.getTasksData()
            }).catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }

    render() {
        const plan = this.state.todos.filter(function (item) {
            return item.complete === 0;
        });
        const ready = this.state.todos.filter(function (item) {
            return item.complete === 1;
        })
        const doing = this.state.todos.filter(function (item) {
            return item.complete === 2;
        })
        const done = this.state.todos.filter(function (item) {
            return item.complete === 3;
        })
        return (
            <div className="todo">
                <div className="todoList">
                    <TodoList text="Plan" notNext={false} todos={plan} deleteTodo={this.deleteTodo} toggleTodo={this.toggleTodo} />
                    <TodoList text="Ready" notNext={false} todos={ready} deleteTodo={this.deleteTodo} toggleTodo={this.toggleTodo} />
                    <TodoList text="Doing" notNext={false} todos={doing} deleteTodo={this.deleteTodo} toggleTodo={this.toggleTodo} />
                    <TodoList text="Done" notNext={true} todos={done} deleteTodo={this.deleteTodo} toggleTodo={this.toggleTodo} />
                </div>
                <InputTodo addTodo={this.addTodo} changeText={this.changeText} text={this.state.text} />
            </div>
        );
    }
}

export default Todo;