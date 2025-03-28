// src/genetic/Population.ts
import { Individual } from "./Individual";

export class Population {
  individuals: Individual[];

  constructor(size: number, geneLength: number) {
    this.individuals = Array.from({ length: size }, () =>
      new Individual(Population.randomGenes(geneLength))
    );
  }

  private static randomGenes(length: number): number[] {
    // Exemplo: gera genes com valores inteiros entre 0 e 10
    return Array.from({ length }, () => Math.floor(Math.random() * 11));
  }

  evaluate(): void {
    this.individuals.forEach(ind => ind.calculateFitness());
  }
}
