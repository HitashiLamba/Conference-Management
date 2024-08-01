import jwt from 'jsonwebtoken';  // Use default import for 'jsonwebtoken'
import UserModel from '../models/UserModel';  // Import UserModel from its module

interface JwtPayload {
  id: string;
}

const getUserDetailsFromToken = async (token: string): Promise<any> => {  // Replace 'any' with the actual type if known
  if (!token) {
    return {
      message: "session out",
      logout: true,
    };
  }

  try {
    // Verify the token and extract the payload
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;

    // Find the user by ID and exclude the password field
    const user = await UserModel.findById(decode.id).select('-password');

    return user;
  } catch (error) {
    // Handle the error
    throw new Error("Invalid token or user not found.");
  }
};

export default getUserDetailsFromToken;
