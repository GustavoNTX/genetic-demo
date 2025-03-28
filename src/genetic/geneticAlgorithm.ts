import { Dragon } from "./Dragon";

// Função para garantir que os genes estão entre 0 e 100
function clampGeneValue(value: number): number {
  return Math.max(0, Math.min(100, value));
}

// Cálculo de fitness
export function calculateFitness(dragon: Dragon): number {
  const { flightTime, strength, fireBreath } = dragon.genes;
  return flightTime * 0.4 + strength * 0.3 + fireBreath * 0.3;
}

// Cor baseada no fitness
export function getColorByFitness(fitness: number): string {
  if (fitness > 80) return "gold";
  if (fitness > 60) return "red";
  if (fitness > 40) return "blue";
  return "gray";
}

// Criar a população inicial
export function createInitialPopulation(size: number): Dragon[] {
  return Array.from({ length: size }, (_, i) => {
    const genes = {
      flightTime: Math.random() * 100,
      strength: Math.random() * 100,
      fireBreath: Math.random() * 100,
    };

    const fitness = calculateFitness({ id: i, genes, fitness: 0, color: "", size: 1 });

    return {
      id: i,
      genes,
      fitness,
      color: getColorByFitness(fitness),
      size: 1,
    };
  });
}

// Mutação com três tipos
export function mutate(dragon: Dragon, mutationRate: number = 0.1, mutationType: string = "random"): Dragon {
  if (Math.random() < mutationRate) {
    switch (mutationType) {
      case "random":
        dragon.genes.flightTime += Math.random() * 40 - 20;
        dragon.genes.strength += Math.random() * 40 - 20;
        dragon.genes.fireBreath += Math.random() * 40 - 20;
        break;
      case "small":
        dragon.genes.flightTime += Math.random() * 5 - 2.5;
        dragon.genes.strength += Math.random() * 5 - 2.5;
        dragon.genes.fireBreath += Math.random() * 5 - 2.5;
        break;
      case "directed":
        dragon.genes.flightTime += 5;
        dragon.genes.strength += Math.random() * 10 - 5;
        dragon.genes.fireBreath += 5;
        break;
      default:
        break;
    }

    // Garantir que os valores dos genes estão entre 0 e 100
    dragon.genes.flightTime = clampGeneValue(dragon.genes.flightTime);
    dragon.genes.strength = clampGeneValue(dragon.genes.strength);
    dragon.genes.fireBreath = clampGeneValue(dragon.genes.fireBreath);
  }

  // Recalcular fitness e cor após a mutação
  dragon.fitness = calculateFitness(dragon);
  dragon.color = getColorByFitness(dragon.fitness);

  return dragon;
}

// Seleção por roleta
export function selectParents(population: Dragon[]): Dragon[] {
  const totalFitness = population.reduce((total, dragon) => total + dragon.fitness, 0);
  const selectedParents: Dragon[] = [];

  for (let i = 0; i < population.length / 2; i++) {
    let randomValue = Math.random() * totalFitness;
    let accumulatedFitness = 0;
    for (let dragon of population) {
      accumulatedFitness += dragon.fitness;
      if (accumulatedFitness >= randomValue) {
        selectedParents.push(dragon);
        break;
      }
    }
  }

  return selectedParents;
}

// Crossover de um ponto, uniforme e aritmético
export function crossover(parent1: Dragon, parent2: Dragon, type: string): Dragon {
  switch (type) {
    case "one-point":
      const crossoverPoint = Math.random();
      return {
        id: Math.random(),
        genes: {
          flightTime: crossoverPoint < 0.5 ? parent1.genes.flightTime : parent2.genes.flightTime,
          strength: crossoverPoint < 0.5 ? parent1.genes.strength : parent2.genes.strength,
          fireBreath: crossoverPoint < 0.5 ? parent1.genes.fireBreath : parent2.genes.fireBreath,
        },
        fitness: 0,
        color: "",
        size: 1,
      };

    case "uniform":
      return {
        id: Math.random(),
        genes: {
          flightTime: Math.random() < 0.5 ? parent1.genes.flightTime : parent2.genes.flightTime,
          strength: Math.random() < 0.5 ? parent1.genes.strength : parent2.genes.strength,
          fireBreath: Math.random() < 0.5 ? parent1.genes.fireBreath : parent2.genes.fireBreath,
        },
        fitness: 0,
        color: "",
        size: 1,
      };

    case "arithmetic":
      return {
        id: Math.random(),
        genes: {
          flightTime: (parent1.genes.flightTime + parent2.genes.flightTime) / 2,
          strength: (parent1.genes.strength + parent2.genes.strength) / 2,
          fireBreath: (parent1.genes.fireBreath + parent2.genes.fireBreath) / 2,
        },
        fitness: 0,
        color: "",
        size: 1,
      };

    default:
      return parent1;
  }
}

// Evolução da população
export function evolvePopulation(population: Dragon[], mutationType: string = "random", crossoverType: string = "uniform"): Dragon[] {
  const parents = selectParents(population);
  const newPopulation: Dragon[] = [];

  while (newPopulation.length < population.length) {
    const parent1 = parents[Math.floor(Math.random() * parents.length)];
    const parent2 = parents[Math.floor(Math.random() * parents.length)];

    let offspring = crossover(parent1, parent2, crossoverType);
    offspring = mutate(offspring, 0.1, mutationType);

    newPopulation.push(offspring);
  }

  return newPopulation;
}
