import { user_Model } from "../models/user_model.js";
import { userSchema } from "../schema/user_schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
    try {
        
        const { error, value } = userSchema.validate(req.body);
        if (error) {
          return res.status(400).send(error.details[0].message);
        }

        const { email } = value;

      
        const ifUserExists = await user_Model.findOne({ email });

        if (ifUserExists) {
            return res.status(401).send("User already signed up");
        } else {
            const hashPassword = bcrypt.hashSync(value.password, 10);
            value.password = hashPassword

            const newUser = await user_Model.create(value);

            return res.status(201).send(newUser);
        }


    } catch (error) {

        next(error);
        
    }

}

export const login = async (req, res, next)  => {
    try {
        const { userName, email, password} = req.body;

        const user = await user_Model.findOne({
            $or: [{ email: email }, { userName: userName }], 
        });
        if (!user) {
            return res.status(401).json("User does not exist");
        } else {

        //Verify user password
        const correctPass = await bcrypt.compare(password, user.password);
        if (!correctPass){
            return res.status(401).json("Invalid credentials");
        }

        // Generate a session for the user
        // req.session.user = { id: user.id };

        const token = jwt.sign ({ id: user.id}, process.env.JWT_PRIVATE_KEY, {expiresIn: '5hr'})



        //Return response
        res.status(201).json({
            message: "Login Sucessfully",
            accessToken: token
        });
    }
    } catch (error) {
        next(error);
    
}
}








export const getUser = async (req, res, next) => {

    try {
        const userName = req.params.userName.toLowerCase();

        const options = { sort: { startDate: -1 } }

        const findSignUp = await user_Model.findOne({ userName }).select("-password")
        .populate({
            path: "member",
            options,
        });
       return res.status(200).json({ user: findSignUp })
    } catch (error) {
       next()
    }

}

export const getAllUsers = async (req, res) => {

    const email = req.query.email?.toLowerCase()
    const userName = req.query.userName?.toLowerCase();

    const filter = {};

    if (email) {
        filter.email = email;
    }

    if (userName){
        filter.userName = userName;
    }

    const users = await user_Model.find(filter);

    return res.status(200).json({ users });


};


export const logout = async (req, res, next) => {
    try {
        //Destory the  user session
      await req.session.destroy();

        //Return Response

        res.status(200).json({ message: "User Logged out"});
    
    } catch (error) {
        next(error);
    }
};