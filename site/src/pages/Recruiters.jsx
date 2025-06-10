import { useState } from "react";
import Layout from "../components/Layout";

export default function Recruiters() {
  const [flipFeedback, setFlipFeedback] = useState(false);
  const [flipLLM, setFlipLLM] = useState(false);

  const cardStyle = { transformStyle: "preserve-3d", transition: "transform 0.6s" };
  const frontStyle = { backfaceVisibility: "hidden" };
  const backStyle = { backfaceVisibility: "hidden", transform: "rotateY(180deg)", position: "absolute", top: 0, left: 0, right: 0, bottom: 0 };

  return (
    <Layout>
      <div className="w-full flex flex-col items-center pt-12 px-4 pb-24">
        <h1 className="text-4xl font-bold mb-4 text-center">For Recruiters</h1>
        <p className="text-lg text-gray-300 max-w-xl text-center mb-12">Welcome! This space is built just for you. Here you can interact with an LLM trained on my work history, leave feedback, and learn more about how I work.</p>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-start w-full max-w-7xl">
          {/* Feedback Card */}
          <div className="relative w-full md:w-[700px] md:h-[500px] perspective">
            <div className="w-full h-full relative" style={{ ...cardStyle, transform: flipFeedback ? "rotateY(180deg)" : "rotateY(0deg)" }}>
              {/* Front */}
              <div className="bg-gray-100 rounded-xl shadow-lg p-6 w-full h-full flex flex-col justify-between" style={frontStyle}>
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-black">Did I apply for your job opening? How’d I do?</h2>
                  <p className="text-gray-700 text-sm mb-6">Rejection letters are incredibly common in today’s job market—especially given the current economic climate—but they almost always come in the form of generic, automated messages. As an applicant, it's frustrating to receive the same vague response hundreds of times, with no idea what went wrong. That's why I created this form! I'd genuinely appreciate your honest feedback. Whether I passed your resume screen or interview—or didn't—your thoughts are greatly appreciated. If you had a positive impression, feel free to share that too!</p>
                </div>
                <button className="bg-black text-white rounded-full px-6 py-3 font-semibold hover:bg-gray-800 transition" onClick={() => setFlipFeedback(true)}>Give Feedback</button>
              </div>

              {/* Back */}
              <div className="bg-white rounded-xl shadow-lg p-6 w-full h-full flex flex-col relative" style={backStyle}>
                <button className="absolute top-4 right-4 bg-gray-300 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-gray-400" onClick={() => setFlipFeedback(false)}>×</button>
                <div className="text-black mt-8">[ Feedback Form goes here ]</div>
              </div>
            </div>
          </div>

          {/* LLM Card */}
          <div className="relative w-full md:w-[700px] md:h-[500px] perspective">
            <div className="w-full h-full relative" style={{ ...cardStyle, transform: flipLLM ? "rotateY(180deg)" : "rotateY(0deg)" }}>
              {/* Front */}
              <div className="bg-gray-100 rounded-xl shadow-lg p-6 w-full h-full flex flex-col justify-between" style={frontStyle}>
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-black">Questions about my qualifications? Ask GPT!</h2>
                  <p className="text-gray-700 text-sm mb-6">Resumes rarely tell the full story—especially when they’re squeezed into a single page. Fortunately, this GPT-powered assistant has been trained on my full portfolio, resume, skills, education, and more. If you have questions about my qualifications or background, feel free to ask away.</p>
                </div>
                <button className="bg-black text-white rounded-full px-6 py-3 font-semibold hover:bg-gray-800 transition" onClick={() => setFlipLLM(true)}>Ask a Question</button>
              </div>

              {/* Back */}
              <div className="bg-white rounded-xl shadow-lg p-6 w-full h-full flex flex-col relative" style={backStyle}>
                <button className="absolute top-4 right-4 bg-gray-300 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-gray-400" onClick={() => setFlipLLM(false)}>×</button>
                <div className="text-black mt-8">[ GPT chat UI goes here ]</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
