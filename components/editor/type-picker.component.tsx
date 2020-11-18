import { Button, Dropdown, Menu, Space, Typography } from 'antd';
import React from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { FaTags } from 'react-icons/fa';
import withStyles, { WithStylesProps } from 'react-jss';
import { connect, Dispatch } from 'react-redux';
import { TypeDefinition, TYPES } from 'shared/presets/types';
import { AppState, EditorState } from 'state';

import { TypeSelectAction } from './state/editor.action';

const styles = (theme: CommitComposerTheme) => ({
  root: {},
  menu: {
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: 250,
    [`@media only screen and (max-width: ${theme.screenMD})`]: {
      width: '100%',
      minWidth: 'unset',
    },
  },
  description: {
    fontSize: 12,
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
  typeSelected: (type: TypeDefinition) => void;
}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {}

class TypePickerComponent extends React.Component<Props, State> {
  handleClick(key: string): void {
    const { typeSelected } = this.props;
    const type = TYPES.find((x) => x.key === key);
    typeSelected(type);
  }

  render(): JSX.Element {
    const { classes } = this.props;

    const menu = (
      <Menu onClick={({ key }) => this.handleClick(`${key}`)} className={classes.menu}>
        {TYPES.map((x) => (
          <Menu.Item key={x.key}>
            <Space size={1} direction="vertical">
              <Typography.Text>{x.key}:</Typography.Text>
              <Typography.Text type="secondary" className={classes.description}>
                {x.description}&nbsp;
              </Typography.Text>
            </Space>
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Dropdown overlayClassName={classes.overlay} overlay={menu} trigger={['click']}>
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
