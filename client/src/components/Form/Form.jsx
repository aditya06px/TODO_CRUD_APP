import React, {useState} from 'react';
import './Form.css';
import uniqid from 'uniqid';


function Form({createPost}) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      id: uniqid(),
      title,
      description
    };
    console.log(todo);
    setTitle('');
    setDescription('');
    createPost(todo); 
  }

  

  return (
    <>
    <div className='formContainer'>
    <form action="#" onSubmit={handleSubmit}>
          <input  value={title} type="text" placeholder='add to do title'  name='title' className='title' onChange={(e) => setTitle(e.target.value)}/>
          <input value={description} type="text" placeholder='add to do decription' name='description' className='description' onChange={(e)=>setDescription(e.target.value)}/>
          <button type='submit' className='formButton'>add to do</button>
    </form>
    </div>
    </>
  )
}

export default Form