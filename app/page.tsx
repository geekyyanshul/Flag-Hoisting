import { Background } from "@/components/Background";
import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/Hero";
import { MusicPlayer } from "@/components/MusicPlayer";
import { AudioProvider } from "@/components/AudioProvider";

export default function Home() {
  return (
    <AudioProvider>
      <main className="relative w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
        <Background />
        <TopBar />
        <Hero />
        <MusicPlayer />
      </main>
    </AudioProvider>
  );
}
