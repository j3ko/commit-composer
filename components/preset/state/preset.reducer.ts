import { RulesetParseAsync } from 'components/config/state/config.action';
import { PlainAction } from 'redux-typed-actions';
import { LRUCache } from 'shared/lru-cache';
import { GitmojiDefinition } from 'shared/presets/gitmojis';
import { TypeDefinition } from 'shared/presets/types';
import { PresetState } from 'state';

import {
  GitmojiSelectAction,
  ScopeSelectAction,
  ToggleShortcodeAction,
  TypeSelectAction,
} from './preset.action';

const presetReducer = (
  state: PresetState = new PresetState(),
  action: PlainAction,
): PresetState => {
  if (GitmojiSelectAction.is(action)) {
    const { payload } = action;
    if (payload) {
      const map = state.recentGitmojis.map((x) => ({ key: x.shortcode, value: x }));
      const cache = new LRUCache<GitmojiDefinition>(map, 20);
      cache.write(payload.shortcode, payload);
      state.recentGitmojis = cache.toArray();
    }
  } else if (TypeSelectAction.is(action)) {
    const { payload } = action;
    const map = state.recentTypes.map((x) => ({ key: x.key, value: x }));
    const cache = new LRUCache<TypeDefinition>(map, 20);
    cache.write(payload.key, payload);
    state.recentTypes = cache.toArray();
  } else if (ScopeSelectAction.is(action)) {
    const { payload } = action;
    const map = state.recentScopes.map((x) => ({ key: x, value: x }));
    const cache = new LRUCache<string>(map, 20);
    cache.write(payload, payload);
    state.recentScopes = cache.toArray();
  } else if (ToggleShortcodeAction.is(action)) {
    state.useShortcode = action.payload;
  } else if (RulesetParseAsync.success.is(action)) {
    const { payload } = action;
    const scopes = payload.ruleset?.rules['scope-enum'];
    state.scopes = scopes && scopes.length ? scopes[2] : [];
  }

  return state;
};

export default presetReducer;
