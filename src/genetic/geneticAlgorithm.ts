import { Individual } from "./Individual";
import { Population } from "./Population";

// Seleção por torneio: Escolhe o melhor entre N candidatos aleatórios
export function tournamentSelection(population: Population, tournamentSize: number): Individual {
  const tournament: Individual[] = [];
  for (let i = 0; i < tournamentSize; i++) {
    const randomIndex = Math.floor(Math.random() * population.individuals.length);
    tournament.push(population.individuals[randomIndex]);
  }
  return tournament.reduce((best, ind) => (ind.fitness > best.fitness ? ind : best));
}

// Crossover de um ponto
export function onePointCrossover(parent1: Individual, parent2: Individual): [Individual, Individual] {
  const geneLength = parent1.genes.length;
  const crossoverPoint = Math.floor(Math.random() * geneLength);

  const child1Genes = [
    ...parent1.genes.slice(0, crossoverPoint),
    ...parent2.genes.slice(crossoverPoint),
  ];
  const child2Genes = [
    ...parent2.genes.slice(0, crossoverPoint),
    ...parent1.genes.slice(crossoverPoint),
  ];

  return [new Individual(child1Genes), new Individual(child2Genes)];
}

// Mutação: altera aleatoriamente um gene com uma pequena probabilidade
export function mutate(ind: Individual, mutationRate: number): void {
  ind.genes = ind.genes.map(gene =>
    Math.random() < mutationRate ? Math.floor(Math.random() * 11) : gene
  );
}

// Algoritmo genético completo (loop evolutivo)
export function runGeneticAlgorithm({
  populationSize,
  geneLength,
  generations,
  tournamentSize,
  mutationRate,
}: {
  populationSize: number;
  geneLength: number;
  generations: number;
  tournamentSize: number;
  mutationRate: number;
}): Individual {
  let population = new Population(populationSize, geneLength);
  population.evaluate();

  let bestIndividual = population.individuals[0];

  for (let gen = 0; gen < generations; gen++) {
    const newIndividuals: Individual[] = [];

    // Criar nova geração
    while (newIndividuals.length < populationSize) {
      const parent1 = tournamentSelection(population, tournamentSize);
      const parent2 = tournamentSelection(population, tournamentSize);
      const [child1, child2] = onePointCrossover(parent1, parent2);

      mutate(child1, mutationRate);
      mutate(child2, mutationRate);

      child1.calculateFitness();
      child2.calculateFitness();

      newIndividuals.push(child1, child2);
    }

    population.individuals = newIndividuals;
    
    // Atualiza o melhor indivíduo encontrado
    const currentBest = population.individuals.reduce((best, ind) =>
      ind.fitness > best.fitness ? ind : best
    );
    if (currentBest.fitness > bestIndividual.fitness) {
      bestIndividual = currentBest;
    }
  }

  return bestIndividual;
}
