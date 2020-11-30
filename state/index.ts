import { Commit, LintResultDTO, LintRuleOutcome } from 'dtos/lint-result.dto';
import { QualifiedConfig, RulesetResultDTO } from 'dtos/ruleset-result.dto';
import { immerable } from 'immer';
import { GitmojiDefinition, GITMOJIS } from 'shared/presets/gitmojis';
import { TypeDefinition, TYPES } from 'shared/presets/types';

export enum ConfigPreset {
  Conventional = '@commitlint/config-conventional',
  Angular = '@commitlint/config-angular',
}

export class AppState {
  [immerable] = true;

  editor: EditorState = new EditorState();
  config: ConfigState = new ConfigState();
  preset: PresetState = new PresetState();
}

export class PresetState {
  [immerable] = true;

  recentGitmojis: GitmojiDefinition[] = [];
  types: TypeDefinition[] = [];
  recentTypes: TypeDefinition[] = [];
  scopes: string[] = [];
  recentScopes: string[] = [];
  useShortcode = false;
}

export class EditorState {
  [immerable] = true;

  editorValue?: string = 'chore: validate commit message';
  validationResult?: ValidationResult = new ValidationResult();
  loading = false;
}

export class ConfigState {
  [immerable] = true;

  configValue?: string;
  ruleset?: Ruleset = new Ruleset();
  isOpen = false;
  loading = false;
}

export class ValidationResult implements LintResultDTO {
  [immerable] = true;

  input = 'initial validation result';
  valid = true;
  errors: LintRuleOutcome[] = [];
  warnings: LintRuleOutcome[] = [];
  commit?: Commit;
}

export class Ruleset implements RulesetResultDTO {
  [immerable] = true;

  valid = true;
  ruleset?: QualifiedConfig;
}
