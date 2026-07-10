import React, { useState } from "react";
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
  User,
  Settings,
  HelpCircle,
  LogOut,
  CheckCircle2,
  Circle,
  Play,
  Heart,
  Menu,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Sidebar navigation data
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

const TODAY_PLAN = [
  { label: "Morning Exercise", icon: "🏃", status: "done" },
  { label: "Morning Diet", icon: "🥣", status: "done" },
  { label: "Afternoon Exercise", icon: "🏃", status: "pending" },
  { label: "Afternoon Diet", icon: "🍲", status: "pending" },
  { label: "Evening Exercise", icon: "🧘", status: "pending" },
  { label: "Evening Diet", icon: "🍛", status: "pending" },
];

const QUICK_ACCESS = [
  { label: "Diet Plan", icon: Utensils, bg: "bg-emerald-100", fg: "text-emerald-600" },
  { label: "Videos", icon: Play, bg: "bg-pink-100", fg: "text-pink-600" },
  { label: "Schemes", icon: FileBadge, bg: "bg-amber-100", fg: "text-amber-600" },
  { label: "Campaigns", icon: Megaphone, bg: "bg-violet-100", fg: "text-violet-600" },
  { label: "Hospitals", icon: Building2, bg: "bg-sky-100", fg: "text-sky-600" },
  { label: "Reports", icon: BarChart3, bg: "bg-green-100", fg: "text-green-600" },
];

const CHAT_SUGGESTIONS = [
  "Diet Recommendation",
  "Health Advice",
  "Symptoms Check",
  "Exercise Guidance",
  "Baby Development",
  "Ask Anything",
];

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------
function StatCard({ icon: Icon, label, value, valueSuffix, sub, subColor, progress }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex-1 min-w-[200px]">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-xl bg-violet-600 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-white" strokeWidth={2} />
        </div>
        <span className="text-sm text-slate-500">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        {valueSuffix && <span className="text-sm text-slate-400 font-medium">{valueSuffix}</span>}
      </div>
      {progress !== undefined && (
        <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-violet-600 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <p className={`text-xs mt-3 ${subColor || "text-slate-400"}`}>{sub}</p>
    </div>
  );
}

function PlanRow({ item, isLast }) {
  const done = item.status === "done";
  return (
    <div className="flex items-center gap-3 relative pb-6 last:pb-0">
      {!isLast && (
        <span className="absolute left-[11px] top-6 bottom-0 w-px bg-slate-200" />
      )}
      {done ? (
        <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-50 shrink-0 z-10 bg-white rounded-full" />
      ) : (
        <Circle className="w-6 h-6 text-slate-300 shrink-0 z-10 bg-white rounded-full" />
      )}
      <span className="w-9 h-9 rounded-full bg-violet-50 flex items-center justify-center text-base shrink-0">
        {item.icon}
      </span>
      <span className="flex-1 text-sm font-medium text-slate-700">{item.label}</span>
      <span className={`text-xs font-medium ${done ? "text-emerald-500" : "text-slate-400"}`}>
        {done ? "Completed" : "Pending"}
      </span>
    </div>
  );
}

function QuickAccessTile({ item }) {
  const Icon = item.icon;
  return (
    <button className="flex flex-col items-center gap-2 group">
      <div
        className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center group-hover:scale-105 transition-transform`}
      >
        <Icon className={`w-6 h-6 ${item.fg}`} strokeWidth={2} />
      </div>
      <span className="text-xs font-medium text-slate-600">{item.label}</span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function PoshanMitraDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [profileOpen, setProfileOpen] = useState(false);

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
            const active = activeNav === label;
            return (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
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
              className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-16 py-2.5 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5">
              Ctrl + K
            </span>
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

            <div className="relative">
              <button
                onClick={() => setProfileOpen((o) => !o)}
                className="flex items-center gap-2.5 pl-1"
              >
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-lg">
                  👩
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-slate-800 leading-tight">
                    Priya Sharma
                  </p>
                  <p className="text-xs text-slate-400 leading-tight">Pregnant Woman</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-20">
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
                    <div className="w-11 h-11 rounded-full bg-violet-100 flex items-center justify-center text-xl">
                      👩
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Priya Sharma</p>
                      <p className="text-xs text-slate-400">5th Month &nbsp;•&nbsp; 2nd Trimester</p>
                    </div>
                  </div>

                  {[
                    { label: "Profile", icon: User },
                    { label: "Settings", icon: Settings },
                    { label: "Notifications", icon: Bell, badge: "3" },
                    { label: "Language", icon: Globe, chevron: true },
                    { label: "Help & Support", icon: HelpCircle },
                  ].map(({ label, icon: Icon, badge, chevron }) => (
                    <button
                      key={label}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                    >
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span className="flex-1 text-left">{label}</span>
                      {badge && (
                        <span className="text-[10px] font-semibold bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded-full">
                          {badge}
                        </span>
                      )}
                      {chevron && <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-slate-300" />}
                    </button>
                  ))}

                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 mt-1">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Good Morning, Priya! 👋</h1>
            <p className="text-sm text-slate-500 mt-1">
              You are doing great! Let's continue your healthy journey.
            </p>
          </div>

          {/* Stat cards */}
          <div className="flex flex-wrap gap-4">
            <StatCard
              icon={Calendar}
              label="Pregnancy Month"
              value="5th Month"
              sub="18 Weeks + 3 Days"
              progress={55}
            />
            <StatCard
              icon={Heart}
              label="Poshan Score"
              value="78"
              valueSuffix="/100"
              sub="Keep following your plan"
              subColor="text-emerald-500 font-medium"
            />
            <StatCard
              icon={CheckCircle2}
              label="Today's Tasks"
              value="3"
              valueSuffix="/5"
              sub="2 tasks remaining"
            />
            <StatCard
              icon={Calendar}
              label="Next Checkup"
              value="12 May"
              valueSuffix="2025"
              sub="10:30 AM · City Women Hospital"
            />
          </div>

          {/* Plan / Chatbot / Quick access */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's plan */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-800">Today's Plan</h2>
                <button className="text-xs font-semibold text-violet-600">View All</button>
              </div>
              <div>
                {TODAY_PLAN.map((item, i) => (
                  <PlanRow key={item.label} item={item} isLast={i === TODAY_PLAN.length - 1} />
                ))}
              </div>
            </div>

            {/* AI Chatbot */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-800">AI Chatbot</h2>
                <button className="text-xs font-semibold text-violet-600">Open Chat</button>
              </div>

              <div className="bg-violet-50 rounded-2xl p-4 flex-1">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-lg shrink-0">
                    👩
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Hello Priya! 👋</p>
                    <p className="text-sm text-slate-500 mt-1">
                      I'm your AI PoshanMitra. How can I help you today?
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {CHAT_SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      className="text-xs font-medium text-violet-600 bg-white border border-violet-100 rounded-lg px-3 py-1.5 hover:bg-violet-100 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button className="mt-4 w-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl py-3 flex items-center justify-center gap-2 transition-colors">
                <MessageSquare className="w-4 h-4" />
                Chat Now
              </button>
            </div>

            {/* Quick access */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h2 className="font-semibold text-slate-800 mb-4">Quick Access</h2>
              <div className="grid grid-cols-3 gap-y-6 gap-x-2">
                {QUICK_ACCESS.map((item) => (
                  <QuickAccessTile key={item.label} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Recent videos / Health tip */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-800">Recent Videos</h2>
                <button className="text-xs font-semibold text-violet-600">View All</button>
              </div>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="relative w-full sm:w-56 aspect-video rounded-xl overflow-hidden bg-slate-900 shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-pink-200 via-rose-200 to-slate-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                      <Play className="w-5 h-5 text-slate-700 fill-slate-700 ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[11px] px-1.5 py-0.5 rounded">
                    12:45
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Yoga for Healthy Pregnancy</p>
                  <p className="text-xs text-slate-400 mt-1">Exercise</p>
                  <button className="flex items-center gap-2 mt-3 text-sm font-semibold text-violet-600 border border-violet-200 rounded-lg px-3 py-1.5 hover:bg-violet-50">
                    <Play className="w-3.5 h-3.5 fill-violet-600" />
                    Watch Now
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
              <div>
                <h2 className="font-semibold text-slate-800 mb-2">Health Tip for You</h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Drink plenty of water and stay hydrated. It helps in maintaining amniotic fluid
                  and supports your baby's development.
                </p>
              </div>
              <p className="text-6xl text-right mt-6">💧</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
