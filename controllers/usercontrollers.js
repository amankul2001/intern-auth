const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req , res) =>{

    try {

          const {username , email , password} =  req.body;


    const hashPassword = await bcrypt.hash(password , 10);

    const newUser = new User({username , email,password:hashPassword});

    await newUser.save();

    res.status(201).json({message:`New User ${username} created successFully`})
        
    } catch (error) {
            res.status(500).json({error:"Internal Server error"})
    }
  

}

const login = async (req , res) =>{

    try {

          const {username , password} = req.body;
    const user = await User.findOne({username})

    if(!user){
        return res.status(404).json({message:"Invalid username"})
    }

    const isPasswordMatch = await bcrypt.compare(password , user.password);
    // const isPasswordMatch = await password === user.password;

    if(!isPasswordMatch){
        return res.status(401).json({message:"Invalid cridentials"})
    }


    const payload = {
        username: user.username,
        email:user.email
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:"1h"})

    res.status(200).json({token:token,message:`${user.username} LoggedIn`});
        
    } catch (error) {
            res.status(500).json({error:"Internal Server error"})
    }

  

}


const getUsers = async (req , res) =>{

    try {
        
        const users = await User.find();

        res.status(200).json(users)

    } catch (error) {
            res.status(500).json({error:"Internal Server error"})
    }



}


module.exports = {register , login , getUsers};


