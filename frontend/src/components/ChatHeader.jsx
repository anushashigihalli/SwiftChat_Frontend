import { ArrowLeft, MessageCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useIsMobile } from "../lib/responsive";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, users } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isMobile = useIsMobile();

  // Find the current user's unread count
  const currentUserData = users.find(user => (user._id || user.id) === (selectedUser?._id || selectedUser?.id));
  const unreadCount = currentUserData?.unreadCount || 0;

  return (
    <div className="p-6 border-b border-surface-700/50 bg-gradient-to-r from-surface-800/80 to-surface-700/40 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-12 rounded-full relative ring-2 ring-brand-400/30 shadow-soft">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} className="rounded-full" />
              {onlineUsers.includes(selectedUser._id) && (
                <div className="absolute bottom-0 right-0 size-3 bg-accent-400 rounded-full ring-2 ring-surface-800 animate-pulse-slow"></div>
              )}
            </div>
          </div>

          {/* User info */}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-lg text-surface-100">{selectedUser.fullName}</h3>
              {unreadCount > 0 && (
                <div className="bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-2 animate-pulse">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className={`size-2 rounded-full ${onlineUsers.includes(selectedUser._id) ? 'bg-accent-400 animate-bounce-subtle' : 'bg-surface-500'}`}></div>
              <p className="text-sm text-surface-400">
                {onlineUsers.includes(selectedUser._id) ? "Active now" : "Away"}
              </p>
              {unreadCount > 0 && (
                <span className="text-xs text-red-400 font-medium">
                  • {unreadCount} unread message{unreadCount > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => {
            console.log('Back button clicked, setting selectedUser to null');
            setSelectedUser(null);
          }}
          className="flex items-center gap-2 p-3 rounded-lg hover:bg-surface-700/50 active:bg-surface-600/70 transition-all duration-200 group cursor-pointer relative z-10"
          aria-label="Back to contacts"
          title="Return to contact list"
        >
          <ArrowLeft className="size-5 text-surface-400 group-hover:text-surface-200 transition-colors" />
          {isMobile && <span className="text-sm text-surface-400 group-hover:text-surface-200 transition-colors">Back</span>}
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
