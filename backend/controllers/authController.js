
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req,res)=>{
    
    try{

        // Check if the username is already taken
        const existingUsername = await User.findOne({ username: req.body.username });
        if (existingUsername) {
            return res.status(400).json({ success: false, message: 'Username already taken' });
        }

        // Check if the email is already taken
        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: 'Email already taken' });
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)

        const newUser = new User ({
            username: req.body.username,
            email: req.body.email,
            password:hash,
            photo: req.body.photo,
            address: req.body.address,
            fullname: req.body.fullname,
            age: req.body.age,


        });

        await newUser.save();

        res.status(200).json({success:true, message: 'Successfully created'});

    }catch(err){        
        res.status(500).json({success:false, message: 'Failed to create. Try again'});
}

}

export const login = async (req,res) =>{

    const email = req.body.email
    try{

        const user = await User.findOne({email})
//if user doesnt exist
        if(!user){
            return res.status(404).json({success:false, message:'User not found'})
        }

        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)

        if(!checkCorrectPassword){
            return res
            .status(401)
            .json({
                success:false, 
                message: 'Incorrect email or password. Please Try Again!'})
        }

        const {password,role,...rest} = user._doc;

        const token = jwt.sign(
            { id: user._id, role: user.role},
            process.env.JWT_SECRET_KEY,
            {expiresIn:"15d"}
        );
        
        res.cookie('accessToken',token,{
            httpOnly:true,
            expires:token.expiresIn
        })
        .status(200)
        .json({
            token,
            data:{... rest},
            role,
        })
    }catch(err){
        return res
            .status(500)
            .json({
                success:false, 
                message: 'Failed to login'})
    }
};