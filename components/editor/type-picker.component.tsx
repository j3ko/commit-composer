import { Button, Dropdown } from 'antd';
import classNames from 'classnames';
import RecentListComponent from 'components/common/recent-list.component';
import SearchableMenuComponent from 'components/common/searchable-menu.component';
import React from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { FaTags } from 'react-icons/fa';
import withStyles, { WithStylesProps } from 'react-jss';
import { connect, Dispatch } from 'react-redux';
import { TypeDefinition, TYPES } from 'shared/presets/types';
import { AppState, EditorState } from 'state';

import { TypeSelectAction } from './state/editor.action';

const styles = (theme: CommitComposerTheme) => ({
  menu: {
    display: 'block',
    [`@media only screen and (min-width: ${theme.screenMD})`]: {
      maxWidth: 585,
    },
  },
  items: {
    maxHeight: 250,
  },
  button: {
    display: 'flex',
    padding: '2px 8px',
  },
  buttonIcon: {
    height: 26,
    width: 14,
  },
  buttonText: {
    width: 58,
    paddingTop: '2px',
    margin: '0 !important',
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
  searchBar: {
    backgroundColor: theme.lighter,
    padding: 9,
    paddingTop: 0,
  },
  recentList: {
    maxHeight: 70,
    backgroundColor: theme.lighter,
  },
  recentItem: {
    '&:hover': {
      backgroundColor: theme.itemHoverBGDark,
    },
  },
});

export interface OwnProps {}
export interface ReduxProps {
  editor: EditorState;
}
export interface DispatchProps {
  typeSelected: (type: TypeDefinition) => void;
}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {
  visible: boolean;
  hovered: boolean;
}

class TypePickerComponent extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      visible: false,
      hovered: false,
    };
  }

  handleClick(key: string): void {
    setTimeout(() => {
      const { typeSelected } = this.props;
      const type = TYPES.find((x) => x.key === key);
      typeSelected(type);
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
          itemClassName={classes.recentItem}
          className={classes.recentList}
          onClick={(key) => this.handleClick(key)}
          items={editor.recentTypes.map((x) => ({
            item: x.key,
            title: x.description,
            display: <span>{x.key}:</span>,
          }))}
        />
        <SearchableMenuComponent
          focus={visible}
          className={classes.items}
          searchBarClassName={classes.searchBar}
          onClick={(key) => this.handleClick(key)}
          items={TYPES.map((x) => ({
            item: x.key,
            title: `${x.key}:`,
            description: x.description,
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
          icon={<FaTags className={classes.buttonIcon} />}>
          <span className={classNames(classes.buttonText, { [classes.hiddenText]: !hovered })}>
            {hovered ? (
              <>
                type: <AiOutlineDown />
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
    typeSelected: (type) => dispatch(TypeSelectAction.get(type)),
  };
}

export default connect<ReduxProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(TypePickerComponent));
