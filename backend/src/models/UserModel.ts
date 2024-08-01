import mongoose from 'mongoose';

// Define the user schema directly with types
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Provide name'],
    },
    email: {
        type: String,
        required: [true, 'Provide email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Provide password'],
    },
    
}, {
    timestamps: true,
});

// Create the User model
const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;
