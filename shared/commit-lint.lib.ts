import lint from '@commitlint/lint';
import load from '@commitlint/load';
import parse from '@commitlint/parse';
import { Commit, LintOutcome, QualifiedConfig, UserConfig } from '@commitlint/types';
import { cosmiconfig } from 'cosmiconfig';
import crypto from 'crypto';
import { LintConfigDTO } from 'dtos/lint-config.dto';
import fs from 'fs';
import json5 from 'json5';

import shim from '../require-shim';

const TEMP_DIR = '/tmp';

export class CommitLintLib {
  static async readConfig(config: LintConfigDTO): Promise<UserConfig> {
    return new Promise((resolve, reject) => {
      const moduleName = crypto.randomBytes(20).toString('hex');
      const ext = (config && config.type) || 'json';
      const path = `${TEMP_DIR}/${moduleName}.${ext}`;
      const explorer = cosmiconfig(moduleName);

      if (!fs.existsSync(TEMP_DIR)) {
        fs.mkdirSync(TEMP_DIR);
      }

      if (config.type === 'json') {
        const file = json5.parse(config.file);
        config.file = JSON.stringify(file);
      }

      fs.writeFile(path, config.file, function (err) {
        if (err) return reject(err);

        explorer
          .load(path)
          .then((result) => {
            if (result.config && !result.isEmpty) {
              resolve(result.config as UserConfig);
            } else {
              reject('unable to parse config');
            }
          })
          .catch((e) => reject(e))
          .finally(() =>
            fs.unlink(path, (e) => {
              if (e) console.error(e);
            }),
          );
      });
    });
  }

  static async parseConfig(configuration: UserConfig): Promise<QualifiedConfig> {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let opts = { require: shim } as any;

      try {
        if (fs.existsSync('./.commitlintrc.js')) {
          opts = Object.assign(opts, {
            cwd: './',
            file: '.commitlintrc.empty.js',
          });
        }
      } catch (err) {
        console.error(err);
      }

      load(configuration, opts)
        .then((config) => resolve(config))
        .catch((e) => reject(e));
    });
  }

  static async lintMessage(message: string, opts: QualifiedConfig): Promise<LintOutcome> {
    return new Promise((resolve, reject) => {
      lint(
        message,
        opts.rules,
        opts.parserPreset ? { parserOpts: opts.parserPreset.parserOpts } : {},
      )
        .then((report) => resolve(report))
        .catch((e) => reject(e));
    });
  }

  static async parseMessage(message: string, opts: QualifiedConfig): Promise<Commit> {
    return new Promise((resolve, reject) => {
      parse(message, undefined, opts.parserPreset ? opts.parserPreset.parserOpts : {})
        .then((commit) => resolve(commit))
        .catch((e) => reject(e));
    });
  }
}
