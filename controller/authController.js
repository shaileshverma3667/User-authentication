


const bcrypt = require('bcrypt');
const userModal = require('../model/userModal');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET 
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
            password: hashedPassword,
            verified:true
        });

        await newUser .save();
        res.status(201).json({status:201, message: 'User  created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// Login    
const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModal.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or passwordhkjhbk' });
        }
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true, 
            secure: true, 
            maxAge: 3600000, // 1 hour in milliseconds
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                verified: user.verified,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const logout = (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true });
    res.status(200).json({ message: 'Logout successful' });
};




// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModal.find()
        res.status(200).json({
            status:200,
            message: 'success',
            rowCount: users.length,
            data: {
                users,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};


//Delete User

const deleteUser=async(req,res)=>{
    try{
        const user=await userModal.findByIdAndDelete(req.params.id)

         if(!user){
          return res.status(404).json({status:404,message:"User not found"})
         }
         res.status(200).send({status:200,user,rowCount:user.length,message: `User has been deleted successfully` });

    }catch{
        res.status(500).json({status: 500,message: error.message});

   }
}

module.exports = {
    signup,
    signIn,
    logout,
    getAllUsers,
    deleteUser
};