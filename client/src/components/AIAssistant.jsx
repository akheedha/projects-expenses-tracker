import { useState } from "react";
import api from "../services/api";

function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hi! I'm BuildMetrics AI. Ask me anything about your construction projects.",
    },
  ]);

  const quickQuestions = [
    "How many projects do we have?",
    "Which project spent the most?",
    "How much have we spent on labor?",
    "Which project has the highest budget?",
  ];

  const askAI = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text,
      },
    ]);

    setLoading(true);

    try {
      const res = await api.post("/ai/chat", {
        question: text,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.answer,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Sorry, something went wrong.",
        },
      ]);
    }

    setLoading(false);
  };

  const sendQuestion = () => {
    askAI(question);
    setQuestion("");
  };

  return (
    <>
      <button
        className="ai-fab"
        onClick={() => setOpen(!open)}
      >
        🤖
      </button>

      {open && (
        <div className="ai-chat">

          <div className="ai-header">
            🤖 BuildMetrics AI
          </div>

          <div
            style={{
              padding: "12px",
              borderBottom: "1px solid #eee",
            }}
          >
            <strong>Quick Questions</strong>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "10px",
              }}
            >
              {quickQuestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => askAI(item)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "20px",
                    border: "1px solid #ddd",
                    cursor: "pointer",
                    background: "#f8fafc",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="ai-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender}`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="message ai">
                🤖 Thinking...
              </div>
            )}
          </div>

          <div className="ai-input">
            <input
              type="text"
              placeholder="Ask anything..."
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendQuestion();
                }
              }}
            />

            <button onClick={sendQuestion}>
              Send
            </button>
          </div>

        </div>
      )}
    </>
  );
}

export default AIAssistant;