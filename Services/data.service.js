const res = require('express/lib/response');

const jwt= require('jsonwebtoken');

const db=require('./db')


const  register=(username,email,password)=>{
   
    return db.User.findOne({email})
    .then(user=>{//then to synchronize between ports
      if(user){
        return{
          status:false,
          statusCode:400,
          message:'User already registeredd'
        }
  
      }
      else
      {
        const newUser = new db.User({
      
          username:username,
          email:email,
          password:password,
          todo:[]
          
        })
        newUser.save()//data saved in mogodb
        return{
          status:true,
          statusCode:200,
          message:'User  registration successful'
        }
      
     
  
   
    }})}

const  login=(email,pswd)=>{

    // let userDetails=this.userDetail

  //   if (acno in userDetails) {
    return db.User.findOne({email,password:pswd})
    .then(user=>{
      if (user) {
        currentUser=user.username//assign username to the variable
        currentEmail=email
        const token =jwt.sign({currentEmail:email},'Key#23123')
        return{
          status:true,
          statusCode:200,
        message:"login successfull",
        token:token,
        currentUser:currentUser,
        currentEmail:currentEmail
        
        } 
      }
      else{
        return{
          status:false,
          statusCode:400,
          message:"Invalid userdetails"
        }
      }
    })
}
const todo=(email,pswd,todo1)=>{

    return db.User.findOne({email,pswd})
    .then(user=>{
      if (user) {
        user.todo.push({
          todo:todo1
        })
       user.save();
        return{
          status:true,
          statusCode:200,
        message:`Todo Added`
        }

    
      }
      else{
        return{
          status:false,
          statusCode:400,
          message:"INCORRECT USERDETAILS"
        }
      }
    })
  }
  

module.exports={
    login,register,todo
   }