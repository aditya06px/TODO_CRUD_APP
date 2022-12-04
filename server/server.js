require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const localhost = 8080;

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log('connected to the DB')})
.catch((err)=>{console.log(err)});

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        min: 1
    },
    description: {
        type: String,
        required: true,
        min:1
    }
});

const Todo = mongoose.model('todo', TodoSchema);

// const todo = new Todo({
//     title:"sleep early ",
//     description:"sleep at 9 pm"
// })

app.get('/',(req,res)=> {
    res.json({message: 'home page'});
})

app.get('/show', async (req,res)=> {
     const list = await Todo.find();
     res.json({
        todo: list,
        message: 'successful'
     })
});

app.post('/post', async (req,res)=>{
        const {title,description,id} = req.body;
        const todo = new Todo({
            id,
            title,
            description
        });
        await todo.save();
        const updatedTodos = await Todo.find({});
        res.json({
            todo: updatedTodos,
            message: 'todo saved'});
        res.end();
});

// think about indexing for update and delete
app.put('/update', async (req,res)=>{
    const {title,description,id} = req.body;
    await Todo.findOneAndUpdate({id:id},{title,description},{new:true});
    const updatedTodo = await Todo.find({});
    res.json({
        todo: updatedTodo,
        message: "Updated Todo Successfully"
    });
});

app.delete('/delete', async (req,res)=> {
    const {id} = req.body;
    await Todo.findOneAndDelete({id:id});

    const updatedTodos = await Todo.find({});
    res.json({
        todo: updatedTodos,
        message: "Deleted Todo Successfully"
    })
})

app.listen(localhost,()=> {
    console.log(`server started at ${localhost}`);
})



