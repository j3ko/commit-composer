import { Commit, UserConfig } from '@commitlint/types';
import { LintResultDTO } from 'dtos/lint-result.dto';
import { LintSubjectDTO } from 'dtos/lint-subject.dto';
import { NextApiRequest, NextApiResponse } from 'next';
import { CommitLintLib } from 'shared/commit-lint.lib';

export default async (req: NextApiRequest, res: NextApiResponse<LintResultDTO>): Promise<void> => {
  try {
    const { message, config } = req.body as LintSubjectDTO;
    let userConfig: UserConfig;
    let commit: Commit;

    if (config) {
      userConfig = await CommitLintLib.readConfig(config);
    }

    userConfig = userConfig || {
      extends: ['@commitlint/config-conventional'],
    };

    const opts = await CommitLintLib.parseConfig(userConfig);
    const outcome = await CommitLintLib.lintMessage(message || '', opts);

    if (message) {
      commit = await CommitLintLib.parseMessage(message || '', opts);
    }

    const result = Object.assign({}, outcome, { commit });

    res.status(200).send(result);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
