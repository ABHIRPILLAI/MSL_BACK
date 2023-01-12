const express = require('express');

const dataService = require('./Services/data.service');

const cors=require('cors')


const app=express()

const { append } = require('express/lib/response');


app.use(cors({
    origin:'http://localhost:4200'
}))


app.use(express.json())


const jwt = require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log('router specific middleware');
    const token = req.headers['x-access-token']

    const data=jwt.verify(token,'Key#23123');
    console.log(data);
    next();

}


app.listen(3000,()=>{
    console.log('listening on port 3000');
})


app.post('/register',(req,res)=>
{
    console.log(req.body);
      dataService.register(req.body.username,req.body.email,req.body.password)
      .then(result=>{
        res.status(result.statusCode).json(result)

      })
    })
    app.post('/login',(req,res)=>
    {
        console.log(req.body);
     dataService.login(req.body.email,req.body.password)
     .then(result=>{
        res.status(result.statusCode).json(result)
    
     })
       
    
    })




    app.post('/todo',jwtMiddleware,(req,res)=>
{
    console.log(req.body);
    dataService.todo(req.body.email,req.body.password,req.body.todo)
    .then(result=>{

    res.status(result.statusCode).json(result)

 })
})

app.patch('/lists/:id', jwtMiddleware, (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body.todo
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    });
});

