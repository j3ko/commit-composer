import { PlainAction } from 'redux-typed-actions';
import { CommitMessageLib } from 'shared/commit-message.lib';
import { AppState, EditorState } from 'state';

import {
  EditorFormatAction,
  EditorLoadAction,
  EditorUpdatedAction,
  GitmojiSelectAction,
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
    const editorValue = CommitMessageLib.setGitmoji(state.editorValue, action.payload);

    result = {
      ...state,
      editorValue,
      gitmoji: action.payload,
    };
  }

  return result;
};

export default editorReducer;
