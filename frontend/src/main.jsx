import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // 👈 Importa Tailwind (asegúrate de que este archivo existe y tenga las 3 líneas @tailwind)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl border border-white/30 p-10">
        <App />
      </div>
    </div>
  </React.StrictMode>
);
