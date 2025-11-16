import { useState } from "react";
import { Bell, Search, User, Settings, Moon, Sun, MessageSquare, Heart, Star } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import UserProfile from "./UserProfile";

const TopNavbar = ({ onSettingsClick }) => {
  const { authUser, logout } = useAuthStore();
  const { users, selectedUser } = useChatStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [theme, setTheme] = useState("dark");

  // Mock notifications - in a real app, this would come from an API
  const notifications = [
    {
      id: 1,
      type: "message",
      title: "New message from John",
      content: "Hey, how are you doing?",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      type: "like",
      title: "Sarah liked your message",
      content: "In conversation with Mike",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 3,
      type: "system",
      title: "Welcome to ChatFlow!",
      content: "Thanks for joining our community",
      time: "1 hour ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    // TODO: Implement actual theme switching
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "message":
        return <MessageSquare className="w-4 h-4 text-blue-400" />;
      case "like":
        return <Heart className="w-4 h-4 text-red-400" />;
      case "system":
        return <Star className="w-4 h-4 text-yellow-400" />;
      default:
        return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <nav className="bg-surface-800/95 backdrop-blur-xl border-b border-surface-700/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and search */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-accent-400 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-surface-100 hidden sm:block">
                ChatFlow
              </span>
            </div>

            {/* Search bar - hidden on mobile */}
            <div className="hidden md:block relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search messages, contacts..."
                  className="w-80 pl-10 pr-4 py-2 bg-surface-700/50 border border-surface-600/50 rounded-lg
                  text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50
                  focus:border-brand-400/50 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Right side - Actions and user menu */}
          <div className="flex items-center space-x-2">
            {/* Theme toggle */}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-lg hover:bg-surface-700/50 transition-colors"
              title="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-surface-300" />
              ) : (
                <Moon className="w-5 h-5 text-surface-300" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-surface-700/50 transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5 text-surface-300" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-surface-800 border border-surface-700/50 rounded-xl shadow-xl z-50">
                  <div className="p-4 border-b border-surface-700/30">
                    <h3 className="font-medium text-surface-100">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-surface-700/30 hover:bg-surface-700/30 cursor-pointer ${
                            notification.unread ? "bg-brand-400/5" : ""
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-surface-100 truncate">
                                {notification.title}
                              </p>
                              <p className="text-sm text-surface-400 truncate">
                                {notification.content}
                              </p>
                              <p className="text-xs text-surface-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-brand-400 rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-surface-400">
                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 border-t border-surface-700/30">
                    <button className="w-full text-sm text-brand-400 hover:text-brand-300">
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-surface-700/50 transition-colors"
                title="Profile menu"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-accent-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {authUser?.fullName?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
                <span className="hidden md:block text-surface-100 font-medium">
                  {authUser?.fullName?.split(" ")[0] || "User"}
                </span>
              </button>

              {/* Profile dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-surface-800 border border-surface-700/50 rounded-xl shadow-xl z-50">
                  <div className="p-4 border-b border-surface-700/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-accent-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {authUser?.fullName?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-surface-100">{authUser?.fullName}</p>
                        <p className="text-sm text-surface-400">{authUser?.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setShowProfile(true);
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-surface-300 hover:bg-surface-700/50 hover:text-surface-100 transition-colors flex items-center space-x-3"
                    >
                      <User className="w-4 h-4" />
                      <span>View Profile</span>
                    </button>
                    <button
                      onClick={onSettingsClick}
                      className="w-full text-left px-4 py-2 text-surface-300 hover:bg-surface-700/50 hover:text-surface-100 transition-colors flex items-center space-x-3"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <div className="border-t border-surface-700/30 my-2"></div>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors flex items-center space-x-3"
                    >
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-surface-700/50 border border-surface-600/50 rounded-lg
            text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50
            focus:border-brand-400/50 transition-all duration-200"
          />
        </div>
      </div>

      {/* User Profile Modal */}
      <UserProfile
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </nav>
  );
};

export default TopNavbar;