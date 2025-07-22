const User = require('../Models/user');
const bcrypt = require('bcrypt');

const register = async (req , res) =>{

    const {username , email , password} =  req.body;

    const hashPassword = await bcrypt.hash(password , 10);

    const newUser = new User({username , email,password:hashPassword});

    await newUser.save();

    res.status(201).json({message:`New User ${username} created successFully`})

}

const login = async (req , res) =>{


    const {email , password} = req.body;

    

}


module.exports = {register , login};


