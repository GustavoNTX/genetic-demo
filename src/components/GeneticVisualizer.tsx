interface GeneticVisualizerProps {
    bestIndividual: { genes: number[]; fitness: number } | null;
  }
  
  export default function GeneticVisualizer({ bestIndividual }: GeneticVisualizerProps) {
    if (!bestIndividual) return <p className="text-gray-600 text-center">Nenhum resultado disponível.</p>;
  
    return (
      <div className="p-6 bg-white border rounded-lg shadow-lg mt-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-3 text-gray-800">Melhor Indivíduo</h2>
        <p className="text-gray-700"><strong>Genes:</strong> {bestIndividual.genes.join(", ")}</p>
        <p className="text-gray-700"><strong>Fitness:</strong> {bestIndividual.fitness}</p>
      </div>
    );
  }
