import { Button, Dropdown } from 'antd';
import classNames from 'classnames';
import RecentListComponent from 'components/common/recent-list.component';
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
    display: 'block',
    [`@media only screen and (min-width: ${theme.screenMD})`]: {
      maxWidth: 380,
    },
  },
  items: {
    maxHeight: 250,
  },
  gitmoji: {
    paddingRight: 8,
  },
  button: {
    display: 'flex',
    padding: '3px 8px',
  },
  buttonIcon: {
    position: 'relative',
    height: 26,
    width: 14,
    '&:after': {
      content: `'🎉'`,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      height: 26,
      width: 26,
    },
  },
  buttonText: {
    height: 26,
    width: 76,
    textAlign: 'right',
    overflow: 'clip',
    transition: 'all 0.3s ease, opacity 0.5s ease 0.3s',
  },
  hiddenText: {
    width: 0,
    opacity: 0,
  },
  overlay: {
    [`@media only screen and (max-width: ${theme.screenMD})`]: {
      width: '100%',
      minWidth: 'unset',
    },
  },
  recentList: {
    maxHeight: 70,
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
  visible: boolean;
  hovered: boolean;
}

class GitmojiPickerComponent extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      visible: false,
      hovered: false,
    };
  }

  handleClick(key: string): void {
    setTimeout(() => {
      const { gitmojiSelected } = this.props;
      const gitmoji = GITMOJIS.find((x) => x.markdown === key);
      gitmojiSelected(gitmoji);
      this.handleVisibilityChange(false);
    }, 200);
  }

  handleVisibilityChange(visible: boolean): void {
    this.setState({ visible });
    !visible && this.handleHover(visible);
  }

  handleHover(hovered: boolean) {
    setTimeout(() => this.setState({ hovered }));
  }

  render(): JSX.Element {
    const { classes, editor } = this.props;
    const { hovered, visible } = this.state;

    const menu = (
      <span className={classes.menu}>
        <RecentListComponent
          className={classes.recentList}
          onClick={(key) => this.handleClick(key)}
          items={editor.recentGitmojis.map((x) => ({
            item: x.markdown,
            title: x.description,
            display: (
              <span aria-label={x.markdown} role="img">
                {x.icon}
              </span>
            ),
          }))}
        />
        <SearchableMenuComponent
          focus={visible}
          className={classes.items}
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
      </span>
    );

    return (
      <Dropdown
        overlayClassName={classes.overlay}
        overlay={menu}
        onVisibleChange={(visible) => this.handleVisibilityChange(visible)}
        trigger={['click']}
        placement="bottomRight">
        <Button
          className={classes.button}
          onMouseEnter={() => this.handleHover(true)}
          onMouseLeave={() => !visible && this.handleHover(false)}
          shape={'round'}
          icon={<span aria-label="gitmoji" role="img" className={classes.buttonIcon}></span>}>
          <span className={classNames(classes.buttonText, { [classes.hiddenText]: !hovered })}>
            {hovered ? (
              <>
                :gitmoji: <AiOutlineDown />
              </>
            ) : (
              <></>
            )}
          </span>
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
