import { Row, Typography } from 'antd';
import React from 'react';
import withStyles, { WithStylesProps } from 'react-jss';

const styles = {
  root: {},
  title: {
    marginTop: 20,
  },
};

export interface OwnProps {}
export interface ReduxProps {}
export interface DispatchProps {}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {}

class WriteUpComponent extends React.Component<Props, State> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <>
        <Row>
          <Typography.Title level={2} className={classes.title}>
            What is commit-composer?
          </Typography.Title>
        </Row>
        <Row>
          <Typography.Paragraph>
            Commit-composer is a tool for composing{' '}
            <a href="https://www.conventionalcommits.org" target="_blank" rel="noreferrer">
              conventional commit
            </a>{' '}
            messages. Powered by{' '}
            <a href="https://commitlint.js.org" target="_blank" rel="noreferrer">
              commitlint
            </a>{' '}
            and inspired by many structured commit message <a href="#resources">resources</a>,
            commit-composer aims to help construct beautifully structured commit messages for your
            git repository.
          </Typography.Paragraph>
        </Row>

        <Row>
          <Typography.Title id="resources" level={2} className={classes.title}>
            Resources
          </Typography.Title>
        </Row>
        <Row>
          <Typography.Paragraph>
            <ul>
              <li>
                <a href="https://commitlint.js.org" target="_blank" rel="noreferrer">
                  conventional-changelog/commitlint
                </a>{' '}
                - commit message linter
              </li>
              <li>
                <a
                  href="https://github.com/conventional-changelog/standard-version"
                  target="_blank"
                  rel="noreferrer">
                  conventional-changelog/standard-version
                </a>{' '}
                - changelog generation and version bumping
              </li>
              <li>
                <a
                  href="https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits"
                  target="_blank"
                  rel="noreferrer">
                  VSCode Conventional Commits
                </a>{' '}
                - vscode conventional commits extension
              </li>
              <li>
                <a href="http://commitizen.github.io/cz-cli" target="_blank" rel="noreferrer">
                  commitizen/cz-cli
                </a>{' '}
                - cli tool for creating commits
              </li>
            </ul>
          </Typography.Paragraph>
        </Row>
      </>
    );
  }
}

export default withStyles(styles)(WriteUpComponent);
