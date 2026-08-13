"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";
import { useAudio } from "@/components/AudioProvider";

export function MusicPlayer() {
  const { isPlaying, progress, currentTime, duration, togglePlay, isHoisted } = useAudio();

  return (
    <AnimatePresence>
      {isHoisted && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-[560px] z-20"
        >
          <div 
            className="backdrop-blur-xl border rounded-full p-3 pr-6 flex items-center gap-4 shadow-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderColor: 'rgba(255, 255, 255, 0.15)',
            }}
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-white/10">
              <Image
                src="/background.webp"
                alt="Album Art"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-grow min-w-0 flex flex-col justify-center">
              <h3 className="text-white font-semibold text-sm truncate">
                Jana Gana Mana
              </h3>
              <p className="text-white/60 text-xs truncate">Rabindranath Tagore</p>
            </div>

            <div className="flex items-center gap-4 text-white">
              <button className="hover:text-white/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full" aria-label="Previous">
                <SkipBack size={20} />
              </button>
              
              <button
                onClick={togglePlay}
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={20} className="fill-black" /> : <Play size={20} className="fill-black ml-1" />}
              </button>
              
              <button className="hover:text-white/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full" aria-label="Next">
                <SkipForward size={20} />
              </button>
            </div>

            <div className="hidden md:flex items-center gap-3 w-32">
              <span className="text-[10px] text-white/60 tabular-nums">{currentTime}</span>
              <div className="flex-grow h-1 bg-white/20 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                <div 
                  className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] text-white/60 tabular-nums">{duration}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
