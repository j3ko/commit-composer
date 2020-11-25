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
  let result = state;

  if (EditorUpdatedAction.is(action)) {
    result = {
      ...state,
      editorValue: action.payload,
    };
  } else if (ValidationUpdatedAsync.success.is(action)) {
    result = {
      ...state,
      validationResult: action.payload,
    };
  } else if (ValidationUpdatedAsync.failure.is(action)) {
    result = {
      ...state,
      validationResult: undefined,
    };
  } else if (EditorFormatAction.is(action)) {
    if (state.validationResult && appState.config.ruleset) {
      const editorValue = CommitMessageLib.format(
        state.validationResult.commit,
        appState.config.ruleset.ruleset,
      );

      result = {
        ...state,
        editorValue,
      };
    }
  } else if (EditorLoadAction.is(action)) {
    result = {
      ...state,
      loading: action.payload,
    };
  } else if (GitmojiSelectAction.is(action)) {
    const { payload } = action;
    const editorValue = CommitMessageLib.setGitmoji(state.editorValue, payload);
    const map = state.recentGitmojis.map((x) => ({ key: x.markdown, value: x }));
    const cache = new LRUCache<GitmojiDefinition>(map, 20);
    cache.write(payload.markdown, payload);
    const recentGitmojis = cache.toArray();

    result = {
      ...state,
      editorValue,
      recentGitmojis,
    };
  } else if (TypeSelectAction.is(action)) {
    const { payload } = action;
    const editorValue = CommitMessageLib.setType(state.editorValue, action.payload);
    const map = state.recentTypes.map((x) => ({ key: x.key, value: x }));
    const cache = new LRUCache<TypeDefinition>(map, 20);
    cache.write(payload.key, payload);
    const recentTypes = cache.toArray();

    result = {
      ...state,
      editorValue,
      recentTypes,
    };
  }

  return result;
};

export default editorReducer;
