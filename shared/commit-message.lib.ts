import { Commit, QualifiedConfig } from '@commitlint/types';

import { GitmojiDefinition } from './presets/gitmojis';
import { TypeDefinition } from './presets/types';

export class CommitMessageLib {
  static SUBJECT_REGEX = /^((?![ ]*:).+?(\(.+?\))*?:)?([ ]*)((:\w+:|\p{Regional_Indicator}\p{Regional_Indicator}|\p{Emoji}(\p{Emoji_Modifier}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u{200D}\p{Emoji}(\p{Emoji_Modifier}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?)*)[ ]*)?([\s]*)?([\s\S]*)?/gu;

  static setType(message: string, type: TypeDefinition): string {
    return (message || '').replace(CommitMessageLib.SUBJECT_REGEX, `${type.key}: $4$9$10`);
  }

  static setGitmoji(message: string, gitmoji: GitmojiDefinition, useShortcode = false): string {
    return (message || '').replace(
      CommitMessageLib.SUBJECT_REGEX,
      `$1 ${useShortcode ? gitmoji.shortcode : gitmoji.icon} $10`,
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
