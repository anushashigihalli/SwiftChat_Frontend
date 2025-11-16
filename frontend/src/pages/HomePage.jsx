import { useState } from "react";
import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import TopNavbar from "../components/TopNavbar";
import Settings from "../components/Settings";
import { useIsMobile } from "../lib/responsive";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const isMobile = useIsMobile();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-brand-900 font-inter relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-surface-400/5 rounded-full blur-2xl animate-bounce-subtle"></div>
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-brand-400/8 rounded-full blur-2xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4 pt-20 relative z-10">
        <div className="bg-surface-800/95 backdrop-blur-xl rounded-2xl shadow-large border border-surface-700/50 w-full max-w-7xl h-[calc(100vh-5rem)] transition-all duration-500 hover:shadow-glow animate-slide-up">
          <div className="flex h-full rounded-lg overflow-hidden">
            {isMobile ? (
              selectedUser ? <ChatContainer /> : <Sidebar />
            ) : (
              <>
                <Sidebar />
                {selectedUser && (selectedUser._id || selectedUser.id) ? <ChatContainer /> : <NoChatSelected />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
