const express = require('express')
const router = express.Router();
const UserModel = require('../models/AuthModels')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/AuthMiddleware')
const bcrypt = require('bcryptjs');


router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    console.log('Received Data', req.body)

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All field Are Required' })
    }

    try {

        const existingEmail = await UserModel.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: "User Already Exist" })
        }

        const newEntry = await UserModel.create({ name, email, password })
        if (!newEntry) {
            return res.status(400).json({ message: 'Invalid Inputs' })
        }

        res.status(200).json({ message: 'Signup Completed Succefully' })

    } catch (error) {
        console.log("Internal Server Error", error);
        res.status(500).json({ message: 'Server error' });
    }
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await UserModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '7h' });

        res.json({ token, user: { name: user.name, email: user.email } });

    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Profile Route (Protected)
router.get('/profile', authMiddleware, (req, res) => {
    res.json(req.user);
});


module.exports = router;