import configReducer from 'components/config/state/config.reducer';
import editorReducer from 'components/editor/state/editor.reducer';
import { PlainAction } from 'redux-typed-actions';
import { AppState } from 'state';

const rootReducer = (state: AppState = new AppState(), action: PlainAction): AppState => {
  return {
    editor: editorReducer(state.editor, action, state),
    config: configReducer(state.config, action),
  };
};

export default rootReducer;
