const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../services/emailService');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Create user with verification token
        const user = new User({
            name,
            email,
            password,
            verificationToken,
            isEmailVerified: false
        });

        await user.save();

        // Send verification email
        const emailSent = await sendVerificationEmail(email, verificationToken);

        if (!emailSent) {
            // If email fails, still create user but notify about email failure
            return res.status(201).json({
                message: 'User created but verification email failed to send. Please contact support.',
                userId: user._id
            });
        }

        res.status(201).json({
            message: 'Registration successful. Please check your email to verify your account.',
            userId: user._id
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during registration', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!user.isEmailVerified) {
            return res.status(403).json({ message: 'Email not verified. Please check your email to verify your account.' });
        }

        res.json({
            token: generateToken(user._id),
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createAdmin = async (req, res) => {
    try {
        const { authUser } = req; // Current authenticated user

        // Check if requester is an admin
        if (authUser.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can create other admins' });
        }

        const { name, email, password } = req.body;

        // Create new admin user
        const newAdmin = await User.create({
            name,
            email,
            password,
            role: 'admin',
            isEmailVerified: true // Skip email verification for admin-created accounts
        });

        res.status(201).json({
            message: 'Admin user created successfully',
            user: {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
                role: newAdmin.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin user', error: error.message });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        // await User.verifyEmailToken(token);
        const userdata = await User.findOne({ verificationToken: token});

        if(!userdata){
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const currentTime = new Date();
        const tokenTime = new Date(userdata.verificationTokenExpires);
        if(currentTime > tokenTime){
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        userdata.isEmailVerified = true;
        userdata.verificationToken = undefined;
        userdata.verificationTokenExpires = undefined;
        await userdata.save();
        
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
      const { email, otp } = req.body;
      await User.verifyOTP(email, otp);
      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid or expired OTP' });
    }
  };
  