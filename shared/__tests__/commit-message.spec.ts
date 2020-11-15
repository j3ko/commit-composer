import { QualifiedConfig } from '@commitlint/types';

import { Commit } from '../../dtos/lint-result.dto';
import { CommitMessageLib } from '../commit-message.lib';

describe('commit-message', () => {
  test('format body-max-line-length - single line', () => {
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

  test('format footer-max-line-length - single line', () => {
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
});
