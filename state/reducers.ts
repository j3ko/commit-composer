import configReducer from 'components/config/state/config.reducer';
import editorReducer from 'components/editor/state/editor.reducer';
import { persistReducer } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { PlainAction } from 'redux-typed-actions';
import { AppState } from 'state';

const editorFilter = createBlacklistFilter('editor', ['loading']);

const configFilter = createBlacklistFilter('config', ['loading']);

const persistConfig = {
  key: 'root',
  storage,
  transforms: [editorFilter, configFilter],
  debounce: 250,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = (state: AppState = new AppState(), action: PlainAction): AppState => {
  return {
    editor: editorReducer(state.editor, action, state),
    config: configReducer(state.config, action),
  };
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
