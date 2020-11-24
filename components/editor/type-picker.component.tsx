import { Button, Dropdown } from 'antd';
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
    maxWidth: 585,
    display: 'block',
  },
  items: {
    maxHeight: 250,
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
  typeSelected: (type: TypeDefinition) => void;
}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {
  focus: boolean;
}

class TypePickerComponent extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      focus: false,
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

  handleVisibilityChange(focus: boolean): void {
    this.setState({ focus });
  }

  render(): JSX.Element {
    const { classes, editor } = this.props;

    const menu = (
      <span className={classes.menu}>
        <RecentListComponent
          className={classes.recentList}
          onClick={(key) => this.handleClick(key)}
          items={editor.recentTypes.map((x) => ({
            item: x.key,
            title: x.description,
            display: <span>{x.key}:</span>,
          }))}
        />
        <SearchableMenuComponent
          focus={this.state.focus}
          className={classes.items}
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
        trigger={['click']}>
        <Button icon={<FaTags />}>
          type: <AiOutlineDown />
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
