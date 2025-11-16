import { useState } from "react";
import { X, Edit3, Camera, MapPin, Calendar, Mail, Phone, MessageSquare, Heart, Star, Trophy, Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const UserProfile = ({ isOpen, onClose, user = null }) => {
  const { authUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    fullName: user?.fullName || authUser?.fullName || "",
    bio: user?.bio || "Hey there! I'm using ChatFlow.",
    location: user?.location || "",
    website: user?.website || "",
  });

  // Use passed user or current auth user
  const profileUser = user || authUser;

  if (!isOpen) return null;

  const handleSave = () => {
    // TODO: Implement profile update API call
    console.log("Saving profile:", editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({
      fullName: profileUser?.fullName || "",
      bio: profileUser?.bio || "Hey there! I'm using ChatFlow.",
      location: profileUser?.location || "",
      website: profileUser?.website || "",
    });
    setIsEditing(false);
  };

  // Mock stats - in a real app, these would come from API
  const stats = {
    messages: 1247,
    friends: 89,
    likes: 234,
    joined: profileUser?.createdAt ? new Date(profileUser.createdAt).toLocaleDateString() : "Recently",
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface-800 rounded-2xl shadow-large border border-surface-700/50 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-32 bg-gradient-to-r from-brand-500 via-accent-500 to-brand-600 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Profile Picture */}
          <div className="absolute -bottom-12 left-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-brand-400 to-accent-400 rounded-full border-4 border-surface-800 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {profileUser?.fullName?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-brand-500 rounded-full border-2 border-surface-800">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-16 px-6 pb-6">
          {/* Profile Info */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.fullName}
                  onChange={(e) => setEditedProfile({...editedProfile, fullName: e.target.value})}
                  className="text-2xl font-bold bg-transparent border-b border-surface-600 focus:border-brand-400 outline-none text-surface-100"
                />
              ) : (
                <h1 className="text-2xl font-bold text-surface-100">{profileUser?.fullName}</h1>
              )}

              {!user && ( // Only show edit for own profile
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isEditing
                      ? "bg-brand-500 hover:bg-brand-600 text-white"
                      : "bg-surface-700 hover:bg-surface-600 text-surface-300"
                  }`}
                >
                  {isEditing ? "Save" : <Edit3 className="w-4 h-4" />}
                </button>
              )}
            </div>

            <p className="text-surface-400 mb-3">@{profileUser?.email?.split("@")[0]}</p>

            {isEditing ? (
              <textarea
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                className="w-full bg-surface-700/50 border border-surface-600 rounded-lg p-3 text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50 resize-none"
                rows={3}
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-surface-300 leading-relaxed">
                {profileUser?.bio || "Hey there! I'm using ChatFlow."}
              </p>
            )}

            {/* Additional Info */}
            <div className="mt-4 space-y-2">
              {isEditing ? (
                <>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-surface-400" />
                    <input
                      type="text"
                      value={editedProfile.location}
                      onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                      placeholder="Location"
                      className="bg-transparent border-b border-surface-600 focus:border-brand-400 outline-none text-surface-300 flex-1"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-surface-400" />
                    <input
                      type="url"
                      value={editedProfile.website}
                      onChange={(e) => setEditedProfile({...editedProfile, website: e.target.value})}
                      placeholder="Website"
                      className="bg-transparent border-b border-surface-600 focus:border-brand-400 outline-none text-surface-300 flex-1"
                    />
                  </div>
                </>
              ) : (
                <>
                  {profileUser?.location && (
                    <div className="flex items-center space-x-2 text-surface-400">
                      <MapPin className="w-4 h-4" />
                      <span>{profileUser.location}</span>
                    </div>
                  )}
                  {profileUser?.website && (
                    <div className="flex items-center space-x-2 text-surface-400">
                      <Mail className="w-4 h-4" />
                      <a href={profileUser.website} className="hover:text-brand-400 transition-colors">
                        {profileUser.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-surface-400">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {stats.joined}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-surface-700/50 rounded-lg p-4 text-center">
              <MessageSquare className="w-6 h-6 mx-auto mb-2 text-blue-400" />
              <div className="text-xl font-bold text-surface-100">{stats.messages.toLocaleString()}</div>
              <div className="text-sm text-surface-400">Messages</div>
            </div>
            <div className="bg-surface-700/50 rounded-lg p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-green-400" />
              <div className="text-xl font-bold text-surface-100">{stats.friends}</div>
              <div className="text-sm text-surface-400">Friends</div>
            </div>
            <div className="bg-surface-700/50 rounded-lg p-4 text-center">
              <Heart className="w-6 h-6 mx-auto mb-2 text-red-400" />
              <div className="text-xl font-bold text-surface-100">{stats.likes}</div>
              <div className="text-sm text-surface-400">Likes</div>
            </div>
            <div className="bg-surface-700/50 rounded-lg p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
              <div className="text-xl font-bold text-surface-100">12</div>
              <div className="text-sm text-surface-400">Badges</div>
            </div>
          </div>

          {/* Action Buttons */}
          {user && user._id !== authUser?._id && (
            <div className="flex space-x-3">
              <button className="flex-1 bg-brand-500 hover:bg-brand-600 text-white py-3 px-4 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Send Message</span>
              </button>
              <button className="px-4 py-3 bg-surface-700 hover:bg-surface-600 rounded-lg transition-colors">
                <Star className="w-5 h-5 text-surface-300" />
              </button>
            </div>
          )}

          {/* Cancel button for editing */}
          {isEditing && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-surface-400 hover:text-surface-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;