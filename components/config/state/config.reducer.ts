import { PlainAction } from 'redux-typed-actions';
import { ConfigState, Ruleset } from 'state';

import {
  ConfigLoadAction,
  ConfigUpdatedAction,
  OpenConfigAction,
  RulesetParseAsync,
} from './config.action';

const configReducer = (
  state: ConfigState = new ConfigState(),
  action: PlainAction,
): ConfigState => {
  if (ConfigUpdatedAction.is(action)) {
    state.configValue = action.payload;
  } else if (RulesetParseAsync.success.is(action)) {
    const ruleset = new Ruleset();
    state.ruleset = {
      ...ruleset,
      ...action.payload,
    };
  } else if (RulesetParseAsync.failure.is(action)) {
    state.ruleset = undefined;
  } else if (OpenConfigAction.is(action)) {
    state.isOpen = action.payload;
  } else if (ConfigLoadAction.is(action)) {
    state.loading = action.payload;
  }

  return state;
};

export default configReducer;
