import { Commit, QualifiedConfig } from '@commitlint/types';

import { GitmojiDefinition } from './gitmoji';

export class CommitMessageLib {
  static setGitmoji(message: string, gitmoji: GitmojiDefinition): string {
    return (message || '').replace(
      /^(.+?(\(.+?\))*?:)?([ ]*:\w+:[ ]*)?([\s]*)?([\s\S]*)?/,
      `$1$2 ${gitmoji.markdown} $5`,
    );
  }

  static format(commit: Commit, ruleset: QualifiedConfig): string {
    const { raw, body, footer } = commit;
    let result = raw;

    if (ruleset.rules['body-max-line-length'] && Boolean(body)) {
      const length = ruleset.rules['body-max-line-length'][2];
      result = result.replace(body, this.fixLineLength(body, length));
    }

    if (ruleset.rules['footer-max-line-length'] && Boolean(footer)) {
      const length = ruleset.rules['footer-max-line-length'][2];
      result = result.replace(footer, this.fixLineLength(footer, length));
    }

    return result;
  }

  private static fixLineLength(text: string, length: number) {
    return (text || '').replace(
      new RegExp(`(?![^\\n]{1,${length}}$)([^\\n]{1,${length}})\\s`, 'g'),
      '$1\r\n',
    );
  }
}
