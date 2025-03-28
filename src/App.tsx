import { useState } from "react";
import DragonSVG from "./components/DragonSVG";
import { createInitialPopulation, evolvePopulation } from "./genetic/geneticAlgorithm";
import { Dragon } from "./genetic/Dragon";

export default function App() {
  const [dragons, setDragons] = useState<Dragon[]>(() => createInitialPopulation(10));
  const [mutationType, setMutationType] = useState("random");
  const [crossoverType, setCrossoverType] = useState("uniform");
  const [generationCount, setGenerationCount] = useState(0);

  const handleEvolve = () => {
    setGenerationCount((prev) => prev + 1);
    setDragons((prev) => evolvePopulation(prev, mutationType, crossoverType));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Evolução dos Dragões</h1>
      <div className="flex justify-center gap-4 mb-4">
        <button onClick={handleEvolve} className="p-2 bg-blue-500 text-white rounded">
          Evoluir Geração
        </button>
      </div>
      <p className="text-center mb-4">Geração Atual: {generationCount}</p>
      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        {dragons.map((dragon) => (
          <div key={dragon.id} className="card p-4 bg-white shadow-md rounded-md">
            <DragonSVG color={dragon.color} size={dragon.size} />
            <div>
              <p>Voo: {dragon.genes.flightTime.toFixed(2)}</p>
              <p>Força: {dragon.genes.strength.toFixed(2)}</p>
              <p>Baforada de Fogo: {dragon.genes.fireBreath.toFixed(2)}</p>
              <p>Aptidão: {dragon.fitness.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <select onChange={(e) => setMutationType(e.target.value)} value={mutationType}>
          <option value="random">Mutação Aleatória</option>
          <option value="small">Mutação Pequena</option>
          <option value="directed">Mutação Dirigida</option>
        </select>
        <select onChange={(e) => setCrossoverType(e.target.value)} value={crossoverType}>
          <option value="uniform">Crossover Uniforme</option>
          <option value="one-point">Crossover de Um Ponto</option>
          <option value="arithmetic">Crossover Aritmético</option>
        </select>
      </div>
    </div>
  );
}
