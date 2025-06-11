import { useState } from "react";
import Layout from "../components/Layout";
import FlipCard from "../components/FlipCard";
import FeedbackForm from "../components/FeedbackForm";
import ChatBox from "../components/ChatBox";

export default function Recruiters() {
  const [showBanner, setShowBanner] = useState(false);

  const handleSuccess = () => {
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 3000);
  };

  const feedbackText = `Rejection letters are incredibly common in today's job market—especially given the current economic climate—but they almost always come in the form of generic, automated messages.

As an applicant, it's frustrating to receive the same vague response hundreds of times, with no idea what went wrong. That's why I created this form!

I'd genuinely appreciate your honest feedback. Whether I passed your resume screen or interview—or didn't—your thoughts are greatly appreciated.

If you had a positive impression, feel free to share that too!`;

  const llmText = `Resumes rarely tell the full story—especially when they're squeezed into a single page.

Fortunately, this GPT-powered assistant has been trained on my full portfolio, resume, skills, education, and more.

If you have questions about my qualifications or background, feel free to ask away.`;

  return (
    <Layout>
      <div className="w-full flex flex-col items-center pt-12 px-4 pb-24 relative">
        {showBanner && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 transition-opacity duration-500 ease-in-out">
            Feedback submitted successfully!
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4 text-center">For Recruiters</h1>
        <p className="text-lg text-gray-300 max-w-xl text-center mb-12">
          Welcome! This space is built just for you. Here you can interact with an LLM trained on my work history, leave feedback, and learn more about how I work.
        </p>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-start w-full max-w-7xl">
          <FlipCard
            frontTitle="Did I apply for your job opening? How'd I do?"
            frontContent={feedbackText}
            backContent={(flipBack) => <FeedbackForm onSuccess={() => { handleSuccess(); flipBack(); }} />}
            buttonLabel="Give Feedback"
          />

          <FlipCard
            frontTitle="Questions about my qualifications? Ask GPT!"
            frontContent={llmText}
            backContent={
              <div className="w-full flex justify-center">
                <ChatBox />
              </div>
            }
            buttonLabel="Ask a Question"
            noScroll
          />


        </div>
      </div>
    </Layout>
  );
}
