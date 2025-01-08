import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";   
import { errorHandler } from "../utilities/error.js";
import jwt from "jsonwebtoken";

// Signup handler
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    // Validate input fields
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return next(errorHandler(400, "All fields are required"));
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return next(errorHandler(400, "Email or username already exists"));
        }

        // Hash the password
        const hashedPassword = bcryptjs.hashSync(password, 10);

        // Create and save new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        next(error);
    }
};

// Signin handler
export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found'));

        // Compare the entered password with the stored hashed password
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));

        // Create a JWT token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Remove the password from the user data before sending the response
        const { password: pass, ...rest } = validUser._doc;

        // Send the response along with the token in a cookie
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json({ message: "Signin successful", user: rest });

    } catch (error) {
        next(error);
    }
};

// Signout handler
export const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json({ message: "User has been signed out" });
    } catch (error) {
        next(error);
    }
};
