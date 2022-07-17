import StructuresLevels from 'src/entities/structures/structures.levels.entity';

export const structuresLevelsSeed: Partial<StructuresLevels>[] = [
  {
    name: 'budynek',
    hierarchy: 1,
  },
  {
    name: 'wydział',
    hierarchy: 2,
  },
  {
    name: 'kierunek',
    hierarchy: 3,
  },
];

export default structuresLevelsSeed;
