


const bcrypt = require('bcrypt');
const userModal = require('../model/userModal');

const signup = async (req, res) => {
    const { name, age, email, password } = req.body;

    if (!name || !age || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser  = await userModal.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ message: 'Email already in exist' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password?.toString(), 10);

        const newUser  = new userModal({
            name,
            age,
            email,
            password: hashedPassword 
        });

        await newUser .save();

        res.status(201).json({ message: 'User  created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = signup;