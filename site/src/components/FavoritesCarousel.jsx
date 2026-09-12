import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function FavoritesCarousel({ items, imageAspectClass = "aspect-[2/3]" }) {
  const [index, setIndex] = useState(0);
  const item = items[index];

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <div className="w-full">
      <div className="relative w-full rounded-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {item.embed ? (
              <iframe
                title={item.caption || `Spotify embed ${index + 1}`}
                src={item.embed}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl w-full block"
              />
            ) : item.image ? (
              <div className={`w-full ${imageAspectClass} rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center`}>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full flex items-center justify-center hover:opacity-90 transition"
                  >
                    <img
                      src={item.image}
                      alt={item.caption || ""}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </a>
                ) : (
                  <img
                    src={item.image}
                    alt={item.caption || ""}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
              </div>
            ) : (
              <div className={`w-full ${imageAspectClass} rounded-xl flex items-center justify-center text-center p-4 bg-gray-800 text-white text-lg font-semibold`}>
                {item.caption}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {item.image && item.caption && (
        <p className="mt-3 text-center text-white font-semibold">{item.caption}</p>
      )}

      {items.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-3">
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center"
          >
            ‹
          </button>
          <div className="flex gap-1.5">
            {items.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === index ? "bg-green-400" : "bg-gray-600"}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next"
            className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
