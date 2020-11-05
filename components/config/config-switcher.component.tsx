import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { FaWrench } from 'react-icons/fa';
import withStyles from 'react-jss';
import { connect, Dispatch } from 'react-redux';
import { AppState, ConfigPreset, ConfigState } from 'state';

import { ConfigUpdatedAction, OpenConfigAction } from './state/config.action';

const styles = {
  root: {},
};

export interface OwnProps {}
export interface ReduxProps {
  config: ConfigState;
}
export interface DispatchProps {
  configUpdated: (value: string) => void;
  openConfig: (value: boolean) => void;
}
type Props = OwnProps & ReduxProps & DispatchProps;
export interface State {}

class ConfigSwitcherComponent extends React.Component<Props, State> {
  componentDidMount() {
    const { config } = this.props;
    if (!config?.configValue) {
      this.setConfigPreset(ConfigPreset.Conventional);
    }
  }

  setConfigPreset(config: ConfigPreset) {
    this.props.configUpdated(`{\r\n  "extends": ["${config}"]\r\n}`);
  }

  handleClick(key: React.ReactText) {
    const config = ConfigPreset[key];
    this.props.openConfig(true);
    this.setConfigPreset(config);
  }

  render(): JSX.Element {
    const menu = (
      <Menu onClick={({ key }) => this.handleClick(key)}>
        {Object.keys(ConfigPreset).map((key) => (
          <Menu.Item key={key}>{ConfigPreset[key]}</Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <Button icon={<FaWrench />}>
          Configuration <AiOutlineDown />
        </Button>
      </Dropdown>
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
    openConfig: (x) => dispatch(OpenConfigAction.get(x)),
  };
}

export default connect<ReduxProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ConfigSwitcherComponent));
