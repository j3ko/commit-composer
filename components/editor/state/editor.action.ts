import { defineAction, defineScenarioAction } from 'redux-typed-actions';
import { GitmojiDefinition } from 'shared/presets/gitmojis';
import { TypeDefinition } from 'shared/presets/types';
import { ValidationResult } from 'state';

export const EditorUpdatedAction = defineAction<string>('EditorUpdatedAction');
export const ValidationUpdatedAsync = defineScenarioAction<undefined, ValidationResult, string>(
  'ValidationUpdatedAsync',
);
export const EditorFormatAction = defineAction('EditorFormatAction');
export const EditorLoadAction = defineAction<boolean>('EditorLoadAction');
export const GitmojiSelectAction = defineAction<GitmojiDefinition>('GitmojiSelectAction');
export const TypeSelectAction = defineAction<TypeDefinition>('TypeSelectAction');
export const ToggleShortcodeAction = defineAction<boolean>('ToggleShortcodeAction');
