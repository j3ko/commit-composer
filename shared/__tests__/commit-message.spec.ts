import { QualifiedConfig } from '@commitlint/types';

import { Commit } from '../../dtos/lint-result.dto';
import { CommitMessageLib } from '../commit-message.lib';
import { GitmojiDefinition, GITMOJIS } from '../presets/gitmojis';
import { TypeDefinition } from '../presets/types';

describe('commit-message', () => {
  /****************************************************
   * format()
   ****************************************************/
  describe('format()', () => {
    test('body-max-line-length - single line', () => {
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

    test('footer-max-line-length - single line', () => {
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
      expect(result).toBe(
        'chore: validate\r\n\r\nbody\r\n\r\nBREAKING CHANGE: Lorem ipsum\r\ndolor',
      );
    });
  });

  /****************************************************
   * setGitmoji()
   ****************************************************/
  describe('setGitmoji()', () => {
    test('empty message', () => {
      const message = '';
      const gitmoji: GitmojiDefinition = {
        icon: '🎉',
        shortcode: ':tada:',
        description: 'Begin a project.',
      };

      const result = CommitMessageLib.setGitmoji(message, gitmoji, true);
      expect(result).toBe(` ${gitmoji.shortcode} `);
    });

    test('empty message (unicode)', () => {
      const message = '';
      const gitmoji: GitmojiDefinition = {
        icon: '🎉',
        shortcode: ':tada:',
        description: 'Begin a project.',
      };

      const result = CommitMessageLib.setGitmoji(message, gitmoji, false);
      expect(result).toBe(` ${gitmoji.icon} `);
    });

    test('type only', () => {
      const message = 'chore:';
      const gitmoji: GitmojiDefinition = {
        icon: '🎉',
        shortcode: ':tada:',
        description: 'Begin a project.',
      };

      const result = CommitMessageLib.setGitmoji(message, gitmoji, true);
      expect(result).toBe(`chore: ${gitmoji.shortcode} `);
    });

    test('type only (unicode)', () => {
      const message = 'chore:';
      const gitmoji: GitmojiDefinition = {
        icon: '🎉',
        shortcode: ':tada:',
        description: 'Begin a project.',
      };

      const result = CommitMessageLib.setGitmoji(message, gitmoji, false);
      expect(result).toBe(`chore: ${gitmoji.icon} `);
    });

    test('type and existing gitmoji', () => {
      const message = 'chore: :rocket:';
      const gitmoji: GitmojiDefinition = {
        icon: '🎉',
        shortcode: ':tada:',
        description: 'Begin a project.',
      };

      const result = CommitMessageLib.setGitmoji(message, gitmoji, true);
      expect(result).toBe(`chore: ${gitmoji.shortcode} `);
    });

    test('type and existing gitmoji (unicode)', () => {
      const message = 'chore: :rocket:';
      const gitmoji: GitmojiDefinition = {
        icon: '🎉',
        shortcode: ':tada:',
        description: 'Begin a project.',
      };

      const result = CommitMessageLib.setGitmoji(message, gitmoji, false);
      expect(result).toBe(`chore: ${gitmoji.icon} `);
    });

    test('type and subject', () => {
      const message = 'chore: validate gitmoji';
      const gitmoji: GitmojiDefinition = {
        icon: '🎉',
        shortcode: ':tada:',
        description: 'Begin a project.',
      };

      const result = CommitMessageLib.setGitmoji(message, gitmoji, true);
      expect(result).toBe(`chore: ${gitmoji.shortcode} validate gitmoji`);
    });

    test('type and subject (unicode)', () => {
      const message = 'chore: validate gitmoji';
      const gitmoji: GitmojiDefinition = {
        icon: '🎉',
        shortcode: ':tada:',
        description: 'Begin a project.',
      };

      const result = CommitMessageLib.setGitmoji(message, gitmoji, false);
      expect(result).toBe(`chore: ${gitmoji.icon} validate gitmoji`);
    });

    test('type, subject and existing gitmoji', () => {
      const message = 'chore: :rocket: validate gitmoji';
      const gitmoji: GitmojiDefinition = {
        icon: '🎉',
        shortcode: ':tada:',
        description: 'Begin a project.',
      };

      const result = CommitMessageLib.setGitmoji(message, gitmoji, true);
      expect(result).toBe(`chore: ${gitmoji.shortcode} validate gitmoji`);
    });

    test('type, subject and existing gitmoji (unicode)', () => {
      const message = 'chore: :rocket: validate gitmoji';
      const gitmoji: GitmojiDefinition = {
        icon: '🎉',
        shortcode: ':tada:',
        description: 'Begin a project.',
      };

      const result = CommitMessageLib.setGitmoji(message, gitmoji, false);
      expect(result).toBe(`chore: ${gitmoji.icon} validate gitmoji`);
    });

    test('type, subject and body', () => {
      const message = 'chore: validate gitmoji\r\n\r\nthis is a body';
      const gitmoji: GitmojiDefinition = {
        icon: '🎉',
        shortcode: ':tada:',
        description: 'Begin a project.',
      };

      const result = CommitMessageLib.setGitmoji(message, gitmoji, true);
      expect(result).toBe(`chore: ${gitmoji.shortcode} validate gitmoji\r\n\r\nthis is a body`);
    });

    test('type, subject and body (unicode)', () => {
      const message = 'chore: validate gitmoji\r\n\r\nthis is a body';
      const gitmoji: GitmojiDefinition = {
        icon: '🎉',
        shortcode: ':tada:',
        description: 'Begin a project.',
      };

      const result = CommitMessageLib.setGitmoji(message, gitmoji, false);
      expect(result).toBe(`chore: ${gitmoji.icon} validate gitmoji\r\n\r\nthis is a body`);
    });

    test('all unicode', () => {
      const gitmoji: GitmojiDefinition = {
        icon: '🎉',
        shortcode: ':tada:',
        description: 'Begin a project.',
      };

      GITMOJIS.forEach((x) => {
        const result = CommitMessageLib.setGitmoji(`chore: ${x.icon} test`, gitmoji, false);
        expect(`${result} - ${x.icon}`).toBe(`chore: ${gitmoji.icon} test - ${x.icon}`);
      });
    });
  });

  /****************************************************
   * setType()
   ****************************************************/
  describe('setType()', () => {
    test('empty message', () => {
      const message = '';
      const type: TypeDefinition = {
        key: 'fix',
        title: 'Bug Fixes',
        description: 'A bug fix',
      };

      const result = CommitMessageLib.setType(message, type);
      expect(result).toBe(`${type.key}: `);
    });

    test('existing type', () => {
      const message = 'chore:';
      const type: TypeDefinition = {
        key: 'fix',
        title: 'Bug Fixes',
        description: 'A bug fix',
      };

      const result = CommitMessageLib.setType(message, type);
      expect(result).toBe(`${type.key}: `);
    });

    test('gitmoji', () => {
      const message = ':tada:';
      const type: TypeDefinition = {
        key: 'fix',
        title: 'Bug Fixes',
        description: 'A bug fix',
      };

      const result = CommitMessageLib.setType(message, type);
      expect(result).toBe(`${type.key}: :tada:`);
    });

    test('existing type and gitmoji', () => {
      const message = 'chore: :tada:';
      const type: TypeDefinition = {
        key: 'fix',
        title: 'Bug Fixes',
        description: 'A bug fix',
      };

      const result = CommitMessageLib.setType(message, type);
      expect(result).toBe(`${type.key}: :tada:`);
    });

    test('existing type, gitmoji and subject', () => {
      const message = 'chore: :tada: test message';
      const type: TypeDefinition = {
        key: 'fix',
        title: 'Bug Fixes',
        description: 'A bug fix',
      };

      const result = CommitMessageLib.setType(message, type);
      expect(result).toBe(`${type.key}: :tada: test message`);
    });

    test('existing type, gitmoji, subject and body', () => {
      const message = 'chore: :tada: test message\r\n\r\nbody';
      const type: TypeDefinition = {
        key: 'fix',
        title: 'Bug Fixes',
        description: 'A bug fix',
      };

      const result = CommitMessageLib.setType(message, type);
      expect(result).toBe(`${type.key}: :tada: test message\r\n\r\nbody`);
    });

    test('gitmoji, subject and body', () => {
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
});
