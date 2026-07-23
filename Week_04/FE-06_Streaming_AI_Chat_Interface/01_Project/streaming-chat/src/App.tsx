import { useState, useRef, useEffect } from "react";
import "./index.css";

type Message = {
  role: "user" | "assistant";
  text: string;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! Ask me anything.",
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  const streamResponse = (text: string) => {
    setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

    let index = 0;

    intervalRef.current = window.setInterval(() => {
      index++;

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          role: "assistant",
          text: text.slice(0, index),
        };

        return updated;
      });

      if (index >= text.length && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 80);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      streamResponse(
        "Hello! This is a simulated streaming AI response. Each character appears one by one just like ChatGPT."
      );
    }, 1000);
  };

  const stopStreaming = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setTyping(false);
  };

  return (
    <div className="container">
      <h1>Streaming AI Chat</h1>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.role}>
            {msg.text}
          </div>
        ))}

        {typing && (
          <div className="assistant">
            Assistant is typing...
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={sendMessage}>
          Send
        </button>

        <button onClick={stopStreaming}>
          Stop
        </button>
      </div>
    </div>
  );
}

export default App;