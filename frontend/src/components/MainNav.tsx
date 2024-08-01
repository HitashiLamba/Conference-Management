import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext"; // Import the context
import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

const MainNav = () => {
  const navigate = useNavigate();
  const { email, setEmail } = useAuthContext(); // Use context with setter

  const handleLogout = () => {
    // Clear authentication data (e.g., tokens, user info)
    localStorage.removeItem("authToken"); // Example for local storage
    // or document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT'; // Example for cookies

    // Reset context state
    setEmail(null); // Assuming setEmail is a function to update the email state in context

    // Navigate to login or home page
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <span className="flex space-x-2 items-center">
      {email ? (
        <>
          <Link
            to="/view-schedules"
            className="font-bold hover:text-orange-500"
          >
            View Schedules
          </Link>
          <span className="mx-16"></span>{" "}
          {/* This will add a gap between the links */}
          <Link to="/join-schedule" className="font-bold hover:text-orange-500">
            Join Schedule
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
              <CircleUserRound className="text-orange-500" />
              {email}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Separator />
              <DropdownMenuItem>
                <Link
                  to="/registrations"
                  className="font-bold hover:text-orange-500"
                >
                  Manage Registrations
                </Link>
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem>
                <Link
                  to="/manage-conferences"
                  className="font-bold hover:text-orange-500"
                >
                  Create Conferences
                </Link>
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem>
                <Button
                  onClick={handleLogout} // Use the logout handler
                  className="flex flex-1 font-bold bg-orange-500"
                >
                  Log Out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
          onClick={() => navigate("/register")}
        >
          Log In
        </Button>
      )}
    </span>
  );
};

export default MainNav;
