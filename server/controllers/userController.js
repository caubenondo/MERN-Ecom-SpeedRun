import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import signToken from "../util/signToken.js";
// @desc    Auth User and provide token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler( async (req,res) =>{
    const {email,password} = req.body

    const user = await User.findOne({email})
    // validate info
    if(user && (await user.isCorrectPassword(password))){
        res.json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token: signToken({ username:user.name, email:user.email, _id:user._id })
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc    get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler( async (req,res) =>{
    
  const user = await User.findById(req.user._id)
// console.log(user)
  if(user){
    res.json(user)
  }else{
        res.status(404)
        throw new Error('No User Found')
    }

})


export {authUser,getUserProfile}