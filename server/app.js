const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});

require('./db/dbcon')

app.use(express.json())
app.use(require('./router/auth'))


const PORT = process.env.PORT

// app.get('/',(req,res)=>{
//     console.log('hello world from backend')
//     res.send('hello world');
// })
// app.get('/about',(req,res)=>{
//     console.log('hello world from backend')
//     res.send('hello world');
// })
// app.get('/contact',(req,res)=>{
//     console.log('hello world from backend')
//     res.send('hello world');
// })
// app.get('/signin',(req,res)=>{
//     console.log('hello world from backend')
//     res.send('hello world');
// })
// app.get('/register',(req,res)=>{
//     console.log('hello world from backend')
//     res.send('hello world');
// })



app.listen(PORT,()=>console.log(`Server is running at port ${PORT}`)); 