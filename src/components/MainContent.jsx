import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
// import { useGetTopChartsQuery } from "../services/ShazamCore";
import TrackCard from "./TrackCard";
import TrackRow from "./TrackRow";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { gsap } from "gsap";
import Loading from "./Loading";
import PlaylistSkeleton from "../skeletons/PlayListSkeleton";
import FeaturedGridSkeleton from "../skeletons/Cardskeleton";
import { data } from "./FakeData";
import { setCurrentTrack, setIsPlaying } from "../store/slices/playerSlice";
import { Briefcase, ChevronLeft, ChevronRight, Linkedin } from "lucide-react";
// import { Link } from "react-router-dom";
const convertAppleMusicTrack = (track) => ({
  key: track.id,
  id: track.id,
  title: track.attributes.name,
  artist: {
    name: track.attributes.artistName || "Unknown Artist",
    id: track.relationships?.artists?.data?.[0]?.id || "",
    picture_small:
      track.attributes.artwork?.url.replace(/440x440bb\.jpg$/, "64x64bb.jpg") ||
      "https://via.placeholder.com/64x64",
  },
  album: {
    id: track.id,
    title: track.attributes.albumName,
    cover_small:
      track.attributes.artwork?.url.replace(/440x440bb\.jpg$/, "64x64bb.jpg") ||
      "https://via.placeholder.com/64x64",
    cover_medium:
      track.attributes.artwork?.url || "https://via.placeholder.com/300x300",
  },
  preview: track.attributes.previews?.[0]?.url || "",
  duration: Math.floor(track.attributes.durationInMillis / 1000) || 0,
  explicit: track.attributes.contentRating === "explicit",
  genres: track.attributes.genreNames || [],
  releaseDate: track.attributes.releaseDate || "",
  isrc: track.attributes.isrc || "",
});

const MainContent = () => {
  const dispatch = useDispatch();
  const { recentlyPlayed } = useTypedSelector((state) => state.playlist);
  const bannerRef = useRef(null);
  const contentRef = useRef(null);
  const madeForYouSelectRef = useRef(null);
  const [recentlyPlayedLimit, setRecentlyPlayedLimit] = useState(3);
  const [madeForYouPage, setMadeForYouPage] = useState(1);
  const [featuredTracksPage, setFeaturedTracksPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [visibleGenresLimit, setVisibleGenresLimit] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    username: localStorage.getItem("username") || "Guest",
    email: localStorage.getItem("email") || "",
    userId: localStorage.getItem("userId") || "",
  });
  const madeForYouPerPage = 10;
  const featuredTracksPerPage = 20;
  const error = false;
  // const isLoading = false;
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // if (isLoading) console.log("Loading top charts...", data);
  if (error) console.error("Error loading top charts:", error);

  const featuredTracks = data ? data.map(convertAppleMusicTrack) : [];
  const genres = [
    "All",
    ...new Set(featuredTracks.flatMap((track) => track.genres)),
  ];
  const visibleGenres = genres.slice(0, visibleGenresLimit + 1);
  const filteredTracks =
    selectedGenre === "All"
      ? featuredTracks
      : featuredTracks.filter((track) => track.genres.includes(selectedGenre));
  const madeForYouTotalPages = Math.ceil(
    filteredTracks.length / madeForYouPerPage
  );
  const featuredTracksTotalPages = Math.ceil(
    filteredTracks.length / featuredTracksPerPage
  );
  const madeForYouTracks = filteredTracks.slice(
    (madeForYouPage - 1) * madeForYouPerPage,
    madeForYouPage * madeForYouPerPage
  );
  const featuredTracksPaginated = filteredTracks.slice(
    (featuredTracksPage - 1) * featuredTracksPerPage,
    featuredTracksPage * featuredTracksPerPage
  );

  const generatePageRange = (currentPage, totalPages) => {
    const delta = 5;
    const range = [];
    const rangeWithDots = [];

    range.push(1);
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    if (totalPages > 1 && !range.includes(totalPages)) {
      range.push(totalPages);
    }
    let prevPage = 0;
    for (const page of range) {
      if (page - prevPage > 1) {
        rangeWithDots.push("...");
      }
      rangeWithDots.push(page);
      prevPage = page;
    }
    return rangeWithDots;
  };

  // localStorage Items
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      generateUser();
    }
    // Update userData state when localStorage changes
    setUserData({
      username: localStorage.getItem("username") || "Guest",
      email: localStorage.getItem("email") || "",
      userId: localStorage.getItem("userId") || "",
    });
  }, []);

  const generateUser = () => {
    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getRandomElement(array) {
      return array[getRandomNumber(0, array.length - 1)];
    }
    const userId = getRandomNumber(1000, 9999);
    const adjectives = ["cool", "sunny", "dark", "silent", "bright", "wild"];
    const nouns = ["Shadow", "Tiger", "Duck", "Wolf", "Eagle", "Lion"];
    const username =
      getRandomElement(adjectives) +
      getRandomElement(nouns) +
      getRandomNumber(10, 99);
    const domains = ["example.com", "mail.com", "webmail.org"];
    const email = `${username.toLowerCase()}@${getRandomElement(domains)}`;
    const newUser = { userId, username, email };
    localStorage.setItem("email", email);
    localStorage.setItem("userId", userId.toString());
    localStorage.setItem("username", username);
    // console.log("newUsers", newUser);
    return newUser;
  };

  useLayoutEffect(() => {
    gsap.to(bannerRef.current, {
      backgroundPositionX: "100%",
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine",
    });
  }, []);
  // useEffect(() => {
  //   // gsap.fromTo(
  //   //   contentRef.current.children,
  //   //   { opacity: 0, y: 50 },
  //   //   {
  //   //     opacity: 1,
  //   //     y: 0,
  //   //     scale: 1,
  //   //     duration: 0,
  //   //     ease: "sine",
  //   //     stagger: 0.2,
  //   //   }
  //   // );
  //   // const trackCards = document.querySelectorAll(".track-card");
  //   // trackCards.forEach((card) => {
  //   //   // card.addEventListener("mouseenter", () => {
  //   //   //   gsap.to(card, {
  //   //   //     // scale: 1.05,
  //   //   //     // boxShadow: "0 8px 24px rgba(255, 255, 255, 0.2)",
  //   //   //     // duration: 0.3,
  //   //   //     // ease: "sine.inOut",
  //   //   //   });
  //   //   // });
  //   //   // card.addEventListener("mouseleave", () => {
  //   //   //   gsap.to(card, {
  //   //   //     scale: 1,
  //   //   //     // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  //   //   //     // duration: 0.3,
  //   //   //     ease: "sine.inOut",
  //   //   //   });
  //   //   });
  //   // });
  //   // Animate modal
  //   // if (isModalOpen) {
  //   //   gsap.fromTo(
  //   //     ".modal",
  //   //     { opacity: 0, scale: 0.8 },
  //   //     { opacity: 1, scale: 1, duration: 0.3, ease: "sine.inOut" }
  //   //   );
  //   // }
  // }, [featuredTracks, recentlyPlayed, recentlyPlayedLimit, isModalOpen]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleMadeForYouPageChange = (page) => {
    if (page >= 1 && page <= madeForYouTotalPages) {
      setMadeForYouPage(page);
      // console.log("Made for You page changed to:", page);
    }
  };

  const handleFeaturedTracksPageChange = (page) => {
    if (page >= 1 && page <= featuredTracksTotalPages) {
      setFeaturedTracksPage(page);
      // console.log("Featured Tracks page changed to:", page);
    }
  };

  const handleTrackSelect = (track) => {
    // console.log("Selected track:", track);
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlaying(true));
  };

  const handleGenreChange = (value) => {
    if (value === "Show More") {
      const newLimit = Math.min(visibleGenresLimit + 5, genres.length - 1);
      setVisibleGenresLimit(newLimit);
      // console.log("Show More genres, new limit:", newLimit);
      if (!visibleGenres.includes(selectedGenre)) {
        setSelectedGenre("All");
        setMadeForYouPage(1);
        setFeaturedTracksPage(1);
        // console.log("Reset to All due to genre limit change");
      }
      if (madeForYouSelectRef.current) {
        madeForYouSelectRef.current.blur();
        // console.log("Dropdown closed after Show More");
      }
    } else {
      setSelectedGenre(value);
      setMadeForYouPage(1);
      setFeaturedTracksPage(1);
      // console.log("Selected genre:", value);
    }
  };

  const handleEditUser = () => {
    const { username, email, userId } = userData;
    if (!username.trim()) {
      alert("Username cannot be empty");
      return;
    }
    if (!/.+@.+\..+/.test(email)) {
      alert("Please enter a valid email");
      return;
    }
    if (!/^\d{4}$/.test(userId)) {
      alert("User ID must be a 4-digit number");
      return;
    }
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("userId", userId);
    setIsModalOpen(false);
    // console.log("User data updated:", { username, email, userId });
  };

  const handleResetProfile = () => {
    const newUser = generateUser();
    setUserData(newUser);
    setIsModalOpen(false);
    // console.log("Profile reset:", newUser);
  };

  return (
    <div className="flex-1  text-white p-8 overflow-y-auto min-h-screen">
      <div ref={contentRef}>
        {/* <div
          ref={bannerRef}
          className="relative mb-6 p-6 rounded-2xl  overflow"
          style={{
            backgroundImage:
              "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
            backgroundSize: "100px 100px",
          }}
        >
          <div className="absolute inset-0 "></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold text-white mb-2">
              {getGreeting()}
            </h1>
            <p className="text-gray-200 text-lg">
              Discover new music with Musicify
            </p>
          </div>
        </div> */}
        <div
          ref={bannerRef}
          className="relative mb-8 p-6 rounded-2xl  overflow"
          style={{
            backgroundImage:
              "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
            backgroundSize: "100px 100px",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/20 to-zinc-900/20 blur-xl" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2">
                {getGreeting()}
              </h1>
              <p className="text-gray-200 text-sm sm:text-base md:text-lg">
                Discover new music with Musicify
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="https://www.abhaybansal.in" target="_blank">
                <div
                  className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2  bg-gradient-to-r from-zinc-800 to-zinc-900 text-gray-300 hover:bg-gray-700 hover:text-white border-zinc-800 rounded-md hover:from-zinc-800 hover:to-zinc-900 transition-all duration-300 text-sm sm:text-base font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-500 z-99"
                  aria-label="View portfolio"
                >
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Portfolio</span>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/bansalabhay" target="_blank">
                <button
                  className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2  bg-gradient-to-r from-zinc-800 to-gray-900 text-gray-300 hover:bg-gray-900 hover:text-white border-gray-700 rounded-md hover:from-zinc-900 hover:to-zinc-900 transition-all duration-300 text-sm sm:text-base font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-500 z-99"
                  aria-label="Visit LinkedIn profile"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>LinkedIn</span>
                </button>
              </a>
            </div>
          </div>
        </div>
        {/* {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-90 ">
            <div className="modal bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4">
                Edit Profile
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Username
                  </label>
                  <input
                    type="text"
                    value={userData.username}
                    onChange={(e) =>
                      setUserData({ ...userData, username: e.target.value })
                    }
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    User ID
                  </label>
                  <input
                    type="text"
                    value={userData.userId}
                    onChange={(e) =>
                      setUserData({ ...userData, userId: e.target.value })
                    }
                    className="w-full bg-gray-700 text-white rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetProfile}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors text-sm font-medium"
                >
                  Reset Profile
                </button>
                <button
                  onClick={handleEditUser}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors text-sm font-medium"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )} */}

        <section className="mb-12">
          <div className="flex justify-between items-center mb-5">
            <h2 className="mb-2 text-2xl sm:text-3xl font-bold text-white">
              Made for You
            </h2>
          </div>
          <div className="mb-5">
            <select
              ref={madeForYouSelectRef}
              value={selectedGenre}
              onChange={(e) => handleGenreChange(e.target.value)}
              className="w-full sm:w-64 bg-zinc-900 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            >
              {visibleGenres.map((genre) => (
                <option
                  key={genre}
                  value={genre}
                  className="bg-zinc-600 hover:bg-zinc-700 focus:bg-zinc-700 focus:outline-none"
                >
                  {genre}
                </option>
              ))}
              {visibleGenres.length < genres.length && (
                <option value="Show More">Show More</option>
              )}
            </select>
          </div>
          {isLoading ? (
            <div className="py-2">
              <FeaturedGridSkeleton />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 overflow-visible ">
                {madeForYouTracks.length > 0 ? (
                  madeForYouTracks.map((track) => (
                    <div
                      key={track.id}
                      // onClick={() => handleTrackSelect(track)}
                      className="group bg-gray-900/80 rounded-xl overflow-visible shadow-lg hover:shadow-xl transition-shadow cursor-pointer relative  "
                    >
                      <TrackCard
                        track={track}
                        playlist={filteredTracks}
                        className=" bg-zinc-900 backdrop-blur-md rounded-xl p-3"
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 col-span-5 text-center">
                    No tracks available for {selectedGenre}
                  </p>
                )}
              </div>
              {madeForYouTotalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 mt-8 mb-3">
                  {/* Previous Button - optimized for mobile */}
                  <button
                    onClick={() =>
                      handleMadeForYouPageChange(madeForYouPage - 1)
                    }
                    disabled={madeForYouPage === 1}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gradient-to-r from-zinc-900 to-gray-500 rounded-md disabled:opacity-50 hover:bg-gradient-to-r hover:from-zinc-500 hover:to-gray-900 text-xs sm:text-sm font-medium transition-colors "
                  >
                    ← Previous
                  </button>

                  {/* Page Numbers - enhanced mobile experience */}
                  <div className="relative w-full sm:w-auto">
                    <div className="overflow-x-auto py-1 hide-scrollbar">
                      <div className="flex gap-1 justify-center min-w-max px-2 sm:px-0">
                        {generatePageRange(
                          madeForYouPage,
                          madeForYouTotalPages
                        ).map((page, index) =>
                          page === "..." ? (
                            <span
                              key={`ellipsis-${index}`}
                              className="px-2 py-1 text-xs sm:text-sm text-gray-400 flex items-center"
                            >
                              •••
                            </span>
                          ) : (
                            <button
                              key={page}
                              onClick={() => handleMadeForYouPageChange(page)}
                              className={`min-w-[2rem] sm:min-w-[2.5rem] px-2 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors  z-50 ${
                                madeForYouPage === page
                                  ? "bg-gradient-to-r from-gray-100 to-zinc-400 text-black"
                                  : "bg-gradient-to-r from-zinc-800 to-gray-900 text-gray-300 hover:bg-gray-600"
                              }`}
                              aria-current={
                                madeForYouPage === page ? "page" : undefined
                              }
                            >
                              {page}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                    {/* Gradient fade indicators for scrollable content */}
                    <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-zinc-800 to-gray-900 pointer-events-none sm:hidden"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none sm:hidden"></div>
                  </div>

                  {/* Next Button - optimized for mobile */}
                  <button
                    onClick={() =>
                      handleMadeForYouPageChange(madeForYouPage + 1)
                    }
                    disabled={madeForYouPage === madeForYouTotalPages}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gradient-to-r from-zinc-900 to-gray-500 rounded-md disabled:opacity-50 hover:bg-gradient-to-r hover:from-zinc-500 hover:to-gray-900 text-xs sm:text-sm font-medium transition-colors z-20"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <section className="mb-12 mt-12  ">
          <div className="flex justify-between items-center mb-4 ">
            <h2 className="text-2xl sm:text-3xl font-bold text-white ">
              Featured Tracks
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 mb-4 w-full">
            {genres.slice(0, 3).map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreChange(genre)}
                className={`
        px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap z-40
        flex-1 min-w-[10%] sm:min-w-0 lg:max-w-[10%]
        ${
          selectedGenre === genre
            ? "bg-gradient-to-r from-gray-100 to-zinc-400 text-black"
            : "bg-gradient-to-r from-zinc-800 to-gray-900 text-gray-300 hover:bg-gray-300"
        }
      `}
              >
                {genre}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="w-full h-full">
              <PlaylistSkeleton />
            </div>
          ) : (
            <>
              <div className="space-y-2 relative z-50">
                {featuredTracksPaginated.length > 0 ? (
                  featuredTracksPaginated.map((track, index) => (
                    <div
                      key={track.id}
                      onClick={() => handleTrackSelect(track)}
                      className="cursor-pointer  "
                    >
                      <TrackRow
                        track={track}
                        index={index}
                        playlist={filteredTracks}
                        className="track-card bg-zinc-900/80 backdrop-blur-md rounded-lg shadow-md border border-gray-700 "
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center">
                    No tracks available for {selectedGenre}
                  </p>
                )}
              </div>
              {featuredTracksTotalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6 w-full z-50">
                  <button
                    onClick={() =>
                      handleFeaturedTracksPageChange(featuredTracksPage - 1)
                    }
                    disabled={featuredTracksPage === 1}
                    className="w-full sm:w-auto px-3 py-2 sm:px-4 bg-gradient-to-r from-zinc-900 to-gray-500 rounded-md disabled:opacity-50 hover:bg-gradient-to-r hover:from-zinc-500 hover:to-gray-900 text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1 z-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  {/* Page Numbers - scrollable on mobile */}
                  <div className="w-full sm:w-auto overflow-x-auto py-1 hide-scrollbar relative z-50">
                    {/* Scroll indicators for mobile */}
                    <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-zinc-900 to-transparent pointer-events-none sm:hidden z-50"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-zinc-900 to-transparent pointer-events-none sm:hidden z-50"></div>

                    <div className="flex gap-1 justify-center min-w-max px-6 sm:px-0">
                      {generatePageRange(
                        featuredTracksPage,
                        featuredTracksTotalPages
                      ).map((page, index) =>
                        page === "..." ? (
                          <span
                            key={`ellipsis-${index}`}
                            className="px-2 py-1 text-xs sm:text-sm text-gray-400 flex items-center"
                          >
                            •••
                          </span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => handleFeaturedTracksPageChange(page)}
                            className={`min-w-[2.25rem] px-2 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                              featuredTracksPage === page
                                ? "bg-gradient-to-r from-gray-100 to-zinc-400 text-black"
                                : "bg-gradient-to-r from-zinc-800 to-gray-900 text-gray-300 hover:bg-gray-600"
                            } z-50`}
                            aria-current={
                              featuredTracksPage === page ? "page" : undefined
                            }
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Next Button - full width on mobile */}
                  <button
                    onClick={() =>
                      handleFeaturedTracksPageChange(featuredTracksPage + 1)
                    }
                    disabled={featuredTracksPage === featuredTracksTotalPages}
                    className="w-full sm:w-auto px-3 py-2 sm:px-4 bg-gradient-to-r from-zinc-900 to-gray-500 rounded-md disabled:opacity-50 hover:bg-gradient-to-r hover:from-zinc-500 hover:to-gray-900 text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1 z-50"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <div className="mb-44"></div>
      </div>
      <style>
        {`
          @keyframes fade-in-out {
            0% { opacity: 0; transform: translate(-50%, 10px); }
            10% { opacity: 1; transform: translate(-50%, 0); }
            90% { opacity: 1; transform: translate(-50%, 0); }
            100% { opacity: 0; transform: translate(-50%, 10px); }
          }
          .animate-fade-in-out {
            animation: fade-in-out 3s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default MainContent;
