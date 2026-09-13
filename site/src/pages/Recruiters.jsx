import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "../components/Layout";
import FeedbackForm from "../components/FeedbackForm";
import ChatBox from "../components/ChatBox";

const panels = [
  {
    id: "feedback",
    emoji: "📝",
    title: "Give Me Feedback",
    teaser: "Interviewed me or reviewed my resume? I'd love your honest take.",
    intro: "Generic rejection emails rarely explain what actually happened. If you reviewed my resume or interviewed me, I'd genuinely love to hear your honest take - what stood out, what didn't, or anything else that comes to mind. Good or constructive, it all helps, and it only takes a minute.",
  },
  {
    id: "ask",
    emoji: "💬",
    title: "Ask My AI Assistant",
    teaser: "Questions about my background or skills? Ask away.",
    intro: "Resumes rarely tell the full story, especially squeezed onto a single page. This assistant is trained on my full portfolio, resume, skills, and education - ask it anything about my background.",
  },
];

export default function Recruiters() {
  const [activeId, setActiveId] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleFeedbackSuccess = () => {
    setActiveId(null);
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 3000);
  };

  const active = panels.find((p) => p.id === activeId);

  return (
    <Layout>
      <div className="w-full flex flex-col items-center pt-12 px-4 pb-24 relative">
        <AnimatePresence>
          {showBanner && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50"
            >
              Feedback submitted - thank you!
            </motion.div>
          )}
        </AnimatePresence>

        <h1 className="text-4xl font-bold mb-4 text-center">For Recruiters</h1>
        <p className="text-lg text-gray-300 max-w-xl text-center mb-12">
          Welcome! This space is built just for you - leave feedback, ask my AI assistant about my background, or peek under the hood.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
          {panels.map((p) => (
            <motion.div
              key={p.id}
              layoutId={`recruiter-card-${p.id}`}
              onClick={() => setActiveId(p.id)}
              whileHover={{ scale: 1.03, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="relative overflow-hidden rounded-3xl cursor-pointer shadow-xl bg-gradient-to-br from-gray-800 to-gray-900 ring-1 ring-white/10 p-8 flex flex-col items-center text-center gap-3"
            >
              <div className="text-6xl">{p.emoji}</div>
              <motion.h2 layoutId={`recruiter-title-${p.id}`} className="text-2xl font-bold text-white">
                {p.title}
              </motion.h2>
              <p className="text-gray-300 text-sm">{p.teaser}</p>
              <span className="mt-2 text-green-400 font-semibold text-sm">Click to open &rarr;</span>
            </motion.div>
          ))}
        </div>

        {/* Expandable "how it works" block */}
        <div className="mt-16 w-full max-w-xl mx-auto bg-gray-900 ring-1 ring-white/10 rounded-2xl shadow-lg overflow-hidden transition-all text-center">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full px-4 py-3 sm:px-6 sm:py-4 font-semibold text-base sm:text-lg text-white hover:bg-white/5 transition"
          >
            Curious how this page works under the hood?
          </button>

          {showDetails && (
            <div className="px-6 py-6 text-sm leading-relaxed space-y-4 text-gray-300 text-left">
              <p>
                It's built with <span className="font-semibold text-white">React</span> and <span className="font-semibold text-white">TailwindCSS</span> - frontend's pretty straightforward.
              </p>
              <p>
                But man, just take a look at{" "}
                <a
                  href="https://github.com/JeffreyJing/jeffjing.dev/tree/dev/terraform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 underline hover:text-green-300"
                >
                  the Terraform layout
                </a>
                .
              </p>
              <p>
                We've got two AWS Lambda functions - one handles feedback form submissions and stores them in S3, the other sends recruiter questions to OpenAI's API using a vectorized <code className="bg-gray-800 text-green-300 px-1 py-0.5 rounded text-xs">data.jsonl</code> file.
              </p>
              <p>
                Both are triggered through API Gateway. Everything's wired up using Terraform - from IAM roles to policies to Lambda permissions.
              </p>
              <p>
                All infra lives in AWS Free Tier - and yes, it's fully reproducible via code on GitHub.
              </p>
              <a
                href="https://github.com/JeffreyJing/jeffjing.dev/tree/main/terraform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-green-400 font-semibold underline hover:text-green-300 transition"
              >
                🔗 View the full Terraform setup on GitHub →
              </a>
            </div>
          )}
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
              layoutId={`recruiter-card-${active.id}`}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-lg max-h-[88vh] overflow-y-auto rounded-3xl shadow-2xl bg-gray-900 ring-1 ring-white/10 text-left p-6"
            >
              <button
                onClick={() => setActiveId(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-black/70"
              >
                ×
              </button>

              <motion.h2 layoutId={`recruiter-title-${active.id}`} className="text-2xl font-bold text-white mb-3 pr-8">
                {active.title}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                <p className="text-gray-300 text-sm mb-6">{active.intro}</p>
                {active.id === "feedback" ? (
                  <FeedbackForm onSuccess={handleFeedbackSuccess} />
                ) : (
                  <div className="w-full flex justify-center">
                    <ChatBox />
                  </div>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
}
