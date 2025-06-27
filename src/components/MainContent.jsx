//
import React, { useEffect, useRef, useState } from "react";
import { useGetTopChartsQuery } from "../services/ShazamCore";
import TrackCard from "./TrackCard";
import TrackRow from "./TrackRow";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { gsap } from "gsap";
import { Plus } from "lucide-react";
import Loading from "./Loading";
import PlaylistSkeleton from "../skeletons/PlayListSkeleton";
import FeaturedGridSkeleton from "../skeletons/Cardskeleton";

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
  const { recentlyPlayed } = useTypedSelector((state) => state.playlist);
  const bannerRef = useRef(null);
  const contentRef = useRef(null);
  const [recentlyPlayedLimit, setRecentlyPlayedLimit] = useState(3);
  const [madeForYouLimit, setMadeForYouLimit] = useState(5);
  const [featuredTracksLimit, setFeaturedTracksLimit] = useState(3);

  const { data, isLoading, error } = useGetTopChartsQuery({
    countryCode: "IN",
    page: 1,
    pageSize: 20,
  });

  if (isLoading) console.log("Loading top charts...", data);
  if (error) console.error("Error loading top charts:", error);

  const featuredTracks = data ? data.map(convertAppleMusicTrack) : [];

  useEffect(() => {
    gsap.to(bannerRef.current, {
      backgroundPositionX: "100%",
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine",
    });

    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0,
        ease: "sine",
        stagger: 0.2,
      }
    );

    const trackCards = document.querySelectorAll(".track-card");
    trackCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.05,
          boxShadow: "0 8px 24px rgba(255, 255, 255, 0.2)",
          duration: 0.3,
          ease: "sine.inOut",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          duration: 0.3,
          ease: "sine.inOut",
        });
      });
    });
  }, [
    featuredTracks,
    recentlyPlayed,
    recentlyPlayedLimit,
    madeForYouLimit,
    featuredTracksLimit,
  ]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleLoadMoreRecentlyPlayed = () => {
    setRecentlyPlayedLimit((prev) => prev + 3);
  };

  const handleLoadMoreMadeForYou = () => {
    setMadeForYouLimit((prev) => prev + 5);
  };

  const handleLoadMoreFeaturedTracks = () => {
    setFeaturedTracksLimit((prev) => prev + 6);
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-950 to-black text-white p-8 overflow-y-auto min-h-screen">
      <div ref={contentRef}>
        <div
          ref={bannerRef}
          className="relative mb-8 p-8 rounded-2xl bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
            backgroundSize: "100px 100px",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold text-white mb-2">
              {getGreeting()}
            </h1>
            <p className="text-gray-200 text-lg">
              Discover new music with Musicify
            </p>
          </div>
        </div>

        {recentlyPlayed.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Recently Played
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {recentlyPlayed.slice(0, recentlyPlayedLimit).map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  playlist={recentlyPlayed}
                  className="track-card bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-700"
                />
              ))}
            </div>
            {recentlyPlayedLimit < recentlyPlayed.length && (
              <button
                onClick={handleLoadMoreRecentlyPlayed}
                className="mt-6 flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-green-500/10"
              >
                <Plus className="w-5 h-5" />
                More
              </button>
            )}
          </section>
        )}

        {/* {!isLoading && featuredTracks.length > 5 && (
          <section className="mb-12">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Made for You
              </h2>
              {madeForYouLimit < featuredTracks.length && (
                <button
                  onClick={handleLoadMoreMadeForYou}
                  className="flex items-center  text-green-500 hover:text-green-400 transition-colors font-medium px-4  rounded-lg hover:bg-green-500/10"
                >
                  <Plus className="w-5 h-5" />
                  More
                </button>
              )}
            </div>


            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {featuredTracks.slice(0, madeForYouLimit).map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  playlist={featuredTracks}
                  className="track-card bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-700"
                />
              ))}
            </div>
          </section>
        )} */}

        <section className="mb-12">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Made for You
            </h2>
            {madeForYouLimit < featuredTracks.length && !isLoading && (
              <button
                onClick={handleLoadMoreMadeForYou}
                className="flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-green-500/10"
              >
                <Plus className="w-5 h-5" />
                More
              </button>
            )}
          </div>
          {isLoading ? (
            <div className="py-2">
              <FeaturedGridSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {featuredTracks.slice(0, madeForYouLimit).map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  playlist={featuredTracks}
                  className="track-card bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-700"
                />
              ))}
            </div>
          )}
        </section>
        <section className="mb-12 mt-12">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Featured Tracks
            </h2>
            {featuredTracksLimit < featuredTracks.length && (
              <button
                onClick={handleLoadMoreFeaturedTracks}
                className=" flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors font-medium px-4  rounded-lg hover:bg-green-500/10"
              >
                <Plus className="w-5 h-5" />
                More
              </button>
            )}
          </div>
          {isLoading ? (
            <div className=" w-full h-full ">
              <PlaylistSkeleton />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {featuredTracks
                  .slice(0, featuredTracksLimit)
                  .map((track, index) => (
                    <TrackRow
                      key={track.id}
                      track={track}
                      index={index}
                      playlist={featuredTracks}
                      className="track-card bg-gray-900/80 backdrop-blur-md rounded-lg shadow-md border border-gray-700"
                    />
                  ))}
              </div>
            </>
          )}
        </section>

        <div className="mb-44"></div>
      </div>
    </div>
  );
};

export default MainContent;
