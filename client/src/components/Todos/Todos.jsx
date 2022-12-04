import React, { useState } from 'react';
import Form from '../Form/Form';
import './Todos.css';

function Todos({ todos , deletePost , editPost }) {
    console.log(todos , " in todo list component");

    let res;
    if(todos.length) {
        res = true;
    }
    else {
        res = false;
    }

  return (
    <div>
        {(res) ? todos.map((todo) => {
            return <div className='todo' key={todo.id}>
                <div className='container'>
                    <h1 className='todoTitle'><span>title:</span> {todo.title}</h1>
                    <h2 className='todoDescription'><span>description:</span> {todo.description}</h2>
                    <div className='buttonHolder'>
                    <button 
                    className='edit todoButton'
                    onClick={()=>
                         { editPost(todo.id)}}
                    >edit</button>
                    <button className='delete todoButton' onClick={()=> deletePost(todo.id)}>delete</button>
                    </div>
                </div>
            </div>
        }): <h1 className='addSome'>Opsss Add some todos</h1>}
    </div>
  )
}

export default Todos;