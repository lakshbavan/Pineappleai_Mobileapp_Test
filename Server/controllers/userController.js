const JWT = require('jsonwebtoken')
const { hashpassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/userModel')
var { expressjwt: jwt } = require("express-jwt");


//middleware
const requireSignIn = jwt({
    secret: process.env.JWT_SECRET ,
    algorithms: ["HS256"],
});


//Register
const registerController = async(req,res) => {
    try {
        const {name,email,password} = req.body;
        //validation
        if(!name){
            return res.status(400).send({
                success: false,
                message:'name is required'
            })
        }
        if(!email){
            return res.status(400).send({
                success: false,
                message:'email is required'
            })
        }
        if(!password || password.length < 6){
            return res.status(400).send({
                success: false,
                message:'password is required and 6 character long'
            })
        }
        //exisiting user
        const exisitingUser = await userModel.findOne({email})
        if (exisitingUser) {
            return res.status(500).send({
                success:false,
                message:'User Already Register With This Email'
            })
        }
        //hashed password
        const hashedPassword = await hashpassword(password);


        //save user
        const user = await userModel({name, email , password: hashedPassword,}).save();


        return  res.status(201).send({
            success:true,
            message:'Registeration Successfull please login'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Register API",
            error,
        });
    }
};

//Login
const loginController = async (req,res) => {
    try {
        const {email,password} = req.body
        //Validation
        if (!email || !password) {
            return res.status(500).send({
                success:false,
                message:'Please Provide Email Or Password'
            })
        }
        //find user
        const user = await userModel.findOne({email})
        if (!user) {
            return res.status(500).send({
                success:false,
                message:'User Not Found'
            })
        }
        //match password
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(500).send({
                success:false,
                message:'Invalid username Or password'
            })
        }
        //TOKEN JWT
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {
            expiresIn:'7d',
        })        

        //undeinfed password
        user.password = undefined;
        res.status(200).send({
            success:true,
            message:'login successfully',
            token,
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message: 'error in login api',
            error,
        })
    }
};

//Update user
const updateUserController = async (req,res) => {
    try {
        const {name,password,email} = req.body
        //user find
        const user = await userModel.findOne({email})
        //password validate
        if (password && password.length < 6) {
            return res.status(400).send({
                success: false,
                message:'password is required and should be 6 character long'
            })
        }
        const hashedPassword = password ? await hashpassword(password) : undefined
        //updated user
        const updatedUser = await userModel.findOneAndUpdate({email}, {
            name: name || user.name ,
            password: hashedPassword || user.password
        }, {new:true})
        user.undefined;
        res.status(200).send({
            success: true,
            message: 'Profile Update Please Login',
            updatedUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message: 'error in user update api',
            error,
        })
    }
};


module.exports = {requireSignIn, registerController, loginController, updateUserController };