import React, {Component} from "react";
//  need to also import the other dependencies I defined - oops 
import Title from './Title';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

window.id = 0;

class TodoApp extends React.Component{
    constructor(props) {
        //  passing props to parent class 
        super(props);
        //  set initial state 
        this.state = {
            data: []
        }
    }
    //  add todo handler  - this relates to the todo list js form
    addTodo(val) {
        const todo = {text: val, id: window.id++}
        //  updating by using array method - push
        this.state.data.push(todo);
        //  update the state 
        this.setState({data: this.state.data});
    }
    //  handle removing todo items  - using array filter methods 
    handleRemove(id) {
        const remainder = this.state.data.filter((todo) => {
            if(todo.id !== id) return todo;
                });
        //  use result to update the sate 
        this.setState({data: remainder});
    }

    render() {
        //JSX
        return (
            <div>
                <Title />
                <TodoForm addTodo={this.addTodo.bind(this)}/>
                <TodoList todos={this.state.data}
                remove={this.handleRemove.bind(this)}
                />
            </div>
        )
    }
}