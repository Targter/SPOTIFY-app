import React, { useEffect, useRef } from "react";
import { Disc2 } from "lucide-react";
import { gsap } from "gsap";

const Loading = () => {
  const containerRef = useRef(null);
  const barRefs = useRef([]);
  const vinylRef = useRef(null);

  useEffect(() => {
    // Fade in container
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    // Animate equalizer bars
    barRefs.current.forEach((bar, index) => {
      gsap.to(bar, {
        scaleY: gsap.utils.random(0.3, 1.5),
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1, // Staggered animation
      });
    });

    // Rotate vinyl
    gsap.to(vinylRef.current, {
      rotation: 360,
      duration: 4,
      repeat: -1,
      ease: "none",
    });

    // Cleanup on unmount
    return () => {
      gsap.killTweensOf([
        containerRef.current,
        barRefs.current,
        vinylRef.current,
      ]);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-b from-gray-950 to-black backdrop-blur-md flex items-center justify-center z-50"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Vinyl Record */}
        <div
          ref={vinylRef}
          className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center"
        >
          <Disc2 className="w-full h-full text-white-500/50" />
          <div className="absolute w-6 h-6 sm:w-8 sm:h-8 bg-gray-800 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-700 rounded-full"></div>
          </div>
        </div>

        {/* Equalizer Bars */}
        <div className="flex items-end gap-1.5 sm:gap-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              ref={(el) => (barRefs.current[index] = el)}
              className="w-2 h-12 sm:w-3 sm:h-16 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"
              style={{ transformOrigin: "bottom" }}
            ></div>
          ))}
        </div>

        {/* Loading Text */}
        <p className="text-green-400 text-sm sm:text-base font-medium animate-pulse">
          Loading Musicify...
        </p>
      </div>
    </div>
  );
};

export default Loading;
