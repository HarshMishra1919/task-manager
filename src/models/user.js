const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invaild!');
            }
        },
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age can't be negative!");
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value == 'password') {
                throw new Error('Password can\'t be "password"');
            }
        },
    },
    tokens: [
        {
            token: {
                type: String,
                require: true,
            },
        },
    ],
});

// Virtual property : Its a relationship between two entities
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner',
});

// for model
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email });

    if (!user) {
        throw new Error('Unable to log in! Please check your credentials!');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to log in! Please check your credentials!');
    }
    return user;
};

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this; //this represents current document to be saved
    // console.log("Just before saving!");
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next(); // we call next when we're done
});

// Delete user tasks when user is deleted
userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
});

// for individuals
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user.id.toString() }, 'ThisIsSecretToken');

    user.tokens = user.tokens.concat({ token: token });
    await user.save();

    return token;
};

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
