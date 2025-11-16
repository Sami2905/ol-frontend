import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  Home,
  BookOpen,
  LogIn,
  UserPlus,
  LogOut,
  User,
  Settings,
  GraduationCap,
  Moon,
  Sun,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import { cn } from "../utils/cn";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Safely parse stored user
  const savedUser = useMemo(() => {
    try {
      const value = localStorage.getItem("user");
      if (!value || value === "undefined") return null;
      return JSON.parse(value);
    } catch {
      console.warn("Invalid user JSON found in localStorage.");
      return null;
    }
  }, []);

  const isLoggedIn = !!localStorage.getItem("token");
  const avatar = savedUser?.name?.charAt(0)?.toUpperCase() || "U";

  // Dark mode initialization
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserDropdownOpen(false);
    navigate("/");
    window.location.reload();
  };

  const links = [
    {
      title: "Home",
      path: "/",
      icon: Home,
    },
    {
      title: "Courses",
      path: "/courses",
      icon: BookOpen,
    },
  ];

  const authLinks = !isLoggedIn
    ? [
        {
          title: "Login",
          path: "/login",
          icon: LogIn,
        },
        {
          title: "Signup",
          path: "/signup",
          icon: UserPlus,
        },
      ]
    : [];

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-slate-700/50"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center h-16 gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
            >
              CourseStore
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-1 md:space-x-2 font-medium flex-1 justify-center">
              {[...links, ...authLinks].map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200 group relative text-sm md:text-base"
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">{link.title}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300" />
                  </Link>
                );
              })}

              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
              >
                <Search className="w-4 h-4 flex-shrink-0" />
                <span className="hidden xl:inline text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Search... <kbd className="ml-2 px-1.5 py-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded">⌘K</kbd>
                </span>
              </button>

              {/* Shopping Cart */}
              {isLoggedIn && (
                <button className="relative p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    0
                  </span>
                </button>
              )}

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* User Dropdown */}
              {isLoggedIn && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-full flex justify-center items-center font-bold text-sm backdrop-blur-sm">
                      {avatar}
                    </div>
                    <span className="font-medium max-w-32 truncate hidden lg:block">
                      {savedUser?.name || "User"}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        userDropdownOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* User Dropdown Menu */}
                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 py-2 z-50 overflow-hidden"
                      >
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {savedUser?.name || "User"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {savedUser?.email || "user@example.com"}
                          </p>
                        </div>

                        {/* Dropdown Links */}
                        <Link
                          to="/courses"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200 group"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                            <GraduationCap className="w-4 h-4 text-white" />
                          </div>
                          My Courses
                        </Link>

                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200 group"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          Dashboard
                        </Link>

                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200 group"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                            <Settings className="w-4 h-4 text-white" />
                          </div>
                          Settings
                        </Link>

                        {/* Logout Section */}
                        <div className="border-t border-gray-200 dark:border-slate-700 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                              <LogOut className="w-4 h-4 text-white" />
                            </div>
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-32 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              ref={searchRef}
              className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center px-4 border-b border-gray-200 dark:border-slate-700">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search courses, instructors, topics..."
                  className="flex-1 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                  autoFocus
                />
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded">
                  ESC
                </kbd>
              </div>
              <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
                <p>Start typing to search...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-80 bg-white dark:bg-slate-900 backdrop-blur-xl shadow-2xl z-50 p-6 border-r border-gray-200 dark:border-slate-700 md:hidden overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* User Section */}
            {isLoggedIn && savedUser && (
              <div className="mt-8 flex flex-col items-center pb-6 border-b border-gray-200 dark:border-slate-700">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex justify-center items-center text-2xl font-bold shadow-lg">
                  {avatar}
                </div>
                <p className="mt-3 font-bold text-gray-900 dark:text-white text-lg">
                  {savedUser.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {savedUser.email}
                </p>
              </div>
            )}

            {/* Sidebar Menu */}
            <div className="mt-6 space-y-2">
              {[...links, ...authLinks].map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center gap-4 p-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 text-lg font-medium group"
                    onClick={() => setOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    {link.title}
                  </Link>
                );
              })}

              {/* Dark Mode Toggle Mobile */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-4 p-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 w-full text-lg font-medium group"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-gray-500 to-slate-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-white" />
                  ) : (
                    <Moon className="w-5 h-5 text-white" />
                  )}
                </div>
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>

              {/* Logout for Mobile */}
              {isLoggedIn && (
                <button
                  className="flex items-center gap-4 p-4 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 w-full text-lg font-medium group"
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <LogOut className="w-5 h-5 text-white" />
                  </div>
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}
