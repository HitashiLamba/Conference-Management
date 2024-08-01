import mongoose from 'mongoose';

// Define the user schema directly with types
const UpcomingscheduleSchema = new mongoose.Schema({
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
    postedByEmail: {
        type: String,
        required: true
    },
    createdById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    clickedBy: [{ // Field to store user IDs who clicked the schedule
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }]
}, {
    timestamps: true,
});

// Create the User model
const UpcomingSchedules = mongoose.model('UpcomingSchedules', UpcomingscheduleSchema);

export default UpcomingSchedules;
