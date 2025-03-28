// src/genetic/Individual.ts
export class Individual {
    genes: number[];
    fitness: number;
  
    constructor(genes: number[]) {
      this.genes = genes;
      this.fitness = 0;
    }
  
    // Exemplo simples de função fitness: soma dos genes (você pode ajustar conforme o problema)
    calculateFitness(): number {
      this.fitness = this.genes.reduce((acc, val) => acc + val, 0);
      return this.fitness;
    }
  }
  