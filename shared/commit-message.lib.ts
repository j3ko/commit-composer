import { Commit, QualifiedConfig } from '@commitlint/types';

export class CommitMessageLib {
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

  private static fixLineLength(text: string, length: number): string {
    const newline = '\r\n';
    const regex = new RegExp(`(.{${length || 0}})`, 'g');
    const arr = text.split(/\r\n|\r|\n/);
    const result = [];
    (arr || []).forEach((x) => {
      let temp = x.replace(regex, `$1${newline}`);
      temp = temp.replace(/(\r\n|\r|\n)$/, '');
      result.push(...temp.split(/\r\n|\r|\n/));
    });
    return result.join(newline);
  }
}
