"use client";
import { Hash, Send, Menu, X } from "lucide-react";
import { useState } from "react";

export default function ChatApp() {
  const [channels] = useState([
    { id: 1, name: "general" },
    { id: 2, name: "random" },
    { id: 3, name: "tech-talk" },
    { id: 4, name: "announcements" },
  ]);

  const [activeChannel, setActiveChannel] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<
    Record<
      number,
      Array<{ id: number; user: string; text: string; time: string }>
    >
  >({
    1: [
      { id: 1, user: "Alice", text: "Hey everyone!", time: "10:30 AM" },
      { id: 2, user: "Bob", text: "Hi Alice! How are you?", time: "10:32 AM" },
    ],
    2: [],
    3: [],
    4: [],
  });

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: "You",
      text: input,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => ({
      ...prev,
      [activeChannel]: [...prev[activeChannel], newMessage],
    }));
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  const activeChannelName = channels.find((c) => c.id === activeChannel)?.name;

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-40 w-60 bg-gray-800 border-r border-gray-700 flex flex-col transform transition-transform duration-300
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h1 className="text-xl font-bold">Channels</h1>
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => {
                setActiveChannel(channel.id);
                setSidebarOpen(false);
              }}
              className={`w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-700 transition ${
                activeChannel === channel.id ? "bg-gray-700" : ""
              }`}
            >
              <Hash size={18} className="text-gray-400" />
              <span>{channel.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="h-14 border-b border-gray-700 flex items-center px-4 justify-between">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <Hash size={20} className="text-gray-400" />
            <h2 className="text-lg font-semibold">{activeChannelName}</h2>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {messages[activeChannel].length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages[activeChannel].map((msg) => (
              <div key={msg.id} className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  {msg.user[0]}
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold">{msg.user}</span>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-gray-300 mt-1">{msg.text}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message #${activeChannelName}`}
              className="flex-1 bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2 transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
