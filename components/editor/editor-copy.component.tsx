import { Dropdown, Menu, message } from 'antd';
import React from 'react';
import { FaCopy } from 'react-icons/fa';
import withStyles from 'react-jss';
import { connect } from 'react-redux';
import { AppState, ConfigState, EditorState } from 'state';

const styles = {
  root: {},
};

export interface OwnProps {}
export interface ReduxProps {
  editor: EditorState;
  config: ConfigState;
}
export interface DispatchProps {}
type Props = OwnProps & ReduxProps & DispatchProps;
export interface State {}

class EditorCopyComponent extends React.Component<Props, State> {
  handleMenuClick(key: React.ReactText): void {
    const { editor } = this.props;
    if (!editor.validationResult) {
      return;
    }

    const keyparts = String(key).split('-');
    const text = editor.validationResult.commit[keyparts[0]];

    keyparts[1] === 'format' ? this.formatAndCopy(text) : this.copyToClipboard(text);
  }

  handleButtonClick(): void {
    this.copyToClipboard(this.props.editor.editorValue);
  }

  copyToClipboard(str: string): void {
    const el = document.createElement('textarea');
    el.value = str || '';
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(el);
    message.success('Copied to clipboard!');
  }

  formatAndCopy(str: string): void {
    const result = (str || '').replace(/(\r\n|\r|\n)/g, '\\r\\n');
    this.copyToClipboard(result);
  }

  render(): JSX.Element {
    const { editor, config } = this.props;
    const disabled = !editor.validationResult;

    const menu = (
      <Menu onClick={({ key }) => this.handleMenuClick(key)} mode="vertical">
        <Menu.SubMenu key="raw" title="All" disabled={disabled}>
          <Menu.Item key="raw-noformat">Raw</Menu.Item>
          <Menu.Item key="raw-format">As single line with &quot;\r\n&quot;</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="header-noformat" disabled={disabled}>
          Header
        </Menu.Item>
        <Menu.SubMenu key="body" title="Body" disabled={disabled}>
          <Menu.Item key="body-noformat">Raw</Menu.Item>
          <Menu.Item key="body-format">As single line with &quot;\r\n&quot;</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="footer" title="Footer" disabled={disabled}>
          <Menu.Item key="footer-noformat">Raw</Menu.Item>
          <Menu.Item key="footer-format">As single line with &quot;\r\n&quot;</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );

    return (
      <Dropdown.Button
        disabled={config.loading || editor.loading}
        onClick={() => this.handleButtonClick()}
        overlay={menu}
        trigger={['click']}>
        <FaCopy /> Copy
      </Dropdown.Button>
    );
  }
}

function mapStateToProps(state: AppState): ReduxProps {
  const { editor, config } = state;
  return { editor, config };
}

export default connect<ReduxProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  null,
)(withStyles(styles)(EditorCopyComponent));
