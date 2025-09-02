import User from '../models/User.js';


export const createUser = async (req,res) =>{
    const newUser = new User(req.body)
    try{
        const savedUser = await newUser.save()
        res.status(200).json({success:true,message:'Successfully created',data:savedUser,});
    } catch (err) {
        res.status(500).json({success:false,message:"Failed to create. Try again"});
    }
};

// update User
export const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedUser
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update',
            error: err.message
        });
    }
};


//delete User
export const deleteUser = async (req, res) => {
    const id = req.params.id; // ID URL se le rahe hain
    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully deleted',
            data: deletedUser
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete',
            error: err.message
        });
    }
};



// getSingle User
// getSingle User
export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: User
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch User',
            error: err.message
        });
    }
};

// getAll Users
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json({
            success: true,
            message: 'All Users fetched successfully',
            data: users
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            
            message: 'Failed to fetch Users',
            error: err.message
        });
    }
};

