"use client"
import { useState } from 'react';

const CarbonOffsetCalculator: React.FC = () => {
  const [emissions, setEmissions] = useState<number>(0);
  const [cost, setCost] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Hypothetical cost per tonne of CO2e to offset
  const COST_PER_TONNE = 28; // Example price in dollars

  const calculateOffsetCost = (emissions: number) => {
    if (isNaN(emissions) || emissions < 0) {
      setError("Please enter a valid number for emissions.");
      setCost(null);
    } else {
      setError(null);
      setCost(emissions * COST_PER_TONNE);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Carbon Offset Calculator</h1>
      <div className="mb-4">
        <label htmlFor="emissions" className="block text-sm font-medium text-gray-700">
          Enter your carbon emissions (metric tonnes CO2e):
        </label>
        <input 
          id="emissions"
          type="number"
          value={emissions}
          onChange={(e) => setEmissions(Number(e.target.value))}
          className="mt-1 block w-25 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button 
        onClick={() => calculateOffsetCost(emissions)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Calculate Cost
      </button>
      
      {error && <p className="text-red-500">{error}</p>}
      {cost !== null && (
        <p className="text-green-600">
          The cost to offset {emissions} tonnes of CO2e is approximately ${cost.toFixed(2)}.
        </p>
      )}
    </div>
  );
};

export default CarbonOffsetCalculator;