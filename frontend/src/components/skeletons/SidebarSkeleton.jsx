import { MessageSquare } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-surface-700/50 flex flex-col transition-all duration-500 bg-surface-800/95 backdrop-blur-xl shadow-soft">
      {/* Header */}
      <div className="border-b border-surface-700/30 w-full p-6 bg-gradient-to-r from-surface-800/50 to-surface-700/30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-accent-400 rounded-lg flex items-center justify-center shadow-soft animate-pulse">
              <MessageSquare className="size-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-surface-100">ChatFlow</span>
          </div>
          <span className="font-medium hidden lg:block text-surface-400 text-sm">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-4 flex items-center gap-4 animate-pulse">
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="size-12 rounded-full bg-surface-700 animate-pulse" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1 space-y-2">
              <div className="h-4 bg-surface-700 rounded w-32 animate-pulse" />
              <div className="h-3 bg-surface-700 rounded w-16 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
