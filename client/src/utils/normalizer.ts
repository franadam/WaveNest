interface Normilizer {
  id: number;
}

export function normalizer<T extends Normilizer>(
  array: T[]
): {
  ids: number[];
  entities: { [id: string]: T };
} {
  const ids: number[] = array.map((entity) => entity.id);
  const entities: { [id: string]: T } = {};
  array.forEach((entity) => {
    entities[entity.id] = { ...entity };
  });
  return { ids, entities };
}
