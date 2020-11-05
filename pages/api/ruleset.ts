import { QualifiedConfig, UserConfig } from '@commitlint/types';
import { LintConfigDTO } from 'dtos/lint-config.dto';
import { RulesetResultDTO } from 'dtos/ruleset-result.dto';
import { NextApiRequest, NextApiResponse } from 'next';
import { CommitLintLib } from 'shared/commit-lint.lib';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<RulesetResultDTO>,
): Promise<void> => {
  try {
    const config = req.body as LintConfigDTO;
    const userConfig: UserConfig = await CommitLintLib.readConfig(config);
    const ruleset: QualifiedConfig = await CommitLintLib.parseConfig(userConfig);

    res.status(200).send({
      valid: true,
      ruleset,
    });
  } catch (e) {
    console.error([e, req.body]);

    res.status(200).send({
      valid: false,
    });
  }
};
