import { RulesetParseAsync } from 'components/config/state/config.action';
import { ValidationUpdatedAsync } from 'components/editor/state/editor.action';
import { LintConfigDTO } from 'dtos/lint-config.dto';
import { LintSubjectDTO } from 'dtos/lint-subject.dto';
import { RulesetResultDTO } from 'dtos/ruleset-result.dto';
import { PlainAction } from 'redux-typed-actions';
import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { ValidationResult } from 'state';

export function requestRuleset(
  file: string,
): Observable<PlainAction<RulesetResultDTO, string> | PlainAction<string, string>> {
  const payload: LintConfigDTO = {
    file,
    type: 'json',
  };

  return ajax.post('/api/ruleset', payload, { 'Content-Type': 'application/json' }).pipe(
    map((x) => RulesetParseAsync.success.strictGet(x.response)),
    catchError((err) => of(RulesetParseAsync.failure.strictGet(err))),
  );
}

export function requestValidation(
  message: string,
  file: string,
): Observable<PlainAction<string, string> | PlainAction<ValidationResult, string>> {
  const payload: LintSubjectDTO = {
    message,
    config: {
      file,
      type: 'json',
    },
  };

  return ajax.post('/api/lint', payload, { 'Content-Type': 'application/json' }).pipe(
    map((x) => ValidationUpdatedAsync.success.strictGet(x.response)),
    catchError((err) => of(ValidationUpdatedAsync.failure.strictGet(err))),
  );
}
