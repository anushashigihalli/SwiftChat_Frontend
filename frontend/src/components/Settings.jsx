import { useState } from "react";
import { X, Moon, Sun, Bell, Shield, User, Info, Palette, Volume2, Globe, HardDrive, HelpCircle, Lock, MessageSquare, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Settings = ({ isOpen, onClose }) => {
  const { authUser, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("appearance");
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState("medium");
  const [wallpaper, setWallpaper] = useState("default");
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [lastSeen, setLastSeen] = useState("everyone");
  const [profilePhoto, setProfilePhoto] = useState("everyone");
  const [language, setLanguage] = useState("english");
  const [twoFactor, setTwoFactor] = useState(false);

  if (!isOpen) return null;

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    // TODO: Implement actual theme switching
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface-800 rounded-2xl shadow-large border border-surface-700/50 w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-700/30">
          <h2 className="text-xl font-display font-semibold text-surface-100">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-700/50 transition-colors"
          >
            <X className="w-5 h-5 text-surface-400" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Theme Settings */}
          <div className="p-6 border-b border-surface-700/30">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-brand-400" />
              <h3 className="font-medium text-surface-100">Appearance</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-surface-300">Theme</span>
                <button
                  onClick={handleThemeToggle}
                  className="flex items-center gap-2 px-3 py-2 bg-surface-700 rounded-lg hover:bg-surface-600 transition-colors"
                >
                  {theme === "dark" ? (
                    <>
                      <Moon className="w-4 h-4" />
                      <span>Dark</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4" />
                      <span>Light</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="p-6 border-b border-surface-700/30">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-accent-400" />
              <h3 className="font-medium text-surface-100">Notifications</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-surface-300">Push Notifications</span>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="toggle toggle-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-surface-300">Read Receipts</span>
                <input
                  type="checkbox"
                  checked={readReceipts}
                  onChange={(e) => setReadReceipts(e.target.checked)}
                  className="toggle toggle-primary"
                />
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="p-6 border-b border-surface-700/30">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-accent-400" />
              <h3 className="font-medium text-surface-100">Privacy</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-surface-300">Last Seen</span>
                <select className="select select-bordered select-sm bg-surface-700 border-surface-600">
                  <option>Everyone</option>
                  <option>My Contacts</option>
                  <option>Nobody</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-surface-300">Profile Photo</span>
                <select className="select select-bordered select-sm bg-surface-700 border-surface-600">
                  <option>Everyone</option>
                  <option>My Contacts</option>
                  <option>Nobody</option>
                </select>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="p-6 border-b border-surface-700/30">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-brand-400" />
              <h3 className="font-medium text-surface-100">Account</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-surface-300">Email</span>
                <span className="text-surface-100">{authUser?.email}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-surface-300">Member Since</span>
                <span className="text-surface-100">{authUser?.createdAt?.split("T")[0]}</span>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-5 h-5 text-surface-400" />
              <h3 className="font-medium text-surface-100">About</h3>
            </div>
            <div className="space-y-2 text-sm text-surface-400">
              <p>ChatFlow v1.0.0</p>
              <p>Modern messaging for everyone</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-surface-700/30">
          <button
            onClick={handleLogout}
            className="w-full py-3 px-4 bg-accent-500 hover:bg-accent-600 text-white rounded-lg transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;