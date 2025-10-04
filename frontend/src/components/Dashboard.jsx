import React, { useEffect, useState } from "react";
import TransferForm from "./TransferForm";
import {
  BanknotesIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

export default function Dashboard({ user, onLogout }) {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // 🔹 Llamamos al backend para obtener las cuentas del usuario logueado
    fetch(`http://localhost:8080/api/accounts/${user.username}`)
      .then((res) => res.json())
      .then((data) => setAccounts(data))
      .catch((err) => console.error("Error cargando cuentas:", err));
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200 p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <UserCircleIcon className="h-10 w-10 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Bienvenido, <span className="capitalize">{user.username}</span>
            </h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Cerrar sesión
          </button>
        </div>

        {/* CUENTAS */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <BanknotesIcon className="h-6 w-6 text-green-500" />
          Tus cuentas
        </h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {accounts.map((acc, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl shadow bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
            >
              <h3 className="text-lg font-bold">{acc.name}</h3>
              <p className="text-sm opacity-90">Saldo: ${acc.balance} USD</p>
            </div>
          ))}
        </div>

        {/* FORMULARIO DE TRANSFERENCIA */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-inner">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Realizar transferencia
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Selecciona una cuenta de origen, el destinatario y el monto que deseas transferir.
          </p>
          <TransferForm user={user} />
        </div>
      </div>
    </div>
  );
}
