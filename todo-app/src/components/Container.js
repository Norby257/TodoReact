import React, {Component} from "react";
import Axios from 'axios';
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
        // api 
        this.apiUrl = 'https://57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'
        
    }
    //  lifecycle methods 
    //  make HTTP req with Axios once component mounts
    componentDidMount() {
        Axios.get(this.apiUrl)
        .then((res) => {
            //  set state with result 
            this.setState({data:res.data});
        });
    
}
    //  add todo handler  - this relates to the todo list js form
    addTodo(val) {
        const todo = {text: val}
       //   update data with result of API call
       Axios.post(this.apiUrl, todo)
       .then((res) => {
           this.state.data.push(res.data);
           this.setState({data: this.state.data})
       })
    }
    //  handle removing todo items  - using array filter methods 
    handleRemove(id) {
        const remainder = this.state.data.filter((todo) => {
            if(todo.id !== id) return todo;
                });
        //  use result to update the sate 
        Axios.delete(this.apiUrl+ '/'+id)
        .then((res) => {
            this.setState({data: remainder});
        })
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

export default Container;