import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import Settings from "./Settings";
import { Users, MessageCircle, Search, MessageSquare, X, Settings as SettingsIcon, Moon, Sun, Star } from "lucide-react";
import { formatUserStatus, getUserStatusClass } from "../lib/presence";
import { getAvatarInfo } from "../lib/avatar";
import { useIsMobile } from "../lib/responsive";
import { getUserStatusAriaLabel } from "../lib/accessibility";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    getUsers();
  }, [getUsers]);


  const filteredUsers = users
    .filter((user) => !showOnlineOnly || onlineUsers.includes(user._id))
    .filter((user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className={`h-full ${isMobile ? 'w-full' : 'w-20 lg:w-80'} border-r border-surface-700/50 flex flex-col transition-all duration-500 bg-surface-800/95 backdrop-blur-xl shadow-soft`}>
      <div className="border-b border-surface-700/30 w-full p-6 bg-gradient-to-r from-surface-800/50 to-surface-700/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-500/20 rounded-lg">
            <Users className="size-5 text-brand-400 animate-pulse-slow" />
          </div>
          <span className="font-display font-semibold text-lg hidden lg:block bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">Contacts</span>
        </div>

        {/* Search input */}
        <div className="mt-4 hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface-700/50 border border-surface-600/50 rounded-lg
              text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50
              focus:border-brand-400/50 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-surface-400 hover:text-surface-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
              aria-label="Show online users only"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500" aria-label="Online users count">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => {
              setSelectedUser(user);
            }}
            className={`
              w-full p-4 flex items-center gap-4 rounded-xl group
              hover:bg-gradient-to-r hover:from-brand-500/10 hover:to-accent-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-medium
              ${selectedUser && (selectedUser._id || selectedUser.id) === (user._id || user.id) ? "bg-gradient-to-r from-brand-500/20 to-accent-500/20 ring-2 ring-brand-400/50 shadow-glow scale-[1.02] animate-scale-in" : "hover:translate-x-1"}
            `}
            aria-label={`Chat with ${user.fullName}`}
            aria-current={selectedUser && (selectedUser._id || selectedUser.id) === (user._id || user.id) ? "page" : undefined}
          >
            <div className="relative mx-auto lg:mx-0">
              {(() => {
                const avatarInfo = getAvatarInfo(user.profilePic, user.fullName);
                
                if (avatarInfo.hasProfilePic) {
                  return (
                    <img
                      src={avatarInfo.url}
                      alt={user.fullName}
                      className="size-12 object-cover rounded-full"
                      onError={(e) => {
                        e.target.src = "/avatar.png";
                      }}
                    />
                  );
                }
                
                return (
                  <div 
                    className="size-12 rounded-full flex items-center justify-center text-white font-medium"
                    style={{
                      background: avatarInfo.color
                    }}
                  >
                    {avatarInfo.initials}
                  </div>
                );
              })()}
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                  aria-label={getUserStatusAriaLabel(user.fullName, true)}
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-surface-400 truncate">
                {user.lastMessage ? (
                  user.lastMessage.text ? (
                    user.lastMessage.text.length > 30
                      ? `${user.lastMessage.text.substring(0, 30)}...`
                      : user.lastMessage.text
                  ) : user.lastMessage.image ? (
                    "📷 Photo"
                  ) : (
                    "New conversation"
                  )
                ) : (
                  formatUserStatus(onlineUsers.includes(user._id))
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {/* Favorite star button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Implement favorite toggle
                  const userId = user._id || user.id;
                  console.log("Toggle favorite for", userId);
                }}
                className="p-1 rounded-full hover:bg-surface-600 transition-colors"
                aria-label={`Toggle favorite for ${user.fullName}`}
              >
                <Star className={`w-4 h-4 ${user.isFavorite ? "text-yellow-400 fill-yellow-400" : "text-surface-400"}`} />
              </button>

              {/* Unread count badge */}
              {user.unreadCount > 0 && (
                <div className="bg-green-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1.5 animate-bounce">
                  {user.unreadCount > 99 ? "99+" : user.unreadCount}
                </div>
              )}
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-surface-500 py-4">No contacts found</div>
        )}
      </div>

      {/* Settings button */}
      <div className="mt-auto p-4 border-t border-surface-700/30">
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-surface-700/50 transition-colors duration-200 group"
        >
          <SettingsIcon className="w-5 h-5 text-surface-400 group-hover:text-surface-200" />
          <span className="text-surface-300 group-hover:text-surface-100 hidden lg:block">Settings</span>
        </button>
      </div>

      {/* Settings Modal */}
      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </aside>
  );
};
export default Sidebar;
