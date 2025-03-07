import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import api from "@/api";
import { cn } from "../../lib/utils";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { ModeToggle } from "../layout/mode-toggle";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const location = useLocation(); // Get current location
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref for dropdown

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await api.get("/api/profile/me");
        if (response.data && response.data.image) {
          setProfileImage(response.data.image);
        } else {
          setProfileImage(null);
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
        setProfileImage(null);
      }
    };

    fetchProfileImage();
  }, []);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("user_id");
    navigate("/");
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // Function to check if the current route matches the link path
  const isActive = (path) => location.pathname === path;
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Add event listener to listen for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <div className="bg-background text-foreground p-4 border dark:border-none">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo/Title */}
        <Link to="/landingpage" className="text-2xl font-bold flex-shrink-0">
          Eventcs
        </Link>

        {/* Desktop Navigation Menu */}
        <div className="hidden mx-4 md:flex items-center flex-1 justify-center space-x-4">
          <NavigationMenu className="flex items-center space-x-4">
            <NavigationMenuList className="flex space-x-4">
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-lg hover:bg-accent px-4 py-2 rounded-md",
                    isActive("/landingpage")
                      ? "bg-accent text-foreground"
                      : "text-primary"
                  )}
                >
                  <Link to="/landingpage">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-lg hover:bg-accent px-4 py-2 rounded-md",
                    isActive("/SearchEvents")
                      ? "bg-accent text-foreground"
                      : "text-primary"
                  )}
                >
                  <Link to="/SearchEvents">Events</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-lg hover:bg-accent px-4 py-2 rounded-md",
                    isActive("/registeredEvents")
                      ? "bg-accent text-foreground"
                      : "text-primary"
                  )}
                >
                  <Link to="/registeredEvents">Registration</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-lg hover:bg-accent px-4 py-2 rounded-md",
                    isActive("/posts")
                      ? "bg-accent text-foreground"
                      : "text-primary"
                  )}
                >
                  <Link to="/posts">Forums</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-lg hover:bg-accent px-4 py-2 rounded-md",
                    isActive("/searchpeople")
                      ? "bg-accent text-foreground"
                      : "text-primary"
                  )}
                >
                  <Link to="/searchpeople">People</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-lg hover:bg-accent px-4 py-2 rounded-md",
                    isActive("/chatscreen")
                      ? "bg-accent text-foreground"
                      : "text-primary"
                  )}
                >
                  <Link to="/chatscreen">Chat</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-lg hover:bg-accent px-4 py-2 rounded-md",
                    isActive("/edit-profile")
                      ? "bg-accent text-foreground"
                      : "text-primary"
                  )}
                >
                  <Link to="/edit-profile">Profile</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Dropdown Icon */}
        <div
          className="hidden md:flex items-center relative z-10"
          ref={dropdownRef}
        >
          <button onClick={toggleDropdown} className="flex items-center ml-4">
            {profileImage ? (
              <img
                src={profileImage}
                alt="User Profile"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <FaUserCircle
                size={30}
                className="text-primary hover:text-accent-foreground"
              />
            )}
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-muted shadow-lg rounded-md">
              <ul className="text-sm">
                <li>
                  <Link
                    to="/edit-profile"
                    className="block px-4 py-2 text-card-foreground hover:bg-secondary"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="block px-4 py-2 text-red-600 hover:bg-secondary w-full text-left"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Light/Dark Mode Toggle */}
        <div className="hidden md:flex items-center ml-4">
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center mr-4"
        >
          {isMenuOpen ? (
            <FaTimes size={24} className="text-primary" />
          ) : (
            <FaBars size={24} className="text-primary" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-card shadow-lg z-50 md:hidden ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <button onClick={toggleMenu} className="text-primary">
              <FaTimes size={24} />
            </button>
            <span className="text-2xl font-bold">Eventcs</span>
          </div>
          <NavigationMenu className="flex flex-col p-4 space-y-4">
            <NavigationMenuList className="flex flex-col space-y-4">
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md",
                    isActive("/landingpage") ? "bg-accent text-foreground" : ""
                  )}
                >
                  <Link to="/landingpage" onClick={handleLinkClick}>
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md",
                    isActive("/SearchEvents") ? "bg-accent text-foreground" : ""
                  )}
                >
                  <Link to="/SearchEvents" onClick={handleLinkClick}>
                    Events
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md",
                    isActive("/registeredEvents")
                      ? "bg-accent text-foreground"
                      : ""
                  )}
                >
                  <Link to="/registeredEvents" onClick={handleLinkClick}>
                    Registration
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md",
                    isActive("/posts") ? "bg-accent text-foreground" : ""
                  )}
                >
                  <Link to="/posts" onClick={handleLinkClick}>
                    Forums
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md",
                    isActive("/searchpeople") ? "bg-accent text-foreground" : ""
                  )}
                >
                  <Link to="/searchpeople" onClick={handleLinkClick}>
                    People
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md",
                    isActive("/chatscreen") ? "bg-accent text-foreground" : ""
                  )}
                >
                  <Link to="/chatscreen" onClick={handleLinkClick}>
                    Chat
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md",
                    isActive("/edit-profile") ? "bg-accent text-foreground" : ""
                  )}
                >
                  <Link to="/edit-profile" onClick={handleLinkClick}>
                    Profile
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex flex-col items-center justify-center p-4">
            <ModeToggle />
            <button
              onClick={logout}
              className="mt-4 text-red-600 hover:bg-secondary w-full text-left p-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
