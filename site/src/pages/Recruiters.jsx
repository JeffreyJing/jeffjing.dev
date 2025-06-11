import { useState } from "react";
import Layout from "../components/Layout";
import FlipCard from "../components/FlipCard";
import FeedbackForm from "../components/FeedbackForm";
import ChatBox from "../components/ChatBox";

export default function Recruiters() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

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

        {/* Combined Expandable White Block */}
        <div className="mt-16 w-full max-w-xl mx-auto bg-white text-black rounded-2xl shadow-lg overflow-hidden transition-all text-center">
  <button
    onClick={() => setShowDetails(!showDetails)}
    className="w-full px-4 py-3 sm:px-6 sm:py-4 font-semibold text-base sm:text-lg hover:bg-gray-100 transition"
  >
    Curious how this page works under the hood?
  </button>

  {showDetails && (
    <div className="px-6 py-6 text-sm leading-relaxed space-y-4">
      <p>
        It’s built with <span className="font-semibold">React</span> and <span className="font-semibold">TailwindCSS</span> — frontend’s pretty straightforward.
      </p>
      <p>
  But man, just take a look at{" "}
  <a
    href="https://github.com/JeffreyJing/jeffjing.dev/tree/dev/terraform"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline hover:text-blue-800"
  >
    the Terraform layout
  </a>
  .
</p>
      <p>
        We’ve got two AWS Lambda functions — one handles feedback form submissions and stores them in S3, the other sends recruiter questions to OpenAI’s API using a vectorized <code className="bg-gray-200 px-1 py-0.5 rounded text-xs">data.jsonl</code> file.
      </p>
      <p>
        Both are triggered through API Gateway. Everything’s wired up using Terraform — from IAM roles to policies to Lambda permissions.
      </p>
      <p>
        All infra lives in AWS Free Tier — and yes, it’s fully reproducible via code on GitHub.
      </p>
      <a
        href="https://github.com/yourusername/your-repo" // replace with real repo
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-blue-600 font-semibold underline hover:text-blue-800 transition"
      >
        🔗 View the full Terraform setup on GitHub →
      </a>
    </div>
  )}
</div>

      </div>
    </Layout>
  );
}
