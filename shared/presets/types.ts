import * as list from 'conventional-commit-types';

export type TypeDefinition = {
  key: string;
  title: string;
  description?: string;
};

export const TYPES: TypeDefinition[] = Object.keys(list.types).map((key) => {
  return Object.assign({ key }, list.types[key]);
});
