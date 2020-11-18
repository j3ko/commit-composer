import { QualifiedConfig } from '@commitlint/types';
import { GitmojiDefinition } from 'shared/presets/gitmojis';
import { TypeDefinition } from 'shared/presets/types';

import { Commit } from '../../dtos/lint-result.dto';
import { CommitMessageLib } from '../commit-message.lib';

describe('commit-message', () => {
  test('format() - body-max-line-length - single line', () => {
    const commit: Commit = {
      raw: 'chore: validate commit message\r\n\r\nLorem ipsum dolor sit amet',
      header: 'chore: validate commit message',
      type: 'chore:',
      scope: null,
      subject: null,
      body: 'Lorem ipsum dolor sit amet',
      footer: null,
      mentions: [],
      notes: [],
      references: [],
      revert: null,
      merge: null,
    };

    const config: QualifiedConfig = {
      extends: [],
      formatter: '',
      rules: {
        'body-max-line-length': [0, 'always', 25],
      },
      parserPreset: undefined,
      ignores: [],
      defaultIgnores: true,
      plugins: undefined,
    };

    const result = CommitMessageLib.format(commit, config);
    expect(result).toBe('chore: validate commit message\r\n\r\nLorem ipsum dolor sit\r\namet');
  });

  test('format() - footer-max-line-length - single line', () => {
    const commit: Commit = {
      raw: 'chore: validate\r\n\r\nbody\r\n\r\nBREAKING CHANGE: Lorem ipsum dolor',
      header: 'chore: validate',
      type: 'chore:',
      scope: null,
      subject: null,
      body: 'Lorem ipsum dolor sit amet',
      footer: 'BREAKING CHANGE: Lorem ipsum dolor',
      mentions: [],
      notes: [],
      references: [],
      revert: null,
      merge: null,
    };

    const config: QualifiedConfig = {
      extends: [],
      formatter: '',
      rules: {
        'footer-max-line-length': [0, 'always', 30],
      },
      parserPreset: undefined,
      ignores: [],
      defaultIgnores: true,
      plugins: undefined,
    };

    const result = CommitMessageLib.format(commit, config);
    expect(result).toBe('chore: validate\r\n\r\nbody\r\n\r\nBREAKING CHANGE: Lorem ipsum\r\ndolor');
  });

  test('setGitmoji() - empty message', () => {
    const message = '';
    const gitmoji: GitmojiDefinition = {
      icon: '🎉',
      markdown: ':tada:',
      description: 'Begin a project.',
    };

    const result = CommitMessageLib.setGitmoji(message, gitmoji);
    expect(result).toBe(` ${gitmoji.markdown} `);
  });

  test('setGitmoji() - type only', () => {
    const message = 'chore:';
    const gitmoji: GitmojiDefinition = {
      icon: '🎉',
      markdown: ':tada:',
      description: 'Begin a project.',
    };

    const result = CommitMessageLib.setGitmoji(message, gitmoji);
    expect(result).toBe(`chore: ${gitmoji.markdown} `);
  });

  test('setGitmoji() - type and existing gitmoji', () => {
    const message = 'chore: :rocket:';
    const gitmoji: GitmojiDefinition = {
      icon: '🎉',
      markdown: ':tada:',
      description: 'Begin a project.',
    };

    const result = CommitMessageLib.setGitmoji(message, gitmoji);
    expect(result).toBe(`chore: ${gitmoji.markdown} `);
  });

  test('setGitmoji() - type and subject', () => {
    const message = 'chore: validate gitmoji';
    const gitmoji: GitmojiDefinition = {
      icon: '🎉',
      markdown: ':tada:',
      description: 'Begin a project.',
    };

    const result = CommitMessageLib.setGitmoji(message, gitmoji);
    expect(result).toBe(`chore: ${gitmoji.markdown} validate gitmoji`);
  });

  test('setGitmoji() - type, subject and existing gitmoji', () => {
    const message = 'chore: :rocket: validate gitmoji';
    const gitmoji: GitmojiDefinition = {
      icon: '🎉',
      markdown: ':tada:',
      description: 'Begin a project.',
    };

    const result = CommitMessageLib.setGitmoji(message, gitmoji);
    expect(result).toBe(`chore: ${gitmoji.markdown} validate gitmoji`);
  });

  test('setGitmoji() - type, subject and body', () => {
    const message = 'chore: validate gitmoji\r\n\r\nthis is a body';
    const gitmoji: GitmojiDefinition = {
      icon: '🎉',
      markdown: ':tada:',
      description: 'Begin a project.',
    };

    const result = CommitMessageLib.setGitmoji(message, gitmoji);
    expect(result).toBe(`chore: ${gitmoji.markdown} validate gitmoji\r\n\r\nthis is a body`);
  });

  test('setType() - empty message', () => {
    const message = '';
    const type: TypeDefinition = {
      key: 'fix',
      title: 'Bug Fixes',
      description: 'A bug fix',
    };

    const result = CommitMessageLib.setType(message, type);
    expect(result).toBe(`${type.key}: `);
  });

  test('setType() - existing type', () => {
    const message = 'chore:';
    const type: TypeDefinition = {
      key: 'fix',
      title: 'Bug Fixes',
      description: 'A bug fix',
    };

    const result = CommitMessageLib.setType(message, type);
    expect(result).toBe(`${type.key}: `);
  });

  test('setType() - gitmoji', () => {
    const message = ':tada:';
    const type: TypeDefinition = {
      key: 'fix',
      title: 'Bug Fixes',
      description: 'A bug fix',
    };

    const result = CommitMessageLib.setType(message, type);
    expect(result).toBe(`${type.key}: :tada:`);
  });

  test('setType() - existing type and gitmoji', () => {
    const message = 'chore: :tada:';
    const type: TypeDefinition = {
      key: 'fix',
      title: 'Bug Fixes',
      description: 'A bug fix',
    };

    const result = CommitMessageLib.setType(message, type);
    expect(result).toBe(`${type.key}: :tada:`);
  });

  test('setType() - existing type, gitmoji and subject', () => {
    const message = 'chore: :tada: test message';
    const type: TypeDefinition = {
      key: 'fix',
      title: 'Bug Fixes',
      description: 'A bug fix',
    };

    const result = CommitMessageLib.setType(message, type);
    expect(result).toBe(`${type.key}: :tada: test message`);
  });

  test('setType() - existing type, gitmoji, subject and body', () => {
    const message = 'chore: :tada: test message\r\n\r\nbody';
    const type: TypeDefinition = {
      key: 'fix',
      title: 'Bug Fixes',
      description: 'A bug fix',
    };

    const result = CommitMessageLib.setType(message, type);
    expect(result).toBe(`${type.key}: :tada: test message\r\n\r\nbody`);
  });

  test('setType() - gitmoji, subject and body', () => {
    const message = ':tada: test message\r\n\r\nbody';
    const type: TypeDefinition = {
      key: 'fix',
      title: 'Bug Fixes',
      description: 'A bug fix',
    };

    const result = CommitMessageLib.setType(message, type);
    expect(result).toBe(`${type.key}: :tada: test message\r\n\r\nbody`);
  });
});
