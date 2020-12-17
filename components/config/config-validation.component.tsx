import { Alert } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCheckCircle, BsXOctagon } from 'react-icons/bs';
import withStyles, { WithStylesProps } from 'react-jss';
import { ConfigState } from 'state';

const styles = {
  root: {
    borderBottom: 'none',
    borderRight: 'none',
    borderLeft: 'none',
    display: 'none',
  },
  open: {
    display: 'block',
  },
};

export interface OwnProps {
  config: ConfigState;
}
export interface ReduxProps {}
export interface DispatchProps {}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {}

class ConfigValidationComponent extends React.Component<Props, State> {
  render(): JSX.Element {
    const { classes, config } = this.props;

    let result = (
      <Alert
        type={'error'}
        message={'Unable to validate configuration'}
        icon={<BsXOctagon />}
        showIcon
        className={classNames(classes.root, {
          [classes.open]: config.isOpen,
        })}
      />
    );

    if (config.ruleset) {
      const props = config.ruleset?.valid
        ? {
            type: 'success' as const,
            message: 'Valid configuration',
            icon: <BsCheckCircle />,
          }
        : {
            type: 'error' as const,
            message: 'Invalid configuration',
            icon: <BsXOctagon />,
          };

      result = (
        <Alert
          {...props}
          icon={config.loading ? <AiOutlineLoading3Quarters className="spin" /> : props.icon}
          showIcon
          className={classNames(classes.root, {
            [classes.open]: config.isOpen,
          })}
        />
      );
    }

    return result;
  }
}

export default withStyles(styles)(ConfigValidationComponent);
