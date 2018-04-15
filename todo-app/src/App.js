import React, { Component } from 'react';
import Axios from 'axios';
import logo from './logo.svg';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Title from './components/Title';
// import Container from './components/Container';
class App extends Component {

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
                <Title  todoCount={this.state.data.length}/>
                <TodoForm addTodo={this.addTodo.bind(this)}/>
                <TodoList todos={this.state.data}
                remove={this.handleRemove.bind(this)}
                />
            </div>
        )
    }

  // render() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         {/* <img src={logo} className="App-logo" alt="logo" />
  //         <h1 className="App-title">Welcome to React</h1> */}
  //         <Title />
  //       </header>
  //       <p className="App-intro">
  //         To get started, edit <code>src/App.js</code> and save to reload.
  //       </p>
  //     </div>
  //   );
  // }
}

export default App;
