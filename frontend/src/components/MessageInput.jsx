import { useRef, useState, useCallback } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { sanitizeInput } from "../lib/sanitization";
import { VALIDATION_RULES } from "../constants/validation";
import { validateFileType, validateFileSize, fileToBase64, compressImage } from "../lib/fileUpload";
import { isSubmitKey, isCancelKey } from "../lib/keyboard";


const MessageInput = ({ replyingTo, onCancelReply }) => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const { sendMessage, selectedUser, startTyping, stopTyping } = useChatStore();

  const handleImageChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!validateFileType(file, ["image/*"])) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size
    if (!validateFileSize(file, VALIDATION_RULES.MESSAGE.IMAGE.MAX_SIZE)) {
      toast.error(`Image size should be less than ${VALIDATION_RULES.MESSAGE.IMAGE.MAX_SIZE / (1024 * 1024)}MB`);
      return;
    }

    try {
      // Compress image for better performance
      const compressedFile = await compressImage(file);
      
      // Convert to base64
      const base64Image = await fileToBase64(compressedFile);
      setImagePreview(base64Image);
    } catch (error) {
      console.error("Failed to process image:", error);
      toast.error("Failed to process image. Please try another file.");
    }
  }, []);

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = useCallback(async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      // Sanitize text input
      const sanitizedText = sanitizeInput(text.trim()).substring(0, VALIDATION_RULES.MESSAGE.TEXT.MAX_LENGTH); // Limit message length and sanitize
      
      await sendMessage({
        text: sanitizedText,
        image: imagePreview,
        replyTo: replyingTo?._id,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  }, [text, imagePreview, sendMessage]);

  return (
    <div className="p-6 w-full bg-gradient-to-t from-surface-800/50 to-transparent">
      {/* Reply indicator */}
      {replyingTo && (
        <div className="mb-3 p-3 bg-surface-700/50 rounded-lg border-l-4 border-brand-400 flex items-center justify-between">
          <div className="flex-1">
            <div className="text-sm text-surface-400 mb-1">
              Replying to {replyingTo.senderId === selectedUser?._id ? selectedUser.fullName : 'You'}
            </div>
            <div className="text-surface-200 truncate">
              {replyingTo.text || (replyingTo.image ? '📷 Photo' : 'Message')}
            </div>
          </div>
          <button
            onClick={onCancelReply}
            className="ml-2 p-1 hover:bg-surface-600 rounded-full transition-colors"
            aria-label="Cancel reply"
          >
            <X className="w-4 h-4 text-surface-400" />
          </button>
        </div>
      )}

      {imagePreview && (
        <div className="mb-4 flex items-center gap-3 animate-scale-in">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-xl border-2 border-surface-600 shadow-medium"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent-500 hover:bg-accent-600
              flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-soft"
              type="button"
              aria-label="Remove image"
            >
              <X className="size-3 text-white" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-end gap-3">
        <div className="flex-1 flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-2xl
              text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50
              focus:border-brand-400/50 transition-all duration-200 resize-none"
              placeholder="Type your message..."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
  
                // Handle typing indicators
                if (selectedUser) {
                  if (typingTimeoutRef.current) {
                    clearTimeout(typingTimeoutRef.current);
                  }
                  startTyping(selectedUser._id);
  
                  typingTimeoutRef.current = setTimeout(() => {
                    stopTyping(selectedUser._id);
                  }, 1000);
                }
              }}
              onKeyDown={(e) => {
                if (isSubmitKey(e)) {
                  e.preventDefault();
                  handleSendMessage(e);
                } else if (isCancelKey(e)) {
                  setText("");
                }
              }}
              onBlur={() => {
                // Stop typing when input loses focus
                if (selectedUser) {
                  stopTyping(selectedUser._id);
                  if (typingTimeoutRef.current) {
                    clearTimeout(typingTimeoutRef.current);
                  }
                }
              }}
              maxLength={VALIDATION_RULES.MESSAGE.TEXT.MAX_LENGTH}
              aria-label="Type your message"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`p-3 rounded-2xl transition-all duration-200 hover:scale-105
                      ${imagePreview ? "bg-accent-500/20 text-accent-400 hover:bg-accent-500/30" : "bg-surface-700/50 text-surface-400 hover:bg-surface-600/50 hover:text-surface-300"}`}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Upload image"
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="p-3 bg-brand-500 hover:bg-brand-600 disabled:bg-surface-600 disabled:cursor-not-allowed
          text-white rounded-2xl transition-all duration-200 hover:scale-105 disabled:hover:scale-100
          shadow-soft hover:shadow-medium disabled:shadow-none"
          disabled={!text.trim() && !imagePreview}
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
