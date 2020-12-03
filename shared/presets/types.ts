import * as list from 'conventional-commit-types';

export type TypeEntry = {
  title: string;
  description?: string;
};

export type TypeDefinition = TypeEntry & {
  key: string;
};

export const TYPE_LOOKUP: { [key: string]: TypeEntry } = list.types;

export const TYPES: TypeDefinition[] = Object.keys(list.types).map((key) => {
  return Object.assign({ key }, list.types[key]);
});
