const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const setToken = require('../config/setToken');

const JWT_SECRET = process.env.JWT_SECRET || 'okok';

const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '3h' });

        // Set token in cookies
        await setToken(req, res, token);

        res.status(201).json({ message: 'Signup successful', user: newUser });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const authenticateUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '3h' }
        );

        // Set token in cookies
        await setToken(req, res, token);

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// const authenticateToken = (req, res, next) => {
//     const token = req.cookies.token;

//     if(!token) return res.status(401).json({message: 'Token missing'});

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if(err) return res.status(403).json({message: 'Invalid token'});

//         req.userId = decoded.userId;
//         next();
//     });
// }

const checkAuth = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: 'Not authenticated' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ user });
    } catch (error) {
        console.error('Auth check error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const logout = (req, res) => {
    try{
        res.clearCookie('token');
        res.status(200).json({message: 'Logged out'});
    }
    catch(error){
        console.error('Error while logging out:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { createUser, authenticateUser, checkAuth, logout };

