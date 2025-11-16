import { MessageSquare, Users, Sparkles, Heart } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-8 bg-gradient-to-br from-surface-800/30 to-surface-900/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-surface-400/10 rounded-full blur-2xl animate-bounce-subtle"></div>
      </div>

      <div className="max-w-lg text-center space-y-8 relative z-10">
        {/* Icon Display */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="relative group">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 flex items-center justify-center animate-bounce-subtle shadow-glow">
              <MessageSquare className="w-10 h-10 text-brand-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-400 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
            Welcome to ChatFlow
          </h2>
          <p className="text-surface-300 text-lg leading-relaxed">
            Connect with friends and start meaningful conversations
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="p-4 bg-surface-800/50 rounded-2xl border border-surface-700/50 backdrop-blur-sm hover:bg-surface-700/50 transition-all duration-300 hover:scale-105">
            <Users className="w-8 h-8 text-brand-400 mx-auto mb-2" />
            <p className="text-sm text-surface-300 font-medium">Real-time Chat</p>
          </div>
          <div className="p-4 bg-surface-800/50 rounded-2xl border border-surface-700/50 backdrop-blur-sm hover:bg-surface-700/50 transition-all duration-300 hover:scale-105">
            <Heart className="w-8 h-8 text-accent-400 mx-auto mb-2" />
            <p className="text-sm text-surface-300 font-medium">Secure & Private</p>
          </div>
          <div className="p-4 bg-surface-800/50 rounded-2xl border border-surface-700/50 backdrop-blur-sm hover:bg-surface-700/50 transition-all duration-300 hover:scale-105">
            <Sparkles className="w-8 h-8 text-surface-400 mx-auto mb-2" />
            <p className="text-sm text-surface-300 font-medium">Modern Design</p>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-8">
          <p className="text-surface-400 text-sm">
            Choose a contact from the sidebar to begin your conversation
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
