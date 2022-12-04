import React, { useState, useEffect} from 'react'
import './App.css'
import Form from './components/Form/Form';
import Todos from './components/Todos/Todos';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(()=> {
            axios.get('http://localhost:8080/show')
              .then((res)=>  {
                console.log(res.data.todo);
                setTodos(res.data.todo);
              })
              .catch((err)=> console.log(err)); 

  },[]);

  const createPost = async (todo) => {
         try {
          const { data } = await axios.post('http://localhost:8080/post', todo)
          console.log(`data: `, data);
          setTodos(data.todo);
        } catch (error) {
          console.log(`error: `, error)
        }
    
  }

  const editPost = async(id)=> {
  //   try {
  //     const response = await fetch('http://localhost:8080/delete', {
  //      method: 'UPDATE',
  //      headers: {
  //        'Content-Type': 'application/json'
  //        },
  //        body: JSON.stringify({
  //  // your expected POST request payload goes here
  //          id:id,
  //          title: title,
  //          description: description
  //         })
  //      });
  //      const data = await response.json();
  //   // enter you logic when the fetch is successful
  //      console.log(data);
  //    } catch(error) {
  //  // enter your logic for when there is an error (ex. error toast)

  //       console.log(error)
  //      }
  
  try {
  const title =  prompt("enter todo");
  const description = prompt("enter description");
  const { data }  = await axios.put('http://localhost:8080/update',{ id:id , title:title , description:description });
  console.log(`data: `, data);
  setTodos(data.todo);
  }catch(error) {
    console.log(error);
  }
  }

  const deletePost = async (id) => {
      try {
            const { data } = await axios.delete('http://localhost:8080/delete',{ data: { id: id } });
            console.log(data);
            setTodos(data.todo);
      } catch (error) {
        console.log(error);
      } 
  }
  

  
  return (
    <div className='App'>
      <h1 className='head'>TO DO APP</h1>
      <Form createPost={createPost}/>
      <Todos todos={todos} deletePost = {deletePost} editPost={editPost}/>
    </div>
  )
}

export default App;