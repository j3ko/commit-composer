import { PlainAction } from 'redux-typed-actions';
import { ConfigState } from 'state';

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
  let result = state;

  if (ConfigUpdatedAction.is(action)) {
    result = {
      ...state,
      configValue: action.payload,
    };
  } else if (RulesetParseAsync.success.is(action)) {
    result = {
      ...state,
      ruleset: action.payload,
    };
  } else if (RulesetParseAsync.failure.is(action)) {
    result = {
      ...state,
      ruleset: undefined,
    };
  } else if (OpenConfigAction.is(action)) {
    result = {
      ...state,
      isOpen: action.payload,
    };
  } else if (ConfigLoadAction.is(action)) {
    result = {
      ...state,
      loading: action.payload,
    };
  }

  return result;
};

export default configReducer;
