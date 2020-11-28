import configReducer from 'components/config/state/config.reducer';
import editorReducer from 'components/editor/state/editor.reducer';
import { produce } from 'immer';
import { createMigrate, persistReducer } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { PlainAction } from 'redux-typed-actions';
import { AppState } from 'state';

import { migrations } from './migrations';

const editorFilter = createBlacklistFilter('editor', ['loading']);

const configFilter = createBlacklistFilter('config', ['loading']);

const persistConfig = {
  version: 0,
  key: 'root',
  storage,
  transforms: [editorFilter, configFilter],
  debounce: 250,
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations, { debug: process.env.NEXT_PUBLIC_BUILD !== 'prod' }),
};

const rootReducer = produce((state: AppState = new AppState(), action: PlainAction): void => {
  state.editor = editorReducer(state.editor, action, state);
  state.config = configReducer(state.config, action);
}, new AppState());

const persistedReducer = persistReducer<AppState>(persistConfig, rootReducer);

export default persistedReducer;
