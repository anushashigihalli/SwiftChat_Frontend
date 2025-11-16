import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState, useCallback } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { getAvatarInfo } from "../lib/avatar";
import { getMessageAriaLabel } from "../lib/accessibility";
import { Reply, MoreVertical, Heart, Trash2, Share2, Check, CheckCheck, Clock, Edit } from "lucide-react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    deleteMessage,
    editMessage,
    isTyping,
    users,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editText, setEditText] = useState("");
  const [messagePage, setMessagePage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const messagesTopRef = useRef(null);

  useEffect(() => {
    const userId = selectedUser?._id || selectedUser?.id;
    if (selectedUser && userId) {
      getMessages(userId);
      subscribeToMessages();

      // Show unread message notification
      const currentUserData = users.find(user => (user._id || user.id) === userId);
      const unreadCount = currentUserData?.unreadCount || 0;
      if (unreadCount > 0) {
        // You could add a toast notification here
        console.log(`You have ${unreadCount} unread message${unreadCount > 1 ? 's' : ''} from ${selectedUser.fullName}`);
      }
    }

    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser?._id, selectedUser?.id]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Infinite scroll for loading more messages
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreMessages && !loadingMore && messages.length > 0) {
          loadMoreMessages();
        }
      },
      { threshold: 0.1 }
    );

    if (messagesTopRef.current) {
      observer.observe(messagesTopRef.current);
    }

    return () => observer.disconnect();
  }, [hasMoreMessages, loadingMore, messages.length]);

  const loadMoreMessages = async () => {
    if (!selectedUser || loadingMore) return;

    setLoadingMore(true);
    try {
      // TODO: Implement pagination API call
      // For now, just simulate loading
      setTimeout(() => {
        setMessagePage(prev => prev + 1);
        setLoadingMore(false);
        // In a real implementation, check if there are more messages
        if (messagePage >= 3) {
          setHasMoreMessages(false);
        }
      }, 1000);
    } catch (error) {
      setLoadingMore(false);
    }
  };

  const handleSaveEdit = async (messageId) => {
    if (!editText.trim()) return;

    try {
      await editMessage(messageId, editText.trim());
      setEditingMessage(null);
      setEditText("");
    } catch (error) {
      console.error("Failed to edit message:", error);
    }
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput replyingTo={replyingTo} onCancelReply={() => setReplyingTo(null)} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-b from-surface-800/50 to-surface-900/50 backdrop-blur-sm">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-surface-600 scrollbar-track-transparent">
        {/* Loading indicator for infinite scroll */}
        {loadingMore && (
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-2 text-surface-400">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-surface-400 border-t-transparent"></div>
              <span className="text-sm">Loading more messages...</span>
            </div>
          </div>
        )}

        {/* Invisible element for intersection observer */}
        <div ref={messagesTopRef} className="h-4" />

        {selectedUser && selectedUser.fullName && messages?.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"} animate-slide-up group relative`}
            ref={messageEndRef}
            aria-label={selectedUser && selectedUser.fullName ? getMessageAriaLabel(
              message.senderId === authUser._id ? 'You' : selectedUser.fullName,
              message.text || 'sent an image',
              message.createdAt
            ) : ''}
          >
            {/* Action buttons on hover - Available for all messages */}
            <div className={`absolute -top-2 ${message.senderId === authUser._id ? 'left-2' : 'right-2'} opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1`}>
              <button
                className="bg-surface-700 hover:bg-surface-600 rounded-full p-1 shadow-md"
                onClick={() => setReplyingTo(message)}
                aria-label="Reply to message"
              >
                <Reply className="w-3 h-3 text-surface-300" />
              </button>
              <button
                className="bg-surface-700 hover:bg-surface-600 rounded-full p-1 shadow-md"
                onClick={() => {
                  const shareText = message.text || (message.image ? "Shared an image" : "Shared a message");
                  if (navigator.share) {
                    navigator.share({
                      title: 'Shared Message',
                      text: shareText,
                    });
                  } else {
                    navigator.clipboard.writeText(shareText);
                    // TODO: Show toast notification
                  }
                }}
                aria-label="Share message"
              >
                <Share2 className="w-3 h-3 text-surface-300" />
              </button>
              {message.senderId === authUser._id && (
                <>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 rounded-full p-1 shadow-md"
                    onClick={() => {
                      setEditingMessage(message._id);
                      setEditText(message.text);
                    }}
                    aria-label="Edit message"
                  >
                    <Edit className="w-3 h-3 text-white" />
                  </button>
                  <button
                    className="bg-accent-500 hover:bg-accent-600 rounded-full p-1 shadow-md"
                    onClick={() => deleteMessage(message._id)}
                    aria-label="Delete message"
                  >
                    <Trash2 className="w-3 h-3 text-white" />
                  </button>
                </>
              )}
            </div>
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                {(() => {
                  const isCurrentUser = message.senderId === authUser._id;
                  const user = isCurrentUser ? authUser : selectedUser;
                  const avatarInfo = getAvatarInfo(user.profilePic, user.fullName);

                  if (avatarInfo.hasProfilePic) {
                    return (
                      <img
                        src={avatarInfo.url}
                        alt={`${user.fullName}'s profile picture`}
                        onError={(e) => {
                          e.target.src = "/avatar.png";
                        }}
                      />
                    );
                  }

                  return (
                    <div
                      className="size-10 rounded-full flex items-center justify-center text-white text-xs font-medium"
                      style={{
                        background: avatarInfo.color
                      }}
                    >
                      {avatarInfo.initials}
                    </div>
                  );
                })()}
              </div>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Message attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.png";
                  }}
                />
              )}

              {/* Edit mode */}
              {editingMessage === message._id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full bg-surface-700 border border-surface-600 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveEdit(message._id);
                      } else if (e.key === 'Escape') {
                        setEditingMessage(null);
                        setEditText("");
                      }
                    }}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEdit(message._id)}
                      className="px-3 py-1 bg-brand-500 hover:bg-brand-600 text-white text-xs rounded transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingMessage(null);
                        setEditText("");
                      }}
                      className="px-3 py-1 bg-surface-600 hover:bg-surface-700 text-surface-300 text-xs rounded transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {message.text && (
                    <div className="relative">
                      <p className={message.isEdited ? "italic text-surface-300" : ""}>
                        {message.text}
                      </p>
                      {message.isEdited && (
                        <span className="text-xs text-surface-500 ml-2">(edited)</span>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
            {/* Message status indicator - only for sent messages */}
            {message.senderId === authUser._id && (
              <div className="chat-footer opacity-70 text-xs flex items-center gap-1 mt-1">
                <time>{formatMessageTime(message.createdAt)}</time>
                {message.status === "sent" && <Clock className="w-3 h-3 text-surface-400" />}
                {message.status === "delivered" && <Check className="w-3 h-3 text-surface-400" />}
                {message.status === "read" && <CheckCheck className="w-3 h-3 text-blue-400" />}
              </div>
            )}
            {/* Reply indicator */}
            {message.replyTo && (() => {
              const repliedMessage = messages.find(m => m._id === message.replyTo);
              if (!repliedMessage) return null;
              return (
                <div className="mb-2 p-2 bg-surface-700/50 rounded-lg border-l-2 border-brand-400">
                  <div className="text-xs text-surface-400 mb-1">
                    Replying to {repliedMessage.senderId === authUser._id ? 'You' : selectedUser?.fullName}
                  </div>
                  <div className="text-sm text-surface-300 truncate">
                    {repliedMessage.text || (repliedMessage.image ? '📷 Photo' : 'Message')}
                  </div>
                </div>
              );
            })()}


            {/* Timestamp for received messages */}
            {message.senderId !== authUser._id && (
              <div className="chat-footer opacity-70 text-xs mt-1">
                <time>{formatMessageTime(message.createdAt)}</time>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Typing indicator */}
      {isTyping && (
        <div className="px-6 py-2 text-sm text-surface-400 animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <span>{selectedUser?.fullName} is typing...</span>
          </div>
        </div>
      )}

      <MessageInput replyingTo={replyingTo} onCancelReply={() => setReplyingTo(null)} />
    </div>
  );
};

export default ChatContainer;
