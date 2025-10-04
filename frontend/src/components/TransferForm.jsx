import React, { useState } from "react";
import { PaperAirplaneIcon, BanknotesIcon } from "@heroicons/react/24/solid";

export default function TransferForm({ user }) {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleTransfer = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/transfers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromUser: user.username,
        fromAccount,
        toAccount,
        amount: parseFloat(amount),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(`✅ Transferencia realizada: ${data.message}`);
        setFromAccount("");
        setToAccount("");
        setAmount("");
      })
      .catch(() => setMessage("❌ Error al realizar la transferencia"));
  };

  return (
    <form onSubmit={handleTransfer} className="space-y-4">
      {/* Cuenta de origen */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Cuenta de origen
        </label>
        <input
          type="text"
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
          placeholder="Ej: Cuenta A"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
        />
      </div>

      {/* Cuenta destino */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Cuenta destino
        </label>
        <input
          type="text"
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          placeholder="Ej: Cuenta B"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
        />
      </div>

      {/* Monto */}
      <div>
        <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
          <BanknotesIcon className="h-5 w-5 text-green-500" />
          Monto
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Ej: 100"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
      >
        <PaperAirplaneIcon className="h-5 w-5" />
        Enviar transferencia
      </button>

      {/* Mensaje de respuesta */}
      {message && (
        <div className="mt-3 text-center font-medium text-sm text-gray-700">
          {message}
        </div>
      )}
    </form>
  );
}
