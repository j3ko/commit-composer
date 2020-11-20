import { Button, Dropdown, Menu, Space, Typography } from 'antd';
import React from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import withStyles, { WithStylesProps } from 'react-jss';
import { connect, Dispatch } from 'react-redux';
import { GitmojiDefinition, GITMOJIS } from 'shared/presets/gitmojis';
import { AppState, EditorState } from 'state';

import { GitmojiSelectAction } from './state/editor.action';

const styles = (theme: CommitComposerTheme) => ({
  root: {},
  menu: {
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: 250,
    [`@media only screen and (max-width: ${theme.screenMD})`]: {
      width: '100%',
    },
  },
  description: {
    fontSize: 12,
    paddingRight: 5,
  },
  gitmoji: {
    paddingRight: 8,
  },
  overlay: {
    [`@media only screen and (max-width: ${theme.screenMD})`]: {
      width: '100%',
      minWidth: 'unset',
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
              <span aria-label={x.markdown} role="img" className={classes.gitmoji}>
                {x.icon}
              </span>
            }>
            <Space size={1} direction="vertical">
              <Typography.Text>{x.markdown}</Typography.Text>
              <Typography.Text type="secondary" className={classes.description}>
                {x.description}
              </Typography.Text>
            </Space>
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Dropdown overlayClassName={classes.overlay} overlay={menu} trigger={['click']}>
        <Button
          icon={
            <span aria-label="gitmoji" role="img" className={classes.gitmoji}>
              🎉
            </span>
          }>
          :gitmoji: <AiOutlineDown />
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
