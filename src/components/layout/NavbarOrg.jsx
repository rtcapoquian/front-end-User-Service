import React, { useState } from "react";
import { cn } from "../../lib/utils";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { ModeToggle } from "../layout/mode-toggle";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Using react-router's useNavigate for redirection

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("user_id");
    navigate("/"); // Redirect to home page using react-router
  };

  const handleLinkClick = () => {
    setMenuOpen(false); // Close the menu on link click
  };

  return (
    <div className="bg-background text-foreground p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo/Title */}
        <Link to="/dashboardOrg" className="text-2xl font-bold flex-shrink-0">
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
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md"
                  )}
                >
                  <Link to="/dashboardOrg">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md"
                  )}
                >
                  <Link to="/landingOrg">Events</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
          
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md"
                  )}
                >
                  <Link to="/postsorg">Forums</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md"
                  )}
                >
                  <Link to="/searchpeopleorg">People</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md"
                  )}
                >
                  <Link to="/chatscreenorg">Chat</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md"
                  )}
                >
                  <Link to="/edit-profileorg">Profile</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Dropdown Icon */}
        <div className="hidden md:flex items-center relative">
          <button onClick={toggleDropdown} className="flex items-center ml-4">
            <FaUserCircle
              size={30}
              className="text-primary hover:text-accent-foreground"
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-muted shadow-lg rounded-md">
              <ul className="text-sm">
                <li>
                  <Link
                    to="/edit-profileorg"
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
          <ModeToggle /> {/* Add ModeToggle button */}
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
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md"
                  )}
                >
                  <Link to="/dashboardOrg" onClick={handleLinkClick}>
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md"
                  )}
                >
                  <Link to="/landingOrg" onClick={handleLinkClick}>
                    Events
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md"
                  )}
                >
                  <Link to="/edit-profileorg" onClick={handleLinkClick}>
                    Profile
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md"
                  )}
                >
                  <Link to="/postsorg" onClick={handleLinkClick}>
                    Forums
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md"
                  )}
                >
                  <Link to="/searchpeopleorg" onClick={handleLinkClick}>
                    People
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-primary text-lg hover:bg-accent px-4 py-2 rounded-md"
                  )}
                >
                  <Link to="/chatscreenorg" onClick={handleLinkClick}>
                    Chat
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
            {/* Mobile Dropdown Icon */}
            <div className="mt-4 p-4 border-t border-muted">
              <button onClick={toggleDropdown} className="flex items-center">
                <FaUserCircle
                  size={30}
                  className="text-primary hover:text-accent"
                />
              </button>
              {isDropdownOpen && (
                <div className="mt-2 bg-card border border-muted shadow-lg rounded-md">
                  <ul className="text-sm">
                    <li>
                      <Link
                        to="/edit-profileorg"
                        onClick={handleLinkClick}
                        className="block px-4 py-2 text-card-foreground hover:bg-secondary"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          handleLinkClick();
                        }}
                        className="block px-4 py-2 text-red-600 hover:bg-secondary w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          <ModeToggle /> {/* Add ModeToggle button */}
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
