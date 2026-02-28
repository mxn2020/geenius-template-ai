import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Dashboard() {
  const [count, setCount] = useState(0);
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">App Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <p className="mb-4 text-gray-600">This template includes interactive state management. Ask the AI to build out tables, charts, or any interactive application feature you need.</p>
        <button onClick={() => setCount(c => c + 1)} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          State Hook Count: {count}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        <aside className="w-64 bg-white border-r p-4 hidden md:block">
          <div className="font-bold text-xl text-indigo-600 mb-8">SaaS Platform</div>
          <nav className="space-y-2">
            <Link to="/" className="block px-4 py-2 rounded bg-indigo-50 text-indigo-700 font-medium">Dashboard</Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto"><Routes><Route path="/" element={<Dashboard />} /></Routes></main>
      </div>
    </BrowserRouter>
  );
}
