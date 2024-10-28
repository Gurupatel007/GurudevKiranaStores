const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../services/emailService');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  address: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationTokenExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date
}, {
  timestamps: true
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to verify password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to send verification email
userSchema.methods.sendVerificationEmail = async function() {
  const token = crypto.randomBytes(20).toString('hex');
  this.verificationToken = token;
  this.verificationTokenExpires = Date.now() + 5 * 60 * 1000; // Token expires in 5 minutes
  await this.save();

  const emailSent = await sendVerificationEmail(this.email, token);
  if (!emailSent) {
    throw new Error('Error sending verification email');
  }
};

// Static method to verify email token
userSchema.statics.verifyEmailToken = async function(token) {
  const user = await this.findOne({ verificationToken: token, verificationTokenExpires: { $gt: Date.now() } });
  if (!user) throw new Error('Invalid or expired token');

  user.isEmailVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  await user.save();
  return user;
};

const User = mongoose.model('User', userSchema);

// Create initial admin user
const createInitialAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const admin = new User({
        name: 'Admin User',
        email: process.env.ADMIN_EMAIL || 'admin@example.com',
        password: process.env.ADMIN_PASSWORD || 'adminPassword123',
        role: 'admin',
        isEmailVerified: true
      });
      await admin.save();
      console.log('Initial admin user created');
    }
  } catch (error) {
    console.error('Error creating initial admin:', error);
  }
};

// Create initial admin user after model is defined
createInitialAdmin();

module.exports = User;


// --------------------------------------------------------

// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const crypto = require('crypto');
// const { sendVerificationEmail } = require('../services/emailService');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user'
//   },
//   address: {
//     type: String,
//     trim: true
//   },
//   phone: {
//     type: String,
//     trim: true
//   },
//   isEmailVerified: {
//     type: Boolean,
//     default: false
//   },
//   verificationToken: String,
//   verificationOTP: String,
//   verificationOTPExpires: Date,
//   resetPasswordToken: String,
//   resetPasswordExpires: Date,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   lastLogin: Date
// }, {
//   timestamps: true
// });

// // Pre-save middleware to hash password
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
  
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Method to verify password
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// // Method to send verification email
// userSchema.methods.sendVerificationEmail = async function() {
//   const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
//   this.verificationOTP = otp;
//   this.verificationOTPExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
//   await this.save();

//   const emailSent = await sendVerificationEmail(this.email, otp);
//   if (!emailSent) {
//     throw new Error('Error sending verification email');
//   }
// };

// // Static method to verify OTP
// userSchema.statics.verifyOTP = async function(email, otp) {
//   const user = await this.findOne({ email, verificationOTP: otp, verificationOTPExpires: { $gt: Date.now() } });
//   if (!user) throw new Error('Invalid or expired OTP');

//   user.isEmailVerified = true;
//   user.verificationOTP = undefined;
//   user.verificationOTPExpires = undefined;
//   await user.save();
//   return user;
// };

// const User = mongoose.model('User', userSchema);

// module.exports = User;