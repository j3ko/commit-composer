import { PlainAction } from 'redux-typed-actions';
import { CommitMessageLib } from 'shared/commit-message.lib';
import { LRUCache } from 'shared/lru-cache';
import { GitmojiDefinition } from 'shared/presets/gitmojis';
import { TypeDefinition } from 'shared/presets/types';
import { AppState, EditorState } from 'state';

import {
  EditorFormatAction,
  EditorLoadAction,
  EditorUpdatedAction,
  GitmojiSelectAction,
  TypeSelectAction,
  ValidationUpdatedAsync,
} from './editor.action';

const editorReducer = (
  state: EditorState = new EditorState(),
  action: PlainAction,
  appState: AppState,
): EditorState => {
  if (EditorUpdatedAction.is(action)) {
    state.editorValue = action.payload;
  } else if (ValidationUpdatedAsync.success.is(action)) {
    state.validationResult = action.payload;
  } else if (ValidationUpdatedAsync.failure.is(action)) {
    state.validationResult = undefined;
  } else if (EditorFormatAction.is(action)) {
    if (state.validationResult && appState.config.ruleset) {
      state.editorValue = CommitMessageLib.format(
        state.validationResult.commit,
        appState.config.ruleset.ruleset,
      );
    }
  } else if (EditorLoadAction.is(action)) {
    state.loading = action.payload;
  } else if (GitmojiSelectAction.is(action)) {
    const { payload } = action;
    state.editorValue = CommitMessageLib.setGitmoji(state.editorValue, payload);

    const map = state.recentGitmojis.map((x) => ({ key: x.shortcode, value: x }));
    const cache = new LRUCache<GitmojiDefinition>(map, 20);
    cache.write(payload.shortcode, payload);
    state.recentGitmojis = cache.toArray();
  } else if (TypeSelectAction.is(action)) {
    const { payload } = action;
    state.editorValue = CommitMessageLib.setType(state.editorValue, action.payload);

    const map = state.recentTypes.map((x) => ({ key: x.key, value: x }));
    const cache = new LRUCache<TypeDefinition>(map, 20);
    cache.write(payload.key, payload);
    state.recentTypes = cache.toArray();
  }

  return state;
};

export default editorReducer;
