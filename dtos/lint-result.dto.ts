import { Commit, LintOutcome, LintRuleOutcome, RuleConfigSeverity } from '@commitlint/types';

export interface LintResultDTO extends LintOutcome {
  commit?: Commit;
}

export type { Commit, LintOutcome, LintRuleOutcome, RuleConfigSeverity };
