import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Music, LogOut } from "lucide-react";

export default function AdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({
    userId: "",
    username: "",
    email: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch user data from localStorage on mount
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (userId && username && email) {
      setUpdatedUserData({
        userId: userId || "user123",
        username: username || "Guest",
        email: email || "guest@example.com",
      });
    } else {
      navigate("/"); // Redirect to home if any user data is missing
    }
  }, [navigate]);

  // Handle saving profile changes
  const handleEditUser = () => {
    if (
      !updatedUserData.username ||
      !updatedUserData.email ||
      !updatedUserData.userId
    ) {
      setError("All fields are required.");
      return;
    }
    try {
      localStorage.setItem("userId", updatedUserData.userId);
      localStorage.setItem("username", updatedUserData.username);
      localStorage.setItem("email", updatedUserData.email);
      setIsModalOpen(false);
      setError("");
      // Optionally show a success toast (uncomment if toast is available)
      // toast.success('Profile updated successfully!');
    } catch (error) {
      console.error("Error saving user data to localStorage:", error);
      setError("Failed to update profile.");
    }
  };

  // Handle resetting profile to default values
  const handleResetProfile = () => {
    const defaultData = {
      userId: "user123",
      username: "Guest",
      email: "guest@example.com",
    };
    setUpdatedUserData(defaultData);
    try {
      localStorage.setItem("userId", defaultData.userId);
      localStorage.setItem("username", defaultData.username);
      localStorage.setItem("email", defaultData.email);
      setIsModalOpen(false);
      setError("");
      // Optionally show a success toast
      // toast.success('Profile reset successfully!');
    } catch (error) {
      console.error("Error resetting user data in localStorage:", error);
      setError("Failed to reset profile.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    navigate("/");
  };

  // Placeholder for songs (e.g., liked songs or playlist)
  const userSongs = [
    { id: 1, title: "Song One", artist: "Artist A", duration: "3:45" },
    { id: 2, title: "Song Two", artist: "Artist B", duration: "4:12" },
    { id: 3, title: "Song Three", artist: "Artist C", duration: "2:58" },
  ];

  return (
    <div className="min-h-screen  text-white relative overflow-hidden">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 " style={{ zIndex: -1 }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.1),_transparent)]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc/90 backdrop-blur-xl border-b border-zinc-700/50">
        <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            User Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="p-2 sm:p-3 rounded-full bg-zinc-800/70 hover:bg-zinc-600/80 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            aria-label="Log out"
          >
            <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-4 md:py-6">
        {/* User Info Card */}
        <div className=" bg-zinc/90  rounded-xl p-2 sm:p-6 md:p-8 border border-zinc-700/30  ">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-zinc-200">
              About You
            </h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <p className="text-zinc-200 text-sm sm:text-base">
              <span className="font-medium text-zinc-300">Welcome, </span>
              {updatedUserData.username || "Guest"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-zinc-400 text-sm">User ID</p>
                <p className="text-white font-medium text-sm sm:text-base">
                  {updatedUserData.userId || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white font-medium text-sm sm:text-base">
                  {updatedUserData.email || "N/A"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-zinc-600 to-zinc-500 text-white rounded-md hover:from-zinc-500 hover:to-zinc-400 transition-all duration-300 text-sm sm:text-base font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
              aria-label="Edit profile"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Songs Section */}
      </main>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-zinc/60 flex items-center justify-center z-[100] p-3">
          <div className="bg-zinc-800 rounded-xl p-4 sm:p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
              Edit Profile
            </h3>
            {error && <p className="text-zinc-500 text-sm mb-4">{error}</p>}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  value={updatedUserData.username || ""}
                  onChange={(e) =>
                    setUpdatedUserData({
                      ...updatedUserData,
                      username: e.target.value,
                    })
                  }
                  className="w-full bg-zinc-700 text-white rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={updatedUserData.email || ""}
                  onChange={(e) =>
                    setUpdatedUserData({
                      ...updatedUserData,
                      email: e.target.value,
                    })
                  }
                  className="w-full bg-zinc-700 text-white rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  User ID
                </label>
                <input
                  type="text"
                  value={updatedUserData.userId || ""}
                  onChange={(e) =>
                    setUpdatedUserData({
                      ...updatedUserData,
                      userId: e.target.value,
                    })
                  }
                  className="w-full bg-zinc-700 text-white rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all"
                  required
                  aria-required="true"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setError("");
                }}
                className="px-4 py-2 bg-zinc-700 text-zinc-300 rounded-md hover:bg-zinc-600 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-zinc-500"
                aria-label="Cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleResetProfile}
                className="px-4 py-2 bg-zinc-600 text-white rounded-md hover:bg-zinc-500 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-zinc-500"
                aria-label="Reset profile"
              >
                Reset Profile
              </button>
              <button
                onClick={handleEditUser}
                className="px-4 py-2 bg-zinc-600 text-white rounded-md hover:bg-zinc-500 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-zinc-500"
                aria-label="Save profile"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
