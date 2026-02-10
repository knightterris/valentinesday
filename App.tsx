// @ts-nocheck

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FallingHearts from "./components/FallingHearts";
import { Page, Movie, Song } from "./types";
import { VALENTINE_SONG_URL, MOVIES, SONGS } from "./constants";
import {
  sendNotification,
  getBatchMovieRecommendations,
} from "./services/geminiService";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LANDING);
  const [isStarted, setIsStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startExperience = () => {
    setIsStarted(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn("Audio autoplay blocked", error);
            const retry = () => {
              audioRef.current?.play();
              window.removeEventListener("click", retry);
            };
            window.addEventListener("click", retry);
          });
        }
      }
    }, 50);
  };

  const handleTakeMeThere = () => {
    sendNotification("Thu Thu", "She clicked 'Take me there'! ❤️").catch(
      console.error,
    );
    setCurrentPage(Page.MOVIES);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToMusic = () => {
    sendNotification("Thu Thu", "She is exploring the Music List! 🎵").catch(
      console.error,
    );
    setCurrentPage(Page.MUSIC);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToProposal = () => {
    sendNotification("Thu Thu", "She reached the final proposal! 💍").catch(
      console.error,
    );
    setCurrentPage(Page.PROPOSAL);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderContent = () => {
    switch (currentPage) {
      case Page.LANDING:
        return <LandingPage onTakeMeThere={handleTakeMeThere} />;
      case Page.MOVIES:
        return (
          <MoviesPage
            onBack={() => setCurrentPage(Page.LANDING)}
            onNext={handleGoToMusic}
          />
        );
      case Page.MUSIC:
        return (
          <MusicPage
            onBack={() => setCurrentPage(Page.MOVIES)}
            onNext={handleGoToProposal}
          />
        );
      case Page.PROPOSAL:
        return <ProposalPage />;
      default:
        return <LandingPage onTakeMeThere={handleTakeMeThere} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-pink-50 selection:bg-rose-200 overflow-x-hidden">
      <audio ref={audioRef} src={VALENTINE_SONG_URL} loop preload="auto" />

      <AnimatePresence mode="wait">
        {!isStarted ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-pink-100 flex flex-col items-center justify-center z-[100] p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl border-4 border-white max-w-md relative"
            >
              <div className="mb-8 text-rose-500">
                <svg
                  className="w-24 h-24 mx-auto animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h1 className="text-4xl font-cursive text-pink-600 mb-4">
                A gift for Thu Thu
              </h1>
              {/* <p className="text-gray-500 mb-10 font-medium">Click to enter our special world.</p> */}

              <button
                onClick={startExperience}
                className="px-12 py-5 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-2xl font-bold shadow-lg transform transition active:scale-95 flex items-center justify-center gap-3 mx-auto w-full"
              >
                <span>Open Gift</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <FallingHearts />
            {renderContent()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LandingPage: React.FC<{ onTakeMeThere: () => void }> = ({
  onTakeMeThere,
}) => {
  return (
    <div className="relative">
      <section
        className="h-screen flex items-center justify-center overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center z-10 px-6"
        >
          <h1 className="text-6xl md:text-9xl font-cursive text-rose-600 drop-shadow-2xl mb-8">
            Happy Valentine's Day,
          </h1>
          <h2 className="text-7xl md:text-[10rem] font-cursive text-pink-500 drop-shadow-xl">
            Thu Thu
          </h2>
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-28 flex flex-col items-center gap-4 text-rose-300"
          >
            <div className="p-3 bg-white/40 rounded-full backdrop-blur-sm">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
            <p className="text-xs font-black uppercase tracking-[0.3em]">
              Scroll for surprises
            </p>
          </motion.div>
        </motion.div>
      </section>

      <section
        className="min-h-screen flex items-center justify-center p-6 md:p-20 overflow-hidden"
        style={{ perspective: "1500px" }}
      >
        <motion.div
          initial={{ opacity: 0, rotateX: 25, y: 100 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ amount: 0.3 }}
          className="bg-white/90 backdrop-blur-xl p-8 md:p-20 rounded-[4rem] shadow-2xl border-2 border-white flex flex-col md:flex-row items-center gap-16 max-w-6xl z-10 relative"
          style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
        >
          <div className="flex-1 space-y-10 text-center md:text-left">
            <h3 className="text-4xl md:text-7xl font-cursive text-rose-500 italic">
              "You can’t blame gravity for falling in love."
            </h3>
            {/* <p className="text-3xl text-rose-300 font-cursive">
              — Albert Einstein
            </p> */}
          </div>
          {/* <div className="flex-1 w-full">
            <motion.div className="rounded-[3rem] overflow-hidden shadow-3xl border-[12px] border-white transform-gpu transition-transform hover:scale-105 duration-700">
              <img
                src="https://images.unsplash.com/photo-1516589174184-c6858675e3ff?auto=format&fit=crop&q=80&w=800"
                className="w-full h-[400px] md:h-[550px] object-cover"
                alt="Love"
              />
            </motion.div>
          </div> */}
        </motion.div>
      </section>

      <section className="min-h-[60vh] flex items-center justify-center py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ amount: 0.5 }}
          className="max-w-4xl text-center"
        >
          <p className="text-3xl md:text-6xl font-cursive text-rose-600 leading-relaxed md:leading-snug drop-shadow-sm">
            "I don’t want to rush anything. I just wanted you to know that you
            matter to me."
          </p>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="mt-10 flex justify-center"
          >
            <div className="h-px w-24 bg-rose-200 self-center"></div>
            <div className="mx-4 text-rose-300">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="h-px w-24 bg-rose-200 self-center"></div>
          </motion.div>
        </motion.div>
      </section>

      <section className="min-h-[50vh] flex items-center justify-center py-20 px-6 bg-rose-50/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ amount: 0.5 }}
          className="max-w-5xl text-center p-8 md:p-16 border-y border-rose-100"
        >
          <h4 className="text-4xl md:text-7xl font-cursive text-pink-600 leading-relaxed md:leading-tight">
            "And I don’t know when it happened, but some things started
            reminding me of you."
          </h4>
          {/* <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="mt-8 text-rose-300 italic font-medium tracking-widest text-sm uppercase"
          >
            A soft whisper from the heart
          </motion.div> */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="mt-10 flex justify-center"
          >
            <div className="h-px w-24 bg-rose-200 self-center"></div>
            <div className="mx-4 text-rose-300">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="h-px w-24 bg-rose-200 self-center"></div>
          </motion.div>
        </motion.div>
      </section>

      <section
        className="min-h-screen flex items-center justify-center p-6"
        style={{ perspective: "2000px" }}
      >
        <motion.div
          initial={{ opacity: 0, rotateX: 20, y: 100 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 1 },
            rotateX: { duration: 1.2 },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="bg-gradient-to-br from-rose-100 to-white p-12 md:p-24 rounded-[5rem] shadow-2xl max-w-5xl text-center relative z-10 border-4 border-white overflow-hidden"
          style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
        >
          <p className="text-4xl md:text-6xl font-cursive text-rose-700 mb-20 leading-tight">
            "Let me take you to a few movies I always think of you whenever I
            watch them."
          </p>
          <div className="flex justify-center">
            <button
              onClick={onTakeMeThere}
              className="group px-14 py-6 rounded-full text-3xl font-bold shadow-xl transform transition bg-rose-500 hover:bg-rose-600 text-white hover:-translate-y-2 group inline-flex text-lg md:px-14 md:py-6 md:text-3xl rounded-full font-bold items-center gap-3 md:gap-5"
            >
              <span>Take me there</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <svg
                  className="w-10 h-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.span>
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

const MoviesPage: React.FC<{ onBack: () => void; onNext: () => void }> = ({
  onBack,
  onNext,
}) => {
  const [recommendations, setRecommendations] = useState<
    Record<string, string>
  >({});
  const [isLoading, setIsLoading] = useState(true);

  // const defaultMessages: Record<string, string> = {
  //   "About Time":
  //     "This story of ordinary time travel reminds me that every minute with you is an extraordinary gift.",
  //   "La La Land":
  //     "Just like this film, your presence fills my world with color and beautiful melodies.",
  //   "The Notebook":
  //     "A love that endures and defies the odds, just like how I feel about our connection.",
  //   "Pride & Prejudice":
  //     "Your soul and kindness have completely bewitched me, body and soul.",
  // };

  useEffect(() => {
    const fetchRecs = async () => {
      setIsLoading(true);
      const titles = MOVIES.map((m) => m.title);
      const recMap = await getBatchMovieRecommendations(titles);

      const finalRecs: Record<string, string> = {};
      MOVIES.forEach((movie) => {
        finalRecs[movie.title] = recMap[movie.title] || " ";
      });
      setRecommendations(finalRecs);
      setIsLoading(false);
    };
    fetchRecs();
  }, []);

  return (
    <div
      className="min-h-screen p-6 pt-32 max-w-7xl mx-auto relative z-10 pb-40"
      style={{ perspective: "2000px" }}
    >
      <button
        onClick={onBack}
        className="fixed top-8 left-8 p-5 bg-white/95 backdrop-blur rounded-full shadow-2xl hover:bg-rose-500 hover:text-white transition-all z-50 border-2 border-pink-100 flex items-center gap-3"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>

      <header className="text-center mb-32">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl md:text-9xl font-cursive text-rose-600 mb-8"
        >
          In these films
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl text-gray-400 font-cursive italic"
        >
          Every story reminds me of you, Thu Thu...
        </motion.p>
      </header>

      <div className="flex flex-col gap-24 md:gap-40">
        {MOVIES.map((movie, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={movie.title}
              initial={{
                opacity: 0,
                x: isEven ? -100 : 100,
                rotateY: isEven ? 10 : -10,
              }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              whileHover={{ scale: 1.02, rotateX: 2, rotateY: isEven ? 2 : -2 }}
              viewport={{ once: true, amount: 0.2 }}
              className={`flex flex-col md:flex-row ${isEven ? "md:flex-row" : "md:flex-row-reverse"} bg-white rounded-[4rem] overflow-hidden shadow-2xl border-[8px] md:border-[12px] border-white group transition-all duration-700 transform-gpu relative`}
              style={{
                transformStyle: "preserve-3d",
                WebkitMaskImage: "-webkit-radial-gradient(white, black)",
              }}
            >
              <div className="md:w-1/2 h-[450px] md:h-[650px] overflow-hidden relative">
                <img
                  src={movie.imageUrl}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={movie.title}
                  style={{ backfaceVisibility: "hidden" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/70 via-transparent to-transparent flex items-end p-12">
                  <div className="bg-rose-500/90 backdrop-blur px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] text-white">
                    {movie.year}
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-10 md:p-20 flex flex-col justify-center bg-white relative z-10">
                <h3
                  className="text-4xl md:text-7xl font-bold font-cursive text-rose-600 mb-6 leading-tight"
                  style={{ transform: "translateZ(50px)" }}
                >
                  {movie.title}
                </h3>

                <p
                  className="text-lg md:text-2xl text-gray-500 mb-8 leading-relaxed"
                  style={{ transform: "translateZ(40px)" }}
                >
                  {movie.description}
                </p>

                {/* <p
                  className="text-gray-600 mb-12 italic text-xl md:text-3xl font-cursive leading-relaxed"
                  style={{ transform: "translateZ(30px)" }}
                >
                  “{movie.quote}”
                </p> */}

                <div
                  className="mt-auto pt-10 border-t-2 border-rose-50"
                  style={{ transform: "translateZ(20px)" }}
                >
                  {/* <h4 className="text-rose-400 font-black mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em]">
                    ❤️ Cupid's Message
                  </h4> */}
                  <p className="text-gray-400 text-lg md:text-xl italic leading-relaxed">
                    {recommendations[movie.title] ||
                      (isLoading
                        ? "Thinking of the perfect words for you..."
                        : defaultMessages[movie.title])}
                  </p>
                  <p
                    className="text-gray-600 mb-12 italic text-xl md:text-3xl font-cursive leading-relaxed"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    “{movie.quote}”
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-48 text-center"
      >
        <button
          onClick={onNext}
          className="group relative px-16 py-8 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-3xl font-bold shadow-2xl transform transition hover:-translate-y-2 active:scale-95 flex items-center gap-4 mx-auto"
        >
          <span>Also some musics ❤️</span>
          <svg
            className="w-10 h-10 group-hover:translate-x-2 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </motion.div>
    </div>
  );
};

const MusicPage: React.FC<{ onBack: () => void; onNext: () => void }> = ({
  onBack,
  onNext,
}) => {
  return (
    <div
      className="min-h-screen p-6 pt-32 max-w-7xl mx-auto relative z-10 pb-40"
      style={{ perspective: "2000px" }}
    >
      <button
        onClick={onBack}
        className="fixed top-8 left-8 p-5 bg-white/95 backdrop-blur rounded-full shadow-2xl hover:bg-rose-500 hover:text-white transition-all z-50 border-2 border-pink-100 flex items-center gap-3"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>

      <header className="text-center mb-32">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-7xl md:text-9xl font-cursive text-rose-600 mb-8"
        >
          Songs That Remind Me of You
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl text-gray-400 font-cursive italic"
        >
          Songs that make me think of you every time I hear them...
        </motion.p>
      </header>

      <div className="flex flex-col gap-24 md:gap-40">
        {SONGS.map((song, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={song.title}
              initial={{
                opacity: 0,
                x: isEven ? 100 : -100,
                rotateY: isEven ? -10 : 10,
              }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              whileHover={{
                scale: 1.02,
                rotateX: -2,
                rotateY: isEven ? -2 : 2,
              }}
              viewport={{ once: true, amount: 0.2 }}
              className={`flex flex-col md:flex-row ${isEven ? "md:flex-row" : "md:flex-row-reverse"} bg-white rounded-[4rem] overflow-hidden shadow-2xl border-[8px] md:border-[12px] border-white group transition-all duration-700 transform-gpu cursor-default relative`}
              style={{
                transformStyle: "preserve-3d",
                WebkitMaskImage: "-webkit-radial-gradient(white, black)",
              }}
            >
              <div className="md:w-1/2 h-[450px] md:h-auto overflow-hidden relative">
                <img
                  src={song.imageUrl}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={song.title}
                />
              </div>
              <div className="md:w-1/2 p-10 md:p-20 flex flex-col justify-center bg-white relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-rose-100"></div>
                  <span className="text-rose-300 font-black text-xs uppercase tracking-[0.4em]">
                    TRACK {idx + 1}
                  </span>
                  <div className="h-px flex-1 bg-rose-100"></div>
                </div>
                <h3
                  className="text-5xl md:text-7xl font-bold font-cursive text-rose-600 mb-4 leading-tight"
                  style={{ transform: "translateZ(50px)" }}
                >
                  {song.title}
                </h3>
                <h4
                  className="text-2xl md:text-3xl text-rose-300 font-cursive mb-12"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {song.artist}
                </h4>
                <div
                  className="text-gray-600 text-lg md:text-2xl leading-loose space-y-3 font-cursive"
                  style={{ transform: "translateZ(20px)" }}
                >
                  {song.message
                    .trim()
                    .split("\n")
                    .map((line, index) => (
                      <p key={index} className="text-center">
                        {line.trim()}
                      </p>
                    ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-48 text-center pb-20"
      >
        <button
          onClick={onNext}
          className="group relative px-16 py-8 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-3xl font-bold shadow-2xl transform transition hover:-translate-y-2 active:scale-95 flex items-center gap-4 mx-auto"
        >
          <span>Next</span>
          <svg
            className="w-10 h-10 group-hover:translate-x-2 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </motion.div>
    </div>
  );
};

const ProposalPage: React.FC = () => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = () => {
    if (!containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const btnWidth = 120;
    const btnHeight = 60;

    const maxX = container.width - btnWidth;
    const maxY = container.height - btnHeight;

    const newX = Math.random() * maxX - container.width / 2 + btnWidth / 2;
    const newY = Math.random() * maxY - container.height / 2 + btnHeight / 2;

    setNoPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setIsAccepted(true);
    sendNotification("Thu Thu", "SHE SAID YES! ❤️🥂").catch(console.error);
  };

  if (isAccepted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          className="bg-white/95 backdrop-blur-xl p-12 md:p-24 rounded-[5rem] shadow-3xl max-w-4xl border-4 border-rose-100"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-rose-500 text-8xl md:text-9xl mb-12"
          >
            ❤️
          </motion.div>
          <h1 className="text-6xl md:text-9xl font-cursive text-rose-600 mb-8">
            Yay! Happy Valentine's!
          </h1>
          <p className="text-2xl md:text-4xl text-rose-400 font-cursive">
            You just made my day the best one ever.
          </p>
          <div className="mt-16 flex justify-center gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                className="w-4 h-4 rounded-full bg-rose-400 shadow-lg"
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center p-4 md:p-10 relative overflow-hidden bg-pink-50"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-2xl p-10 md:p-20 rounded-[3rem] md:rounded-[5rem] shadow-3xl border-2 border-white max-w-4xl w-full text-center relative z-10"
      >
        <div className="mb-12">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-6xl md:text-8xl mb-6"
          >
            💍
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-cursive text-rose-600 leading-tight">
            Will you be my valentine, Thu Thu?
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 mt-12 relative min-h-[200px]">
          <button
            onClick={handleYesClick}
            className="px-16 py-6 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-3xl font-bold shadow-xl transform transition hover:scale-110 active:scale-95 z-20"
          >
            Yes!
          </button>

          <motion.button
            animate={{ x: noPosition.x, y: noPosition.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseEnter={moveNoButton}
            onPointerEnter={moveNoButton}
            className="px-12 py-4 bg-gray-100 text-gray-500 rounded-full text-2xl font-bold shadow-md transform transition hover:bg-gray-200 z-10 pointer-events-auto"
          >
            No
          </motion.button>
        </div>

        <p className="mt-20 text-rose-300 font-cursive text-xl italic opacity-60">
          (The No button is just shy, try to catch it...)
        </p>
      </motion.div>
    </div>
  );
};

export default App;
