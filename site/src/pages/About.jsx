import Layout from "../components/Layout";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FavoritesCarousel from "../components/FavoritesCarousel";

// Auto-discovers src/assets/movies/movie-<n>.<ext> - drop in a new file and it
// just appears here, sorted by <n>, no code changes needed. object-cover in
// FavoritesCarousel/the tile then crops every poster to the same shown size
// no matter what pixel dimensions the source file actually is.
const movieFiles = import.meta.glob("../assets/movies/movie-*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

// Excluded from the carousel without deleting the files - pull a number back
// out of this list to bring it back.
const EXCLUDED_MOVIE_NUMBERS = [1, 3];

const numOf = (path) => parseInt(path.match(/movie-(\d+)\./)?.[1] ?? "0", 10);

const movieItems = Object.entries(movieFiles)
  .filter(([path]) => !EXCLUDED_MOVIE_NUMBERS.includes(numOf(path)))
  .sort(([a], [b]) => numOf(a) - numOf(b))
  .map(([, url]) => ({ image: url }));

// Same auto-discovery as movies, but game images use descriptive filenames
// instead of a numbered pattern - drop any image into src/assets/games and it
// shows up here, sorted alphabetically, with a readable caption underneath.
const gameFiles = import.meta.glob("../assets/games/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const GAME_CAPTIONS = {
  maplestory: "MapleStory",
  "league-of-legends": "League of Legends",
  "league-of-legends-diamond-rank": "League of Legends - Diamond Rank",
  "pokemon-emerald": "Pokémon Emerald",
  "pokemon-fr-lg": "Pokémon FireRed / LeafGreen",
  "pokemon-pearl": "Pokémon Pearl",
};

const titleCase = (slug) => slug.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const baseNameOf = (path) => path.match(/([^/]+)\.[^.]+$/)?.[1] ?? "";

// Same non-destructive exclusion pattern as movies - pull a name back out of
// this list to bring it back into the carousel.
const EXCLUDED_GAME_KEYS = ["league-of-legends-diamond-rank"];

const gameItems = Object.entries(gameFiles)
  .filter(([path]) => !EXCLUDED_GAME_KEYS.includes(baseNameOf(path)))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, url]) => {
    const base = baseNameOf(path);
    return { image: url, caption: GAME_CAPTIONS[base] ?? titleCase(base) };
  });

// Same auto-discovery pattern again for food photos.
const foodFiles = import.meta.glob("../assets/food/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const FOOD_CAPTIONS = {
  chipotle: "Chipotle is my favorite fast food place of all time - I'm always down for a double chicken bowl!",
  steak: "My favorite cut of steak is NY Strip - it beats ribeye for me since it holds itself together better for each bite, allowing for a better medium-rare cook.",
  pizza: "Give me a thin, crispy NY-style slice with a well-charred crust any day - it beats deep dish for me since the crust-to-topping ratio just hits different.",
  hamburger: "Smash burgers over thick pub burgers for me every time - that crispy, caramelized crust from a hot flat-top just can't be beat.",
  "korean-tofu-soup": "I grew up loving Korean tofu soup, and as a result, it and Chipotle are the only two foods I can eat for the rest of my life and genuinely never grow tired of.",
};

const foodItems = Object.entries(foodFiles)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, url]) => {
    const base = baseNameOf(path);
    return { image: url, caption: FOOD_CAPTIONS[base] ?? titleCase(base) };
  });

// Same pattern once more, but these captions are short written blurbs rather
// than just a name - drawn from the resume's Pokémon TCG bullet points.
const pokemonTcgFiles = import.meta.glob("../assets/pokemon-tcg/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const POKEMON_TCG_CAPTIONS = {
  "pokemon-singles": "I vend Pokémon cards regularly - sourcing, buying, and trading singles at card shows and through direct supplier relationships.",
  slabs: "I've also personally submitted 500+ cards for grading, tracking market pricing daily to decide what's worth grading and reselling.",
};

const pokemonTcgItems = [
  ...Object.entries(pokemonTcgFiles)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, url]) => {
      const base = baseNameOf(path);
      return { image: url, caption: POKEMON_TCG_CAPTIONS[base] ?? titleCase(base) };
    }),
  {
    image: "/images/whatnot.webp",
    link: "https://www.whatnot.com/s/MqnXpu6Y",
    caption: "I stream live Pokémon TCG breaks and vending on Whatnot - tap the logo to check out my current listings and catch the next live show.",
  },
];

export default function About() {
  const [activeId, setActiveId] = useState(null);

  const sections = [
    {
      id: "music",
      title: "🎵 Music",
      emoji: "🎵",
      image: "/images/about/music.jpg",
      content: "I've been getting into EDM production lately...",
      items: [
        { embed: "https://open.spotify.com/embed/album/0ValflNlWce21wm5PlwV60?utm_source=generator&si=7258ee74dad54fc4" },
        { embed: "https://open.spotify.com/embed/album/60xcVwuQJAOyu11xf9mObS?utm_source=generator&si=c8b73016de6b45b9" },
        { embed: "https://open.spotify.com/embed/album/7gsWAHLeT0w7es6FofOXk1?utm_source=generator&si=6a95089efd174f78" },
        { embed: "https://open.spotify.com/embed/album/20r762YmB5HeofjMCiPMLv?utm_source=generator&si=0760487197af4bee" },
        { embed: "https://open.spotify.com/embed/playlist/6KzhO8rcfWZ1xQ70pUnZLL?utm_source=generator&si=c73c89db28d34778" },
      ],
    },
    {
      id: "pokemon",
      title: "🎴 Pokémon TCG",
      icon: "/images/Poke_Ball.webp",
      image: pokemonTcgItems[0]?.image,
      content: "I vend and collect Pokémon cards, grade regularly, and used to run live Pokémon TCG streams on Whatnot.",
      items: pokemonTcgItems,
      carouselAspect: "aspect-square",
    },
    {
      id: "games",
      title: "🎮 Video Games",
      emoji: "🎮",
      image: gameItems[0]?.image,
      content: "Played League of Legends for years and still climb every season. Also been playing MapleStory since I was 10 - it's a nostalgic grind I keep coming back to.",
      items: gameItems,
      carouselAspect: "aspect-[3/4]",
    },
    {
      id: "movies",
      title: "🍿 Movies",
      emoji: "🍿",
      image: movieItems[0]?.image,
      content: "Favorite director: Nolan. Movies these days just aren't as good as what they used to be, so I find myself rewatching a lot of films from the 1990-2020 era.",
      items: movieItems,
    },
    {
      id: "food",
      title: "🍳 Food & Cooking",
      emoji: "🍳",
      image: foodItems[0]?.image,
      content: "High-protein recipes, STEAK, meal prepping fun foods like bibimbap, Asian fusion stuff, veggie + bana protein smoothie!",
      items: foodItems,
      carouselAspect: "aspect-square",
    },
    {
      id: "gym",
      title: "💪 Gym Schedule",
      emoji: "💪",
      image: "/images/about/gym.jpg",
      content: "Back, chest, legs, shoulders, arms. Monday to Friday. Eating clean, ground turkey every meal right now!",
      items: [],
    },
  ];

  const active = sections.find((s) => s.id === activeId);

  return (
    <Layout>
      <div className="flex flex-col items-center pt-12 px-4 pb-24">
        <h1 className="text-4xl font-bold mb-4 text-center">About Me</h1>
        <p className="text-lg text-gray-300 max-w-2xl text-center mb-12">
          Get to know me beyond the resume! Scroll through these panels for a peek at what actually
          takes up my headspace outside of work - the albums on repeat, the games I've sunk way too
          many hours into, the movies I rewatch more than I probably should, and a few of the other
          quirks and routines that make up the rest of me!
        </p>

        <div className="w-full max-w-3xl grid grid-cols-2 gap-4 sm:gap-6">
          {sections.map(({ id, title, image, emoji, icon }) => (
            <motion.div
              key={id}
              layoutId={`card-${id}`}
              onClick={() => setActiveId(id)}
              whileHover={{ scale: 1.03, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="relative overflow-hidden rounded-3xl aspect-[3/4] cursor-pointer shadow-xl bg-gradient-to-br from-gray-700 to-gray-900"
            >
              {emoji ? (
                <div className="absolute inset-0 flex items-center justify-center text-7xl sm:text-8xl">
                  {emoji}
                </div>
              ) : icon ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src={icon} alt={title} className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
                </div>
              ) : (
                <>
                  {/* background photo - object-cover crops any source size/aspect to fill the tile */}
                  <img
                    src={image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  {/* gradient so the title stays legible over any photo */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/80" />

                  <motion.div
                    layoutId={`title-${id}`}
                    className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-lg sm:text-2xl font-bold text-white drop-shadow-lg"
                  >
                    {title}
                  </motion.div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveId(null)}
              className="fixed inset-0 bg-black/70 z-40"
            />
            <motion.div
              key={active.id}
              layoutId={`card-${active.id}`}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl bg-gray-900 text-left"
            >
              {active.items && active.items.length > 0 ? (
                <div className="relative">
                  <button
                    onClick={() => setActiveId(null)}
                    className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-black/70"
                  >
                    ×
                  </button>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                    className="pt-16 px-6 pb-8"
                  >
                    <FavoritesCarousel items={active.items} imageAspectClass={active.carouselAspect} />
                  </motion.div>
                </div>
              ) : (
                <>
                  <div className="relative h-56 sm:h-72">
                    <img
                      src={active.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
                    <motion.div
                      layoutId={`title-${active.id}`}
                      className="absolute bottom-4 left-6 right-14 text-2xl sm:text-3xl font-bold text-white drop-shadow-lg"
                    >
                      {active.title}
                    </motion.div>
                    <button
                      onClick={() => setActiveId(null)}
                      className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-black/70"
                    >
                      ×
                    </button>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.2 }}
                    className="p-6"
                  >
                    <p className="text-gray-200 text-lg leading-relaxed">{active.content}</p>
                  </motion.div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
}
