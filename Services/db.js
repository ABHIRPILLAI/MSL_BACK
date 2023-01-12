const mongoose=require('mongoose');



//2----State connection string via mongoose

mongoose.connect('mongodb://localhost:27017/todo',{

    useNewUrlParser:true  //to avoid unwanted warning

});

const User=mongoose.model('User',{
    //schema creation ie table header

    email:String,
    password:String,
    username:String,
    todo:[]

});
module.exports={
    User
}