import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  MessageSquare,
  Calendar,
  Utensils,
  PlayCircle,
  FileBadge,
  Megaphone,
  Building2,
  BarChart3,
  Search,
  Globe,
  Bell,
  ChevronDown,
  Heart,
  Mic,
  Image as ImageIcon,
  FileText,
  Send,
  Volume2,
  CheckCircle2,
  Check,
  CheckCheck,
  RotateCcw,
  Menu,
  Baby,
  Salad,
  PersonStanding,
  HeartPulse,
  Pill,
  Smile,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------
const NAV_ITEMS = [
  { label: "Dashboard", icon: Home },
  { label: "AI Chatbot", icon: MessageSquare },
  { label: "Weekly Check-up", icon: Calendar, badge: "New" },
  { label: "Diet Plan", icon: Utensils },
  { label: "Videos", icon: PlayCircle },
  { label: "Schemes", icon: FileBadge },
  { label: "Campaigns", icon: Megaphone },
  { label: "Nearby Hospitals", icon: Building2 },
  { label: "Reports", icon: BarChart3 },
];

const CHAT_TOPICS = [
  { label: "Diet & Nutrition", icon: Salad, bg: "bg-emerald-100", fg: "text-emerald-600" },
  { label: "Exercise & Yoga", icon: PersonStanding, bg: "bg-violet-100", fg: "text-violet-600" },
  { label: "Symptoms & Solutions", icon: HeartPulse, bg: "bg-rose-100", fg: "text-rose-600" },
  { label: "Baby Development", icon: Baby, bg: "bg-amber-100", fg: "text-amber-600" },
  { label: "Supplements", icon: Pill, bg: "bg-orange-100", fg: "text-orange-600" },
  { label: "Emotional Well-being", icon: Smile, bg: "bg-pink-100", fg: "text-pink-600" },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    from: "bot",
    time: "10:30 AM",
    lines: ["Hello Priya 👋", "I'm your AI PoshanMitra.", "Let's begin your health conversation.", "May I know your age?"],
  },
  { id: 2, from: "user", time: "10:30 AM", text: "I am 26 years old." },
  {
    id: 3,
    from: "bot",
    time: "10:31 AM",
    lines: ["Thank you! 🙂", "What is your current weight (in kg)?"],
  },
  { id: 4, from: "user", time: "10:31 AM", text: "My weight is 58 kg." },
  {
    id: 5,
    from: "bot",
    time: "10:32 AM",
    lines: ["Noted!", "Have you been experiencing nausea or vomiting recently?"],
    tag: "done",
    quickReplies: ["Yes, sometimes", "No, I feel fine", "A little in the morning"],
  },
];

// ---------------------------------------------------------------------------
// Small components
// ---------------------------------------------------------------------------
function BotMessage({ msg }) {
  return (
    <div className="flex items-start gap-3 max-w-xl">
      <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-lg shrink-0 overflow-hidden">
        👩
      </div>
      <div>
        <div className="bg-violet-50 rounded-2xl rounded-tl-sm px-4 py-3">
          {msg.lines.map((line, i) => (
            <p
              key={i}
              className={`text-sm text-slate-700 ${i === 0 ? "font-semibold text-slate-800" : ""}`}
            >
              {line}
            </p>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-1.5 px-1">
          <span className="text-[11px] text-slate-400">{msg.time}</span>
          <button className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50">
            <Volume2 className="w-3 h-3 text-slate-400" />
          </button>
          {msg.tag === "done" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
        </div>
      </div>
    </div>
  );
}

function UserMessage({ msg }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-xl">
        <div className="bg-violet-600 text-white rounded-2xl rounded-tr-sm px-4 py-3">
          <p className="text-sm">{msg.text}</p>
        </div>
        <div className="flex items-center justify-end gap-1 mt-1.5 px-1">
          <span className="text-[11px] text-slate-400">{msg.time}</span>
          <CheckCheck className="w-3.5 h-3.5 text-violet-500" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function AIChatbotPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", time, text: trimmed }]);
    setInput("");

    // Simple simulated reply so the chat feels alive
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "bot",
          time: replyTime,
          lines: ["Got it, thank you for sharing.", "Is there anything else you'd like to tell me?"],
        },
      ]);
    }, 900);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const clearChat = () => setMessages(INITIAL_MESSAGES);

  return (
    <div className="min-h-screen w-full bg-slate-50 flex text-slate-900">
      {/* ------------------------------------------------------------ */}
      {/* Sidebar                                                      */}
      {/* ------------------------------------------------------------ */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-white border-r border-slate-100 px-4 py-6">
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-lg">
            🤱
          </div>
          <div>
            <p className="font-bold text-lg leading-tight text-slate-900">PoshanMitra AI</p>
            <p className="text-[11px] text-slate-400 leading-tight">
              Swasth Maa, Swasth Shishu, Swasth Bharat
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, icon: Icon, badge }) => {
            const active = label === "AI Chatbot";
            return (
              <button
  key={label}
  onClick={() => {
    if (label === "Dashboard") {
      navigate("/");
    } else if (label === "AI Chatbot") {
      navigate("/chatbot");
    }
  }}
  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
    active
      ? "bg-violet-50 text-violet-700"
      : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
  }`}
>
                <Icon className="w-5 h-5" strokeWidth={2} />
                <span className="flex-1 text-left">{label}</span>
                {badge && (
                  <span className="text-[10px] font-semibold bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto bg-violet-50 rounded-2xl p-5 text-center relative overflow-hidden">
          <p className="text-5xl mb-3">🤰</p>
          <p className="text-sm font-semibold text-violet-900 leading-snug">
            You are not alone,
            <br />
            we are with you
          </p>
          <Heart className="w-4 h-4 text-violet-400 fill-violet-300 mx-auto mt-2" />
        </div>
      </aside>

      {/* ------------------------------------------------------------ */}
      {/* Main column                                                  */}
      {/* ------------------------------------------------------------ */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center gap-4 px-6 py-4 bg-white border-b border-slate-100">
          <button className="lg:hidden text-slate-500">
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 max-w-xl relative hidden sm:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-sm text-slate-600">
              <Globe className="w-4 h-4" />
              English
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            <button className="relative w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
              <Bell className="w-4.5 h-4.5 text-slate-500" />
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 text-[10px] bg-violet-600 text-white rounded-full flex items-center justify-center px-1">
                3
              </span>
            </button>

            <div className="flex items-center gap-2.5 pl-1">
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-lg">
                👩
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-slate-800 leading-tight">Priya Sharma</p>
                <p className="text-xs text-slate-400 leading-tight">Pregnant Woman</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </header>

        {/* Body: chat + right rail */}
        <main className="flex-1 min-h-0 flex overflow-hidden">
          {/* Chat column */}
          <section className="flex-1 min-w-0 flex flex-col">
            {/* Chat header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900">AI Chatbot</h1>
                <span className="text-xs font-semibold text-violet-600 bg-violet-100 px-3 py-1 rounded-full">
                  Your Health Companion
                </span>
              </div>
              <button
                onClick={clearChat}
                className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-violet-600"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear Chat
              </button>
            </div>
            <p className="px-6 text-sm text-slate-500 -mt-2 mb-4">
              Hi Priya! 👋 I'm here to support you and your baby's health journey.
            </p>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 space-y-5 pb-4">
              {messages.map((msg) =>
                msg.from === "bot" ? (
                  <div key={msg.id}>
                    <BotMessage msg={msg} />
                    {msg.quickReplies && (
                      <div className="flex flex-wrap gap-2 mt-3 ml-[52px]">
                        {msg.quickReplies.map((r) => (
                          <button
                            key={r}
                            onClick={() => sendMessage(r)}
                            className="text-xs font-medium text-violet-600 bg-white border border-violet-200 rounded-full px-3.5 py-1.5 hover:bg-violet-50"
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <UserMessage key={msg.id} msg={msg} />
                )
              )}
            </div>

            {/* Composer */}
            <div className="px-6 pb-6 pt-2">
              <div className="flex flex-wrap gap-2 mb-3">
                <button className="flex items-center gap-1.5 text-sm font-medium text-violet-600 bg-white border border-violet-200 rounded-xl px-3.5 py-2 hover:bg-violet-50">
                  <Mic className="w-4 h-4" />
                  Voice Input
                </button>
                <button className="flex items-center gap-1.5 text-sm font-medium text-violet-600 bg-white border border-violet-200 rounded-xl px-3.5 py-2 hover:bg-violet-50">
                  <ImageIcon className="w-4 h-4" />
                  Upload Image
                </button>
                <button className="flex items-center gap-1.5 text-sm font-medium text-violet-600 bg-white border border-violet-200 rounded-xl px-3.5 py-2 hover:bg-violet-50">
                  <FileText className="w-4 h-4" />
                  My Health Summary
                </button>
              </div>

              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-2 shadow-sm">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none py-2"
                />
                <button
                  onClick={() => sendMessage()}
                  className="w-9 h-9 rounded-full bg-violet-600 hover:bg-violet-700 flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
                <button className="w-9 h-9 rounded-full bg-violet-50 hover:bg-violet-100 flex items-center justify-center shrink-0">
                  <Volume2 className="w-4 h-4 text-violet-600" />
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                You can ask anything about pregnancy, diet, exercise, baby care and more...
              </p>
            </div>
          </section>

          {/* Right rail */}
          <aside className="hidden xl:flex w-80 shrink-0 flex-col gap-6 border-l border-slate-100 bg-white px-5 py-6 overflow-y-auto">
            {/* Health summary */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-800">My Health Summary</h2>
                <button className="text-xs font-semibold text-violet-600">View Details</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                    <Baby className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Pregnancy Month</p>
                    <p className="text-sm font-semibold text-slate-800">
                      5th Month <span className="text-slate-400 font-normal">(2nd Trimester)</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Poshan Score</p>
                    <p className="text-sm font-semibold text-slate-800">
                      78 <span className="text-slate-400 font-normal">/ 100</span>
                    </p>
                    <p className="text-xs text-emerald-500 font-medium">Good ↑</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Last Check-up</p>
                    <p className="text-sm font-semibold text-slate-800">5 Days Ago</p>
                    <p className="text-xs text-slate-400">Next: 12 May 2025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat topics */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-800">Chat Topics</h2>
                <button className="text-xs font-semibold text-violet-600">See All</button>
              </div>
              <div className="space-y-3">
                {CHAT_TOPICS.map(({ label, icon: Icon, bg, fg }) => (
                  <button
                    key={label}
                    onClick={() => sendMessage(`Tell me about ${label}`)}
                    className="w-full flex items-center gap-3 text-left hover:bg-slate-50 rounded-xl px-1 py-1 -mx-1"
                  >
                    <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4 h-4 ${fg}`} />
                    </div>
                    <span className="text-sm text-slate-600">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Voice assistant */}
            <div className="bg-violet-50 rounded-2xl p-5 text-center">
              <h2 className="font-semibold text-slate-800 mb-1">Voice Assistant</h2>
              <p className="text-xs text-slate-500 mb-4">Click the mic and ask your question</p>
              <div className="flex items-center justify-center gap-1 mb-4">
                {[8, 14, 20, 14, 8].map((h, i) => (
                  <span
                    key={`l-${i}`}
                    className="w-0.5 bg-violet-300 rounded-full"
                    style={{ height: `${h}px` }}
                  />
                ))}
                <button className="w-14 h-14 mx-2 rounded-full bg-violet-600 hover:bg-violet-700 flex items-center justify-center shadow-lg shadow-violet-200 shrink-0">
                  <Mic className="w-6 h-6 text-white" />
                </button>
                {[8, 14, 20, 14, 8].map((h, i) => (
                  <span
                    key={`r-${i}`}
                    className="w-0.5 bg-violet-300 rounded-full"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-center gap-2">
                <button className="text-xs font-semibold bg-violet-600 text-white rounded-lg px-3 py-1.5">
                  English
                </button>
                <button className="text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-1.5">
                  हिंदी
                </button>
                <button className="text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-1.5">
                  मराठी
                </button>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
