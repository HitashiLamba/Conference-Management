import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from "./AuthContext"; // Import the context


const MobileNav = () => {
  const { email, setEmail } = useAuthContext(); // Use context with setter

  const navigate = useNavigate();

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
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {email ? (
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className="text-orange-500" />
              {email}
            </span>
          ) : (
            <span> Welcome!</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {email ?  (
            <><Link
            to="/view-schedules"
            className="font-bold hover:text-orange-500"
          >
            View Schedules
          </Link>
          <Separator />

          <Link to="/join-schedule" className="font-bold hover:text-orange-500">
            Join Schedule
          </Link>
          <Separator />

            <Link
              to="/registrations"
              className="font-bold hover:text-orange-500">
               Manage Registrations

            </Link>
            <Separator />

            <Link
              to="/manage-conferences"
              className="font-bold hover:text-orange-500"
            >
                Create Conferences
              </Link>
              <Separator />

              <Button
                  onClick={handleLogout} // Use the logout handler
                  className="flex flex-1 font-bold bg-orange-500"
                >
                  Log Out
                </Button></>
          ) : (
            <Button
              onClick={() => navigate("/register")}
              className="flex-1 font-bold bg-orange-500"
            >
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;