import {
  GitmojiSelectAction,
  ScopeSelectAction,
  TypeSelectAction,
} from 'components/preset/state/preset.action';
import { PlainAction } from 'redux-typed-actions';
import { CommitMessageLib } from 'shared/commit-message.lib';
import { AppState, EditorState } from 'state';

import {
  EditorFormatAction,
  EditorLoadAction,
  EditorUpdatedAction,
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
    state.editorValue = CommitMessageLib.setGitmoji(
      state.editorValue,
      payload,
      appState.preset.useShortcode,
    );
  } else if (TypeSelectAction.is(action)) {
    const { payload } = action;
    state.editorValue = CommitMessageLib.setType(state.editorValue, payload);
  } else if (ScopeSelectAction.is(action)) {
    const { payload } = action;
    state.editorValue = CommitMessageLib.setScope(state.editorValue, payload);
  }

  return state;
};

export default editorReducer;
