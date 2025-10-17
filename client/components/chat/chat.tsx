"use client";
import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send } from "lucide-react";

// La definición de esta función ya es correcta. Acepta el historial.
const sendMessage = async (
  message: string,
  sessionId: string,
  history: { from: string; text: string }[]
) => {
  const response = await fetch("http://localhost:4000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    // Aquí se enviará el body completo, incluyendo el historial
    body: JSON.stringify({ message, sessionId, history }),
  });
  if (!response.ok) throw new Error("Error en la petición");
  return await response.json();
};

export default function ChatPage() {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => Date.now().toString());
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { from: "user", text: input };
    const newMessages = [...messages, userMsg];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendMessage(input, sessionId, newMessages);
      const data = Array.isArray(response) ? response[0] : response;
      const botText = data.output || "No he podido procesar la respuesta.";

      const botMsg = { from: "bot", text: botText };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg z-50 transition-transform active:scale-90"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle size={24} />
      </button>

      {/* Ventana de chat */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white border border-gray-200 rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-emerald-600 text-white p-3 font-semibold flex justify-between items-center">
            <span>Asistente AgroSmart 🤖</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 text-xl"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 text-sm mt-4">
                ¡Hola! Soy tu asistente AgroSmart. ¿En qué puedo ayudarte hoy?
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-xl max-w-[75%] text-sm ${
                  m.from === "user"
                    ? "bg-emerald-600 text-white ml-auto"
                    : "bg-white text-gray-800 border mr-auto"
                }`}
              >
                {m.text}
              </div>
            ))}

            {isLoading && (
              <div className="bg-white text-gray-800 border p-2 rounded-xl max-w-[75%] text-sm mr-auto">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex border-t bg-white p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
              className="flex-1 border border-gray-300 rounded-l-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
              placeholder="Escribe un mensaje..."
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-emerald-600 text-white px-3 rounded-r-lg hover:bg-emerald-700 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
