const User = require("../Model/user.model");
const upload = require("../utils/upload");


const regiserUser = async (req, res) => {
    try {

        const image = await upload(req.file);
        const { name, email, phone } = req.body;
        if (!name || !email || !phone || !image) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const userExits = await User.findOne({ email });
        if (userExits) {
            return res.status(400).json({ message: 'User already exists' });
        }




        const user = await User.create({
            name, email, phone, image: image.secure_url
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });

    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedData = { name, email, phone };

        if (req.file) {
            const image = await upload(req.file);
            if (image && image.secure_url) {
                updatedData.image = image.secure_url;
            }
        }
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });


        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });

    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json({
            success: true,
            message: "User founded Sucessfully",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });

    }
}
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Please provide user id' });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            success: true,
            message: "User founded Sucessfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });

    }
}

const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Please provide user id' });
        }
        const user = await User.findByIdAndDelete( id );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });

    }
}


module.exports = { regiserUser, updateUser, getUser, getUserById, DeleteUser };