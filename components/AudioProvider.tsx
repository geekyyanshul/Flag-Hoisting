"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { formatTime } from "@/lib/audio";

type AudioContextType = {
  isPlaying: boolean;
  progress: number;
  currentTime: string;
  duration: string;
  togglePlay: () => void;
  startHoisting: () => void;
  isHoisted: boolean;
};

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isHoisted, setIsHoisted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/anthem.mp3");
    
    const setAudioData = () => {
      const dur = audioRef.current?.duration || 0;
      setDuration(formatTime(dur));
    };

    const updateTime = () => {
      const curr = audioRef.current?.currentTime || 0;
      const dur = audioRef.current?.duration || 1;
      setCurrentTime(formatTime(curr));
      setProgress((curr / dur) * 100);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime("0:00");
      setIsHoisted(false);
    };

    audioRef.current.addEventListener("loadeddata", setAudioData);
    audioRef.current.addEventListener("timeupdate", updateTime);
    audioRef.current.addEventListener("ended", onEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("loadeddata", setAudioData);
        audioRef.current.removeEventListener("timeupdate", updateTime);
        audioRef.current.removeEventListener("ended", onEnded);
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const startHoisting = () => {
    setIsHoisted(true);
    if (!isPlaying) {
      audioRef.current?.play().then(() => {
        setIsPlaying(true);
      }).catch(e => console.error("Audio play failed:", e));
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, progress, currentTime, duration, togglePlay, startHoisting, isHoisted }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
}
