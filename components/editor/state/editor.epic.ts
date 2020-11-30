import { GitmojiSelectAction, TypeSelectAction } from 'components/preset/state/preset.action';
import { Epic } from 'redux-observable';
import { PlainAction } from 'redux-typed-actions';
import { concat, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { requestValidation } from 'shared/api';
import { AppState } from 'state';

import { EditorFormatAction, EditorLoadAction, EditorUpdatedAction } from './editor.action';

export const updateValidation: Epic<PlainAction, PlainAction, AppState> = (action$, store$) =>
  action$
    .ofType(
      EditorUpdatedAction.type,
      EditorFormatAction.type,
      GitmojiSelectAction.type,
      TypeSelectAction.type,
    )
    .pipe(
      debounceTime(250),
      switchMap(() =>
        concat(
          of(EditorLoadAction.strictGet(true)),
          requestValidation(store$.value.editor.editorValue, store$.value.config.configValue),
          of(EditorLoadAction.strictGet(false)),
        ),
      ),
    );
