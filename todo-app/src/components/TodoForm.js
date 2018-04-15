import React, {Component} from "react";

const TodoForm = ({addTodo}) => {
    //  keep track of input 
    let input;

    return (
        <div>
            <input ref= {node => {
                input = node;
            }} />
            <button onClick={() => {
                addTodo(input.value);
                input.value = '';
            }}>
            +
            </button>
        </div>

    )
}

export default TodoForm;