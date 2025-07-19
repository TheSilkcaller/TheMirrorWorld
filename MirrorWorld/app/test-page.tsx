"use client";

import { useState } from "react";

export default function TestPage() {
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    setShowAlert(true);
    alert("Click works!");
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl text-center mb-8">Test Page</h1>
      <div className="text-center">
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          Click Me
        </button>
        {showAlert && <p className="mt-4 text-green-400">Button clicked!</p>}
      </div>
    </main>
  );
}
