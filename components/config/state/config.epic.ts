import { EditorUpdatedAction } from 'components/editor/state/editor.action';
import { Epic } from 'redux-observable';
import { PlainAction } from 'redux-typed-actions';
import { concat, merge, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { requestRuleset } from 'shared/api';
import { AppState } from 'state';

import { ConfigLoadAction, ConfigUpdatedAction } from './config.action';

export const updateConfig: Epic<PlainAction, PlainAction, AppState> = (action$, store$) =>
  action$.ofType(ConfigUpdatedAction.type).pipe(
    debounceTime(250),
    switchMap((x) =>
      concat(
        of(ConfigLoadAction.strictGet(true)),
        requestRuleset(x.payload),
        of(ConfigLoadAction.strictGet(false)),
      ),
    ),
    switchMap((x) =>
      typeof x.payload === 'object' && x.payload.valid
        ? merge(of(EditorUpdatedAction.strictGet(store$.value.editor.editorValue)), of(x))
        : of(x),
    ),
  );
