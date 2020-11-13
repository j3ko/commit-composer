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
    border: 'none !important',
    padding: 0,
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
    const { classes, config } = this.props;

    return (
      <div
        className={classNames(classes.root, {
          [classes.invalid]: !config.ruleset?.valid && !config.loading,
          [classes.loading]: config.loading,
          [classes.closed]: !config.isOpen,
        })}>
        <textarea
          className={classNames(classes.text, {
            [classes.closed]: !config.isOpen,
          })}
          value={this.props.config.configValue}
          onChange={(e) => this.props.configUpdated(e.currentTarget.value)}></textarea>
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
