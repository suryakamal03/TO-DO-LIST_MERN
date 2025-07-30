const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const port = 5000;
const schematodo = require('./models/Schema.js');
app.use(express.json());
app.use(cors());
dotenv.config()
const connectdb = async ()=>{
  try{
    const conn  =await mongoose.connect(process.env.MONGODB_URI);
    console.log(`mongodb database have been connected successfully${conn.connection.host}`);
  }catch(err){
    console.log(err);
  }
}
connectdb();
app.get('/api/todos',async (req,res)=>{
    try{
      const todos = await schematodo.find({});
      res.json(todos);
    }catch(err){
      res.status(500).json('error')
    }
})
app.post('/api/todos', async(req,res)=>{
  try{
  const {text} = req.body;
  const newschema = await schematodo.create(
    {
      text:text
    }
  )
  res.status(201).json(newschema)
    }catch(err){
      console.error(err); 
    // Send a "Server Error" response back to Thunder Client
    res.status(500).json({ message: 'Something went wrong on the server' });
    }
})
app.delete('/api/todos/:id', async(req,res)=>{
  try{
    const {id} = req.params;
    const deleteid  = await schematodo.findByIdAndDelete(id)
    res.json({message: 'DELETED SUCCESSFULLY'})

  }catch(err){
    res.status(500).json(err);
  }
})
app.listen(port,()=>{
  console.log(port);
})