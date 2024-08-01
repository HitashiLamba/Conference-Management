import mongoose from 'mongoose';

// Define the user schema directly with types
const scheduleSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UpcomingSchedules', // Make sure this matches the model name exactly
        required: true // Optional: If this field should be required
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel', // Make sure this matches the model name exactly
        required: true // Optional: If this field should be required
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        trim: true // Optional field
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    postedByEmail:{
        type: String,
        required: true

    }


}, {
    timestamps: true,
});

// Create the User model
const Schedules = mongoose.model('Schedules', scheduleSchema);

export default Schedules;