import { QualifiedConfig } from '@commitlint/types';

export class RulesetResultDTO {
  valid: boolean;
  ruleset?: QualifiedConfig;
}

export type { QualifiedConfig };
