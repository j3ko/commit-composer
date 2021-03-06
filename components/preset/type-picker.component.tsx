import { Button, Col, Dropdown, Row } from 'antd';
import classNames from 'classnames';
import RecentListComponent, { RecentItem } from 'components/common/recent-list.component';
import SearchableMenuComponent from 'components/common/searchable-menu.component';
import React from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { FaTags } from 'react-icons/fa';
import withStyles, { WithStylesProps } from 'react-jss';
import { connect, Dispatch } from 'react-redux';
import { TypeDefinition, TYPES } from 'shared/presets/types';
import { AppState, PresetState } from 'state';

import { TypeSelectAction } from './state/preset.action';

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
  actionContainer: {
    padding: '4px 9px',
    width: '100%',
    backgroundColor: theme.lighter,
  },
});

export interface OwnProps {}
export interface ReduxProps {
  preset: PresetState;
}
export interface DispatchProps {
  typeSelected: (type: TypeDefinition | null) => void;
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

  get types(): TypeDefinition[] {
    const { preset } = this.props;
    return preset.types.length ? preset.types : TYPES;
  }

  handleClear(): void {
    const { typeSelected } = this.props;
    typeSelected(null);
  }

  handleClick(key: string): void {
    setTimeout(() => {
      const { typeSelected } = this.props;
      const type = this.types.find((x) => x.key === key);
      typeSelected(type);
    }, 200);
    this.handleVisibilityChange(false);
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
          items={preset.recentTypes.map(
            (x): RecentItem => ({
              item: x.key,
              tooltip: x.description,
              display: <span>{x.key}:</span>,
            }),
          )}
        />
        <SearchableMenuComponent
          focus={visible}
          className={classes.items}
          searchBarClassName={classNames(classes.searchBar, {
            [classes.noTopPadding]: Boolean(preset.recentTypes?.length),
          })}
          onClick={(key) => this.handleClick(key)}
          items={this.types.map((x) => ({
            item: x.key,
            title: `${x.key}:`,
            description: x.description,
          }))}>
          <Row justify="space-between" className={classes.actionContainer}>
            <Col>
              <Button size="small" type="link" onClick={() => this.handleClear()}>
                Clear
              </Button>
            </Col>
          </Row>
        </SearchableMenuComponent>
      </span>
    );

    return (
      <Dropdown
        overlayClassName={classes.overlay}
        overlay={menu}
        visible={visible}
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
  const { preset } = state;
  return { preset };
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
