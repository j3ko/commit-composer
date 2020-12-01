import { defineAction } from 'redux-typed-actions';
import { GitmojiDefinition } from 'shared/presets/gitmojis';
import { TypeDefinition } from 'shared/presets/types';

export const GitmojiSelectAction = defineAction<GitmojiDefinition | null>('GitmojiSelectAction');
export const TypeSelectAction = defineAction<TypeDefinition>('TypeSelectAction');
export const ToggleShortcodeAction = defineAction<boolean>('ToggleShortcodeAction');
export const ScopeSelectAction = defineAction<string | null>('ScopeSelectAction');
