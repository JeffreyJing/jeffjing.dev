import { useState, useEffect, useRef } from "react";

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newUserMessage = { role: "user", content: question };
    setChatHistory((prev) => [...prev, newUserMessage]);
    setLoading(true);
    setQuestion("");

    try {
      const res = await fetch("https://qc88e4b9mh.execute-api.us-east-1.amazonaws.com/prod/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      const newBotMessage = { role: "assistant", content: data.answer };
      setChatHistory((prev) => [...prev, newBotMessage]);
    } catch (err) {
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
    <div className="flex flex-col w-full max-w-full rounded-xl overflow-hidden shrink-0 h-[77vh] sm:h-[62vh]">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-white"
      >
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] px-4 py-3 rounded-xl whitespace-pre-line ${
              msg.role === "user"
                ? "bg-black text-white ml-auto"
                : "bg-white text-black shadow"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="bg-white text-black px-4 py-3 rounded-xl shadow max-w-[80%]">Thinking...</div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white flex gap-2 border-t border-transparent w-full mt-auto"
      >

        <input
          type="text"
          className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
          placeholder="Ask something about Jeff..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800"
        >
          Send
        </button>
      </form>
    </div>
  );
}
