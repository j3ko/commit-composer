import { Button, Dropdown } from 'antd';
import SearchableMenuComponent from 'components/common/searchable-menu.component';
import React from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import withStyles, { WithStylesProps } from 'react-jss';
import { connect, Dispatch } from 'react-redux';
import { GitmojiDefinition, GITMOJIS } from 'shared/presets/gitmojis';
import { AppState, EditorState } from 'state';

import { GitmojiSelectAction } from './state/editor.action';

const styles = (theme: CommitComposerTheme) => ({
  menu: {
    maxHeight: 250,
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
export interface State {
  focus: boolean;
}

class GitmojiPickerComponent extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      focus: false,
    };
  }

  handleClick(key: string): void {
    const { gitmojiSelected } = this.props;
    const gitmoji = GITMOJIS.find((x) => x.markdown === key);
    gitmojiSelected(gitmoji);
    this.handleVisibilityChange(false);
  }

  handleVisibilityChange(focus: boolean): void {
    this.setState({ focus });
  }

  render(): JSX.Element {
    const { classes } = this.props;

    const menu = (
      <SearchableMenuComponent
        focus={this.state.focus}
        className={classes.menu}
        onClick={(key) => this.handleClick(key)}
        items={GITMOJIS.map((x) => ({
          item: x.markdown,
          title: x.markdown,
          description: x.description,
          icon: (
            <span aria-label={x.markdown} role="img" className={classes.gitmoji}>
              {x.icon}
            </span>
          ),
        }))}
      />
    );

    return (
      <Dropdown
        overlayClassName={classes.overlay}
        overlay={menu}
        onVisibleChange={(visible) => this.handleVisibilityChange(visible)}
        trigger={['click']}>
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
