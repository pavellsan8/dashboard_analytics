// src/App.jsx
import React, { useState } from 'react';
import KPIOverview from './components/KPI/kpiOverview';
import Sidebar  from './components/Sidebar/Sidebar';
import './styles/App.css';

function App() {
  const [timeRange, setTimeRange] = useState('yearly');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Sales Analytics Dashboard
          </h1>
        </header>
        <main>
          <KPIOverview />
        </main>
      </div>
    </div>
  );
}

export default App;