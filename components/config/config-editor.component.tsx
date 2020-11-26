import { Input } from 'antd';
import classNames from 'classnames';
import React from 'react';
import withStyles, { WithStylesProps } from 'react-jss';
import { connect, Dispatch } from 'react-redux';
import { AppState, ConfigState } from 'state';

import ConfigValidationComponent from './config-validation.component';
import { ConfigUpdatedAction } from './state/config.action';

const styles = (theme: CommitComposerTheme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all .2s ease-in-out',
    border: `1px solid ${theme.alertSuccessBorderColor}`,
  },
  closed: {
    height: 0,
    minHeight: 0,
    border: 'none !important',
    '& textarea': {
      height: '0 !important',
      minHeight: '0 !important',
      padding: 0,
    },
    '& .ant-input-textarea-clear-icon': {
      display: 'none',
    },
  },
  invalid: {
    border: `1px solid ${theme.alertErrorBorderColor}`,
  },
  loading: {
    border: `1px solid ${theme.alertInfoBorderColor}`,
  },
  text: {
    fontFamily: '"Source Code Pro", monospace',
    fontSize: 12,
    border: 'none',
    height: '100%',
    width: '100%',
    resize: 'none',
    '&:focus': {
      outline: 'none',
      boxShadow: 'unset',
    },
    display: 'block',
  },
});

export interface OwnProps {}
export interface ReduxProps {
  config: ConfigState;
}
export interface DispatchProps {
  configUpdated: (value: string) => void;
}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {}

class ConfigEditorComponent extends React.Component<Props, State> {
  render(): JSX.Element {
    const { classes, config, configUpdated } = this.props;

    return (
      <div
        className={classNames(classes.root, {
          [classes.invalid]: !config.ruleset?.valid && !config.loading,
          [classes.loading]: config.loading,
          [classes.closed]: !config.isOpen,
        })}>
        <Input.TextArea
          rows={8}
          className={classes.text}
          value={config.configValue}
          onChange={(e) => configUpdated(e.currentTarget.value)}
          allowClear
        />
        <ConfigValidationComponent config={config}></ConfigValidationComponent>
      </div>
    );
  }
}

function mapStateToProps(state: AppState): ReduxProps {
  const { config } = state;
  return { config };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    configUpdated: (x) => dispatch(ConfigUpdatedAction.get(x)),
  };
}

export default connect<ReduxProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ConfigEditorComponent));
