import { Space } from 'antd';
import classNames from 'classnames';
import ConfigSwitcherComponent from 'components/config/config-switcher.component';
import EditorCopyComponent from 'components/editor/editor-copy.component';
import EditorFormatComponent from 'components/editor/editor-format.component';
import { UseBreakpointHook } from 'hooks/use-breakpoint.hook';
import React from 'react';
import withStyles, { WithStylesProps } from 'react-jss';

const styles = {
  fullWidth: {
    width: '100%',
    '& button:first-of-type': {
      width: '100%',
    },
  },
};

export interface OwnProps {}
export interface ReduxProps {}
export interface DispatchProps {}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {}

class EditorActionsComponent extends React.Component<Props, State> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <UseBreakpointHook>
        {(screen) => {
          return (
            <Space
              direction={screen.sm ? 'horizontal' : 'vertical'}
              className={classNames({
                [classes.fullWidth]: !screen.sm,
              })}>
              <ConfigSwitcherComponent
                className={classNames({
                  [classes.fullWidth]: !screen.sm,
                })}></ConfigSwitcherComponent>
              <EditorFormatComponent
                className={classNames({
                  [classes.fullWidth]: !screen.sm,
                })}></EditorFormatComponent>
              <EditorCopyComponent
                className={classNames({
                  [classes.fullWidth]: !screen.sm,
                })}></EditorCopyComponent>
            </Space>
          );
        }}
      </UseBreakpointHook>
    );
  }
}

export default withStyles(styles)(EditorActionsComponent);
