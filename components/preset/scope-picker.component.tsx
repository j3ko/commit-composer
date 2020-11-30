import { Button, Dropdown } from 'antd';
import classNames from 'classnames';
import RecentListComponent from 'components/common/recent-list.component';
import SearchableMenuComponent from 'components/common/searchable-menu.component';
import React from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { BsBraces } from 'react-icons/bs';
import withStyles, { WithStylesProps } from 'react-jss';
import { connect, Dispatch } from 'react-redux';
import { TypeDefinition, TYPES } from 'shared/presets/types';
import { AppState, PresetState } from 'state';

import { ScopeSelectAction, TypeSelectAction } from './state/preset.action';

const styles = (theme: CommitComposerTheme) => ({
  menu: {
    border: `1px solid ${theme.lighter}`,
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
    width: 70,
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
  },
  noTopPadding: {
    paddingTop: 0,
  },
  recentList: {
    maxHeight: 70,
    backgroundColor: theme.lighter,
  },
  recentItem: {
    '&:hover': {
      backgroundColor: theme.itemHoverBG,
    },
  },
});

export interface OwnProps {}
export interface ReduxProps {
  preset: PresetState;
}
export interface DispatchProps {
  scopeSelected: (scope: string) => void;
}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {
  visible: boolean;
  hovered: boolean;
}

class ScopePickerComponent extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      visible: false,
      hovered: false,
    };
  }

  handleClick(key: string): void {
    setTimeout(() => {
      const { scopeSelected } = this.props;
      scopeSelected(key);
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
    const { classes, preset } = this.props;
    const { hovered, visible } = this.state;

    const menu = (
      <span className={classes.menu}>
        <RecentListComponent
          itemClassName={classes.recentItem}
          className={classes.recentList}
          onClick={(key) => this.handleClick(key)}
          items={preset.recentScopes.map((x) => ({
            item: x,
            title: x,
            display: <span>({x})</span>,
          }))}
        />
        <SearchableMenuComponent
          focus={visible}
          className={classes.items}
          searchBarClassName={classNames(classes.searchBar, {
            [classes.noTopPadding]: Boolean(preset.recentScopes?.length),
          })}
          onClick={(key) => this.handleClick(key)}
          items={preset.scopes.map((x) => ({
            item: x,
            title: `(${x})`,
          }))}
        />
      </span>
    );

    return preset.scopes.length || preset.recentScopes.length ? (
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
          icon={<BsBraces className={classes.buttonIcon} />}>
          <span className={classNames(classes.buttonText, { [classes.hiddenText]: !hovered })}>
            {hovered ? (
              <>
                (scope) <AiOutlineDown />
              </>
            ) : (
              <></>
            )}
          </span>
        </Button>
      </Dropdown>
    ) : (
      <></>
    );
  }
}

function mapStateToProps(state: AppState): ReduxProps {
  const { preset } = state;
  return { preset };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    scopeSelected: (scope) => dispatch(ScopeSelectAction.get(scope)),
  };
}

export default connect<ReduxProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ScopePickerComponent));
