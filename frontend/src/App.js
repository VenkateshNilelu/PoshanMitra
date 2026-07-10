import { BrowserRouter, Routes, Route } from "react-router-dom";

import PoshanMitraDashboard from "./pages/PoshanMitraDashboard";
import AIChatbotPage from "./pages/AIChatbotPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PoshanMitraDashboard />} />
        <Route path="/chatbot" element={<AIChatbotPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;