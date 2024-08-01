import express, { Request, Response } from 'express';
import registerUser from '../controller/registerUser';
import checkEmail from '../controller/checkEmail';
import checkPassword from '../controller/checkPassword';
import userDetails from '../controller/userDetails';
import logout from '../controller/logout';
import updateUserDetails from '../controller/updateUserDetails';
import searchUser from '../controller/searchUser';
import ViewSchedule from '../controller/ViewSchedule';
import JoinSchedule from '../controller/JoinSchedule';
import { registerSchedule } from '../controller/registerSchedule';
import schedulesRegistrationData from '../controller/schedulesRegistrationData';
import createConference from '../controller/createConference';


const router = express.Router();

// Create user API
router.post('/register', registerUser);

// Check user email
router.post('/email', checkEmail);

// Check user password
router.post('/password', checkPassword);

// Login user details
router.get('/user-details', userDetails);

// Logout user
router.get('/logout', logout);

// Update user details
router.post('/update-user', updateUserDetails);

// Search user
router.post('/search-user', searchUser);

router.get('/ViewSchedule', ViewSchedule);

router.get('/JoinSchedule', JoinSchedule);

router.post('/registerSchedule', registerSchedule);


router.get('/schedules/registration-data', schedulesRegistrationData);

router.post('/create-conference', createConference);






export default router;
