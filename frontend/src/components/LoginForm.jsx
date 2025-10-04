import React, { useState } from "react";
import { LockClosedIcon, UserIcon, BanknotesIcon } from "@heroicons/react/24/solid";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Credenciales inválidas");
      const data = await res.json();
      onLogin(data);
      setMessage("✅ Inicio de sesión exitoso");
    } catch {
      setMessage("❌ Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 sm:p-10">
        {/* Encabezado */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-3">
            <BanknotesIcon className="h-12 w-12 text-indigo-600" />
            <h1 className="text-3xl font-extrabold text-indigo-700">BancoApp</h1>
          </div>
          <p className="text-gray-500 text-sm text-center">
            Inicia sesión para acceder a tu cuenta 💳
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Usuario</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin o user"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Contraseña</label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl shadow-md transition-all"
          >
            <LockClosedIcon className="h-5 w-5" />
            Iniciar sesión
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mt-6 text-xs text-center text-gray-500">
          <p>🔑 <b>Admin:</b> admin / 1234</p>
          <p>👤 <b>User:</b> user / abcd</p>
        </div>
      </div>
    </div>
  );
}
