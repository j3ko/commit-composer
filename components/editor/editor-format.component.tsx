import { Button } from 'antd';
import React from 'react';
import { FaMagic } from 'react-icons/fa';
import withStyles from 'react-jss';
import { connect, Dispatch } from 'react-redux';
import { AppState, ConfigState, EditorState } from 'state';

import { EditorFormatAction } from './state/editor.action';

const styles = {
  root: {},
};

export interface OwnProps {}
export interface ReduxProps {
  editor: EditorState;
  config: ConfigState;
}
export interface DispatchProps {
  editorFormatted: () => void;
}
type Props = OwnProps & ReduxProps & DispatchProps;
export interface State {}

class EditorFormatComponent extends React.Component<Props, State> {
  render(): JSX.Element {
    const { editor, config } = this.props;

    return (
      <Button
        disabled={!editor.validationResult || config.loading || editor.loading}
        icon={<FaMagic />}
        onClick={() => this.props.editorFormatted()}>
        Auto Format
      </Button>
    );
  }
}

function mapStateToProps(state: AppState): ReduxProps {
  const { editor, config } = state;
  return { editor, config };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    editorFormatted: () => dispatch(EditorFormatAction.get()),
  };
}

export default connect<ReduxProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(EditorFormatComponent));
