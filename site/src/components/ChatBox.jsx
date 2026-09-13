import { useState, useEffect, useRef } from "react";
import { API_BASE } from "../config";

const CHAT_HISTORY_KEY = "recruiterChatHistory";

function loadChatHistory() {
  try {
    const saved = sessionStorage.getItem(CHAT_HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState(loadChatHistory);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Persisted to sessionStorage (not localStorage) so the conversation survives
  // closing/reopening the modal, navigating around the site, or a page refresh,
  // but still clears once the browser tab itself is closed.
  useEffect(() => {
    try {
      sessionStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
    } catch {
      // ignore storage errors (private browsing, quota, etc.)
    }
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newUserMessage = { role: "user", content: question };
    setChatHistory((prev) => [...prev, newUserMessage]);
    setLoading(true);
    setQuestion("");

    try {
      const res = await fetch(`${API_BASE}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      const newBotMessage = { role: "assistant", content: data.answer };
      setChatHistory((prev) => [...prev, newBotMessage]);
    } catch {
      setChatHistory((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

  return (
    <div className="flex flex-col w-full max-w-full rounded-xl overflow-hidden shrink-0 h-[55vh] sm:h-[48vh] ring-1 ring-white/10">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950"
      >
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] px-4 py-3 rounded-xl whitespace-pre-line ${
              msg.role === "user"
                ? "bg-green-600 text-white ml-auto"
                : "bg-gray-800 text-gray-100 shadow"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="bg-gray-800 text-gray-100 px-4 py-3 rounded-xl shadow max-w-[80%]">Thinking...</div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 bg-gray-900 flex gap-2 border-t border-white/10 w-full mt-auto"
      >
        <input
          type="text"
          className="flex-1 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          placeholder="Ask something about Jeff..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-500 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
