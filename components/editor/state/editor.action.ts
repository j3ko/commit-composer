import { defineAction, defineScenarioAction } from 'redux-typed-actions';
import { ValidationResult } from 'state';

export const EditorUpdatedAction = defineAction<string>('EditorUpdatedAction');
export const ValidationUpdatedAsync = defineScenarioAction<undefined, ValidationResult, string>(
  'ValidationUpdatedAsync',
);
export const EditorFormatAction = defineAction('EditorFormatAction');
export const EditorLoadAction = defineAction<boolean>('EditorLoadAction');
