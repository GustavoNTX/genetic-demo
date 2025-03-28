import { useState } from "react";

interface GeneticFormProps {
  onRun: (params: {
    populationSize: number;
    geneLength: number;
    generations: number;
    tournamentSize: number;
    mutationRate: number;
  }) => void;
}

export default function GeneticForm({ onRun }: GeneticFormProps) {
  const [populationSize, setPopulationSize] = useState(50);
  const [geneLength, setGeneLength] = useState(10);
  const [generations, setGenerations] = useState(100);
  const [tournamentSize, setTournamentSize] = useState(5);
  const [mutationRate, setMutationRate] = useState(0.01);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRun({ populationSize, geneLength, generations, tournamentSize, mutationRate });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white border rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Configurar Algoritmo Genético</h2>
      
      <div className="space-y-3">
        <label className="block">
          <span className="text-gray-700">População:</span>
          <input 
            type="number" 
            value={populationSize} 
            onChange={e => setPopulationSize(+e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
          />
        </label>
        
        <label className="block">
          <span className="text-gray-700">Tamanho dos Genes:</span>
          <input 
            type="number" 
            value={geneLength} 
            onChange={e => setGeneLength(+e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
          />
        </label>
        
        <label className="block">
          <span className="text-gray-700">Gerações:</span>
          <input 
            type="number" 
            value={generations} 
            onChange={e => setGenerations(+e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
          />
        </label>
        
        <label className="block">
          <span className="text-gray-700">Tamanho do Torneio:</span>
          <input 
            type="number" 
            value={tournamentSize} 
            onChange={e => setTournamentSize(+e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
          />
        </label>
        
        <label className="block">
          <span className="text-gray-700">Taxa de Mutação:</span>
          <input 
            type="number" 
            step="0.01" 
            value={mutationRate} 
            onChange={e => setMutationRate(+e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
          />
        </label>
      </div>
      
      <button 
        type="submit" 
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition"
      >
        Rodar Algoritmo
      </button>
    </form>
  );
}