import Layout from "../components/Layout";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function About() {
  const [openSections, setOpenSections] = useState({});

  const toggle = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sections = [
    { id: "music", title: "🎵 Music", content: "I've been getting into EDM production lately..." },
    { id: "gym", title: "🏋️ Gym Schedule", content: "Back, chest, legs, shoulders, arms. Monday to Friday. Eating clean, ground turkey every meal right now!" },
    { id: "games", title: "🎮 Video Games", content: "Played League of Legends for years and still climb every season. Also been playing MapleStory since I was 10 — it's a nostalgic grind I keep coming back to." },
    { id: "movies", title: "🎬 Movies", content: "Favorite director: Nolan. Movies these days just aren't as good as what they used to be, so I find myself rewatching a lot of films from the 1990-2020 era." },
    { id: "food", title: "🍱 Food & Cooking", content: "High-protein recipes, STEAK, meal prepping fun foods like bibimbap, Asian fusion stuff, veggie + bana protein smoothie!" },
    { id: "random", title: "🧠 Random Facts", content: "I can solve a 2x2 up to a 5x5 Rubik's cube, and I enjoy running cross country- when I'm in shape for it. Also, I really enjoy early 2000's Korean rap." },
  ];

  return (
    <Layout>
      <div className="flex flex-col items-center pt-12 px-4 pb-24">
        <h1 className="text-4xl font-bold mb-4 text-center">About Me</h1>
        <p className="text-lg text-gray-300 max-w-2xl text-center mb-12">
          Get to know me beyond the resume—this is where I share the things I love:
          the routines that keep me grounded, the games and music I escape to, and the random quirks that make me who I am.
          This page isn't yet completed, so feel free to come back in a couple days to see new features!
        </p>

        <div className="w-full max-w-2xl space-y-10">
          {sections.map(({ id, title, content }) => (
            <div key={id}>
              <div
                className="text-3xl font-bold text-white cursor-pointer hover:text-green-300 transition duration-300"
                onClick={() => toggle(id)}
              >
                {title}
              </div>
              <AnimatePresence>
                {openSections[id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 bg-gray-800 text-white text-lg p-6 rounded-xl shadow-md">
                      {content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
