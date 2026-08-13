"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function TopBar() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 text-white/90 text-sm font-medium w-full"
    >
      <div className="w-32 hidden sm:block">{time}</div>
      <div className="flex items-center gap-2 mx-auto sm:mx-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-2.5 h-2.5 bg-green-500 rounded-full"
          aria-hidden="true"
        />
        <span>16 online</span>
      </div>
      <div className="flex gap-4 sm:gap-6 w-32 justify-end">
        <a href="#" className="hover:text-white transition-colors" aria-label="Spotify">
          Spotify ↗
        </a>
        <a href="#" className="hover:text-white transition-colors" aria-label="YouTube Music">
          YT Music ↗
        </a>
      </div>
    </motion.header>
  );
}
