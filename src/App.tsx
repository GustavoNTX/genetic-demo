import { useState } from "react";
import GeneticForm from "./components/GeneticForm";
import GeneticVisualizer from "./components/GeneticVisualizer";
import { runGeneticAlgorithm } from "./genetic/geneticAlgorithm";

function App() {
  const [bestIndividual, setBestIndividual] = useState<{ genes: number[]; fitness: number } | null>(null);

  const handleRunAlgorithm = (params: {
    populationSize: number;
    geneLength: number;
    generations: number;
    tournamentSize: number;
    mutationRate: number;
  }) => {
    const best = runGeneticAlgorithm(params);
    setBestIndividual({ genes: best.genes, fitness: best.fitness });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Algoritmo Genético - Demonstração</h1>
      <GeneticForm onRun={handleRunAlgorithm} />
      <GeneticVisualizer bestIndividual={bestIndividual} />
    </div>
  );
}

export default App;
