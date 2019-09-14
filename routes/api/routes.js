const router = require("express").Router();
const {databaseConnection} = require("../../database");
const uuid = require("uuid/v1");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {registerValidation,loginValidation} = require("../../validation");
// for registering a user
router.post("/user/register",async(req, res) => {
    const {error}=registerValidation(req.body)
    if(error)
    {return res.status(422).send({msg:error.details[0].message})}
    const salt=await bcrypt.genSalt(10)
    const hashpassword=await bcrypt.hash(req.body.password,salt)
     databaseConnection.query('insert into users (user_id,user_username,user_password,user_name,user_email) values(?,?,?,?,?)',[uuid(),req.body.username,hashpassword,req.body.name,req.body.email],(err,row)=>{
        if(err) {
            res.status(400).send({msg:err.sqlMessage})
            return console.log(err);
        }
        else{
            res.status(200).send({msg:'user is sucessfully created'})}
    })
});


//for login a user
router.post('/user/login',async (req,res)=>{
    const {error}=loginValidation(req.body)
    if(error){
        return res.status(422).send({msg:error.details[0].message})
    }
     databaseConnection.query('select * from users where user_email=?',[req.body.email],(err,row)=>{
        if(row.length===0){
           return res.send({msg:'username does not exist'})
        }
        bcrypt.compare(req.body.password,row[0].user_password,(err,result)=>{
            if(result===false)
            {
               return res.status(400).send({msg:'wrong password! Try again'})
            }
           const payload={
               id:row[0].user_id
           }
           var token=jwt.sign(payload,'hkfkfnknfknfknfknkfnkfn',{expiresIn:3600000})
             res.status(200).send({token:token,
                                msg:'hurray! you are logged in'})
        })
        
    })
})
module.exports = router;
