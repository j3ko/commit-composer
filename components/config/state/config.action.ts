import { RulesetResultDTO } from 'dtos/ruleset-result.dto';
import { defineAction, defineScenarioAction } from 'redux-typed-actions';

export const ConfigUpdatedAction = defineAction<string>('ConfigUpdatedAction');
export const RulesetParseAsync = defineScenarioAction<undefined, RulesetResultDTO, string>(
  'RulesetParseAsync',
);
export const OpenConfigAction = defineAction<boolean>('OpenConfigAction');
export const ConfigLoadAction = defineAction<boolean>('ConfigLoadAction');
