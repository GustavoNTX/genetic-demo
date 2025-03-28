import { useState } from "react";
import DragonSVG from "./components/DragonSVG";
import { createInitialPopulation, evolvePopulation } from "./genetic/geneticAlgorithm";
import { Dragon } from "./genetic/Dragon";

export default function App() {
  const [randomDragons, setRandomDragons] = useState<Dragon[]>([]); 
  const [mutatedDragons, setMutatedDragons] = useState<Dragon[]>([]); 
  const [crossoverDragons, setCrossoverDragons] = useState<Dragon[]>([]); 
  const [feedbackMessage, setFeedbackMessage] = useState<string>(""); 

  const handleGenerateRandomDragons = () => {
    const newDragons = createInitialPopulation(5); 
    setRandomDragons(newDragons); 
    setFeedbackMessage("Dragões Aleatórios Gerados com Sucesso!");
  };

  const handleEvolve = (mutationType: string, crossoverType: string) => {
    const newDragons = evolvePopulation(randomDragons, mutationType, crossoverType);
    setMutatedDragons(newDragons); 
    setFeedbackMessage(`Mutação com tipo "${mutationType}" e crossover "${crossoverType}" aplicada!`);
  };

  const handleCrossover = (mutationType: string, crossoverType: string) => {
    const newDragons = evolvePopulation(randomDragons, mutationType, crossoverType);
    setCrossoverDragons(newDragons); 
    setFeedbackMessage(`Crossover de tipo "${crossoverType}" realizado com sucesso!`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Evolução dos Dragões</h1>

      {feedbackMessage && (
        <div className="text-center mb-4 text-green-500">
          <p>{feedbackMessage}</p>
        </div>
      )}

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={handleGenerateRandomDragons}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Gerar Dragões Aleatórios
        </button>
      </div>

      {randomDragons.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-center">Dragões Aleatórios</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {randomDragons.map((dragon, index) => (
              <div key={index} className="card p-4 bg-white shadow-md rounded-md">
                <DragonSVG color={dragon.color} size={dragon.size} />
                <div>
                  <p><strong>Voo:</strong> {dragon.genes.flightTime.toFixed(2)}</p>
                  <p><strong>Força:</strong> {dragon.genes.strength.toFixed(2)}</p>
                  <p><strong>Baforada de Fogo:</strong> {dragon.genes.fireBreath.toFixed(2)}</p>
                  <p><strong>Aptidão:</strong> {dragon.fitness.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-500">
            <h3 className="font-bold mb-2">Explicação do Fitness:</h3>
            <p>O fitness de um dragão é calculado como uma combinação ponderada das características de voo, força e baforada de fogo. A fórmula é:</p>
            <code>Fitness = (Voo * 0.4) + (Força * 0.3) + (Baforada de Fogo * 0.3)</code>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => handleEvolve("random", "uniform")}
          className="p-2 bg-green-500 text-white rounded"
        >
          Mutações Aleatórias
        </button>
        <button
          onClick={() => handleEvolve("small", "uniform")}
          className="p-2 bg-yellow-500 text-white rounded"
        >
          Mutações Pequenas
        </button>
        <button
          onClick={() => handleEvolve("directed", "uniform")}
          className="p-2 bg-red-500 text-white rounded"
        >
          Mutações Dirigidas
        </button>
      </div>

      {mutatedDragons.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-center">Dragões Mutados</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {mutatedDragons.map((dragon, index) => (
              <div key={index} className="card p-4 bg-white shadow-md rounded-md">
                <DragonSVG color={dragon.color} size={dragon.size} />
                <div>
                  <p><strong>Voo:</strong> {dragon.genes.flightTime.toFixed(2)}</p>
                  <p><strong>Força:</strong> {dragon.genes.strength.toFixed(2)}</p>
                  <p><strong>Baforada de Fogo:</strong> {dragon.genes.fireBreath.toFixed(2)}</p>
                  <p><strong>Aptidão:</strong> {dragon.fitness.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-500">
            <h3 className="font-bold mb-2">Explicação da Mutação:</h3>
            <p>A mutação é aplicada para alterar aleatoriamente os genes dos dragões (voo, força e baforada de fogo) para explorar novas soluções.</p>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => handleCrossover("random", "one-point")}
          className="p-2 bg-purple-500 text-white rounded"
        >
          Crossover de Um Ponto
        </button>
        <button
          onClick={() => handleCrossover("random", "uniform")}
          className="p-2 bg-indigo-500 text-white rounded"
        >
          Crossover Uniforme
        </button>
        <button
          onClick={() => handleCrossover("random", "arithmetic")}
          className="p-2 bg-pink-500 text-white rounded"
        >
          Crossover Aritmético
        </button>
      </div>

      {crossoverDragons.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-center">Dragões com Crossover</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {crossoverDragons.map((dragon, index) => (
              <div key={index} className="card p-4 bg-white shadow-md rounded-md">
                <DragonSVG color={dragon.color} size={dragon.size} />
                <div>
                  <p><strong>Voo:</strong> {dragon.genes.flightTime.toFixed(2)}</p>
                  <p><strong>Força:</strong> {dragon.genes.strength.toFixed(2)}</p>
                  <p><strong>Baforada de Fogo:</strong> {dragon.genes.fireBreath.toFixed(2)}</p>
                  <p><strong>Aptidão:</strong> {dragon.fitness.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-500">
            <h3 className="font-bold mb-2">Explicação do Crossover:</h3>
            <p>O crossover mistura os genes de dois pais para gerar um filho, buscando combinar as melhores características de cada um.</p>
          </div>
        </div>
      )}
    </div>
  );
}
