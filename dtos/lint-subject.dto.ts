import { LintConfigDTO } from './lint-config.dto';

export interface LintSubjectDTO {
  message: string;
  config: LintConfigDTO;
}
