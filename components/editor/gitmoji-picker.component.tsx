import { Button, Dropdown, Menu, Space, Typography } from 'antd';
import React from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import withStyles, { WithStylesProps } from 'react-jss';
import { connect, Dispatch } from 'react-redux';
import { GitmojiDefinition, GITMOJIS } from 'shared/gitmoji';
import { AppState, EditorState } from 'state';

import { GitmojiSelectAction } from './state/editor.action';

const styles = (theme: CommitComposerTheme) => ({
  root: {},
  menu: {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 250,
    [`@media only screen and (max-width: ${theme.screenSM})`]: {
      width: '100%',
    },
  },
});

export interface OwnProps {}
export interface ReduxProps {
  editor: EditorState;
}
export interface DispatchProps {
  gitmojiSelected: (gitmoji: GitmojiDefinition) => void;
}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {}

class GitmojiPickerComponent extends React.Component<Props, State> {
  handleClick(key: string): void {
    const { gitmojiSelected } = this.props;
    const gitmoji = GITMOJIS.find((x) => x.markdown === key);
    gitmojiSelected(gitmoji);
  }

  render(): JSX.Element {
    const { classes } = this.props;

    const menu = (
      <Menu onClick={({ key }) => this.handleClick(`${key}`)} className={classes.menu}>
        {GITMOJIS.map((x) => (
          <Menu.Item
            key={x.markdown}
            icon={
              <span aria-label={x.markdown} role="img">
                {x.icon}&nbsp;
              </span>
            }>
            <Space size={1} direction="vertical">
              <Typography.Text>{x.markdown}</Typography.Text>
              <Typography.Text type="secondary">{x.description}&nbsp;</Typography.Text>
            </Space>
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <Button>
          <span aria-label="gitmoji" role="img">
            🎉
          </span>{' '}
          &nbsp;:gitmoji: <AiOutlineDown />
        </Button>
      </Dropdown>
    );
  }
}

function mapStateToProps(state: AppState): ReduxProps {
  const { editor } = state;
  return { editor };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    gitmojiSelected: (gitmoji) => dispatch(GitmojiSelectAction.get(gitmoji)),
  };
}

export default connect<ReduxProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(GitmojiPickerComponent));
