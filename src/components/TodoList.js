import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";



const TodoList = (props) => {
    return (
        <div className="todoBox">
            <h2 className="center">{props.text}</h2>
            {props.todos.map((todo, id) => {
                return (
                    <Card key={id}>
                        <CardContent>
                            <Typography
                                variant="h5"
                                component="h2"
                            >
                                {todo.task}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {!props.notNext?<Button value={todo.id} index={todo.complete} onClick={() => props.toggleTodo(todo.id, todo.complete)}>Next</Button>:null}
                            <Button value={todo.id} onClick={
                                () => props.deleteTodo(todo.id)
                            }>delete</Button>
                        </CardActions>
                    </Card>
                );
            })}
        </div>
    );
}

export default TodoList;