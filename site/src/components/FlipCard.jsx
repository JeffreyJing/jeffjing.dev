import { useState } from "react";

export default function FlipCard({ frontTitle, frontContent, backContent, buttonLabel, noScroll }) {
  const [flipped, setFlipped] = useState(false);

  const cardStyle = { transformStyle: "preserve-3d", transition: "transform 0.6s" };
  const frontStyle = { backfaceVisibility: "hidden" };
  const backStyle = {
    backfaceVisibility: "hidden",
    transform: "rotateY(180deg)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden"
  };

  return (
    <div className="relative w-full md:w-[700px] md:h-[500px] perspective">
      <div
        className="w-full h-full relative"
        style={{ ...cardStyle, transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >

        {/* Front Side */}
        <div className="bg-gray-100 rounded-xl shadow-lg p-6 w-full h-full flex flex-col justify-between" style={frontStyle}>
            <div>
                <h2 className="text-2xl font-bold mb-2 text-black">{frontTitle}</h2>
                <p className="text-gray-700 text-sm mb-6 whitespace-pre-line">{frontContent}</p>
            </div>
            <button
                className="bg-black text-white rounded-full px-6 py-3 font-semibold hover:bg-gray-800 transition"
                onClick={() => setFlipped(true)}
            >
                {buttonLabel}
            </button>
        </div>



        {/* Back Side */}
        <div
            className={`bg-white rounded-xl shadow-lg w-full h-full relative ${
                noScroll ? "overflow-hidden" : "overflow-y-auto"
            }`}
            style={backStyle}
        >

            <div className="absolute inset-0 rounded-xl">
                <div className={`px-3 pt-2 text-black h-full pb-8 ${noScroll ? "overflow-hidden" : "overflow-y-auto"}`}>
                    <div className="relative">
                        <button
                        className="absolute top-0 left-0 bg-gray-300 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-gray-400 z-10"
                        onClick={() => setFlipped(false)}
                        >
                        ×
                        </button>
                        <div className="pt-10 space-y-6">
                        {typeof backContent === "function"
                            ? backContent(() => setFlipped(false))
                            : backContent}
                        </div>
                    </div>
                </div>
            </div>
        </div>



      </div>
    </div>
  );
}
