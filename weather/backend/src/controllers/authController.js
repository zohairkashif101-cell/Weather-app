const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// register a user
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'please provide all req' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'user already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        
        return res.status(201).json({
            message: 'user registered successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: 'user registration failed',
            error: error.message
        });
    }
};

// login user 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required " });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "invalid email and password " });
        }

        const ispasswordcorrect = await bcrypt.compare(password, user.password);

        if (!ispasswordcorrect) {
            return res.status(401).json({
                message: "invalid email and password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.json({
            message: "login successfull",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "login token failed",
            error: error.message,
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
};