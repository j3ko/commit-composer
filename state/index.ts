import { Commit, LintResultDTO, LintRuleOutcome } from 'dtos/lint-result.dto';
import { QualifiedConfig, RulesetResultDTO } from 'dtos/ruleset-result.dto';
import { GitmojiDefinition } from 'shared/presets/gitmojis';

export enum ConfigPreset {
  Conventional = '@commitlint/config-conventional',
  Angular = '@commitlint/config-angular',
}

export class AppState {
  editor: EditorState = new EditorState();
  config: ConfigState = new ConfigState();
}

export class EditorState {
  editorValue?: string = 'chore: validate commit message';
  validationResult?: ValidationResult = new ValidationResult();
  loading = false;
  gitmoji?: GitmojiDefinition;
}

export class ConfigState {
  configValue?: string;
  ruleset?: Ruleset = new Ruleset();
  isOpen = false;
  loading = false;
}

export class ValidationResult implements LintResultDTO {
  input = 'initial validation result';
  valid = true;
  errors: LintRuleOutcome[] = [];
  warnings: LintRuleOutcome[] = [];
  commit?: Commit;
}

export class Ruleset implements RulesetResultDTO {
  valid = true;
  ruleset?: QualifiedConfig;
}
