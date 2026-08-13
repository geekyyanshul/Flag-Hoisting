"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/components/AudioProvider";

export function Hero() {
  const { isHoisted, startHoisting } = useAudio();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center z-10 space-y-4 sm:space-y-6 px-4"
    >
      <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-wider drop-shadow-lg">
        VENKAT NIWAS
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow">
        Celebrate India's Independence Together
      </p>

      <AnimatePresence>
        {!isHoisted && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              boxShadow: [
                "0px 0px 0px rgba(255,255,255,0)",
                "0px 0px 20px rgba(255,255,255,0.2)",
                "0px 0px 0px rgba(255,255,255,0)",
              ],
              transition: {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }
            }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)", transition: { duration: 0.3 } }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.95 }}
            onClick={startHoisting}
            className="mt-8 px-8 py-4 bg-white/90 backdrop-blur-md text-black rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/20"
          >
            Start Hoisting
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
