import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { handleApiError } from "../lib/errorHandler";
import { showError } from "../lib/notifications";
import { cacheUsers, getCachedUsers } from "../lib/cache";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isTyping: false,

  getUsers: async () => {
    // Check cache first
    const cachedUsers = getCachedUsers();
    if (cachedUsers) {
      set({ users: cachedUsers });
      return;
    }
    
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
      cacheUsers(res.data); // Cache the result
    } catch (error) {
      handleApiError(error, "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    if (!userId) return;

    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      handleApiError(error, "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const userId = selectedUser._id || selectedUser.id;
    try {
      const res = await axiosInstance.post(`/messages/send/${userId}`, messageData);
      set({ messages: [...messages, res.data] });
      // Refresh users list to update last message preview
      await get().getUsers();
    } catch (error) {
      handleApiError(error, "Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const { selectedUser } = get();
      const currentUserId = selectedUser?._id || selectedUser?.id;

      if (selectedUser && newMessage.senderId === currentUserId) {
        // Add message to current chat
        set({
          messages: [...get().messages, newMessage],
        });
      } else {
        // New message from someone else, refresh users list to update unread counts
        get().getUsers();
      }
    });

    // Handle typing indicators
    socket.on("typing", ({ from }) => {
      const { selectedUser } = get();
      const userId = selectedUser?._id || selectedUser?.id;
      if (selectedUser && from === userId) {
        set({ isTyping: true });
      }
    });

    socket.on("stopTyping", ({ from }) => {
      const { selectedUser } = get();
      const userId = selectedUser?._id || selectedUser?.id;
      if (selectedUser && from === userId) {
        set({ isTyping: false });
      }
    });

  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
      socket.off("typing");
      socket.off("stopTyping");
    }
  },

  startTyping: (userId) => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.emit("typing", { to: userId });
    }
  },

  stopTyping: (userId) => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.emit("stopTyping", { to: userId });
    }
  },

  setSelectedUser: async (selectedUser) => {
    const { selectedUser: currentSelectedUser } = get();

    // Only clear messages if switching to a different user
    const shouldClearMessages = !currentSelectedUser ||
      (currentSelectedUser._id || currentSelectedUser.id) !== (selectedUser._id || selectedUser.id);

    set({
      selectedUser,
      ...(shouldClearMessages && { messages: [] }) // Only clear messages when switching users
    });

    // Mark messages as read when selecting a user
    const userId = selectedUser?._id || selectedUser?.id;
    if (selectedUser && userId) {
      await get().markMessagesAsRead(userId);
      // Refresh users list to update unread counts
      await get().getUsers();
    }
  },

  markMessagesAsRead: async (userId) => {
    try {
      await axiosInstance.put(`/messages/read/${userId}`);
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  },

  deleteMessage: async (messageId) => {
    try {
      await axiosInstance.delete(`/messages/${messageId}`);
      // Update local messages state
      const { messages } = get();
      set({
        messages: messages.filter(msg => msg._id !== messageId)
      });
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  },

  editMessage: async (messageId, newText) => {
    try {
      const res = await axiosInstance.put(`/messages/edit/${messageId}`, { text: newText });
      // Update local messages state
      const { messages } = get();
      const updatedMessages = messages.map(msg =>
        msg._id === messageId ? res.data : msg
      );
      set({ messages: updatedMessages });
      return res.data;
    } catch (error) {
      console.error("Error editing message:", error);
      throw error;
    }
  },
}));
