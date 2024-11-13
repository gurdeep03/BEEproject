const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
require("dotenv").config();
const updateUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, age } = req.body;

    if (!firstName || !lastName || !age) {
        res.status(400);
        throw new Error("Please provide first name, last name, and age");
        }

        const user = await User.findById(req.params.id);

        if (!user) {
        res.status(404);
        throw new Error("User not found");
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;

        const updatedUser = await user.save();

        res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
    });
});
        


const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({
        message: "User fetched successfully",
        user,
    });
});

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, age, gender, bloodGroup, email, phoneNumber, password } = req.body;

    if (!firstName || !lastName || !age || !gender || !bloodGroup || !email || !phoneNumber || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        firstName,
        lastName,
        age,
        gender,
        bloodGroup,
        email,
        phoneNumber,
        password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide email and password");
    }
    
    const user = await User.findOne({ email });
    
    if (user && (await bcrypt.compare(password, user.password))) {
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.PRIVATE_KEY,
            { expiresIn: "1h" }  // Token expiration time
        );

        console.log(token)

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

module.exports = { registerUser, loginUser, updateUser, getUser };