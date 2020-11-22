import { Input } from 'antd';
import React from 'react';
import withStyles, { WithStylesProps } from 'react-jss';
import { connect, Dispatch } from 'react-redux';
import { AppState, EditorState } from 'state';

import EditorGuideComponent from './editor-guide.component';
import { EditorUpdatedAction } from './state/editor.action';

const styles = (theme: CommitComposerTheme) => ({
  root: {
    position: 'relative',
    outline: `1px solid ${theme.alertInfoBorderColor}`,
    width: '100%',
  },
  text: {
    fontFamily: '"Source Code Pro", monospace',
    fontSize: 12,
    border: 'none',
    display: 'block',
    width: '100%',
    resize: 'none',
    overflow: 'none',
    whiteSpace: 'wrap',
    '&:focus': {
      outline: 'none',
      boxShadow: 'unset',
    },
  },
});

export interface OwnProps {}
export interface ReduxProps {
  editor: EditorState;
}
export interface DispatchProps {
  editorUpdated: (value: string) => void;
}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {}

class EditorComponent extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {};
  }

  setValue(value: string) {
    this.props.editorUpdated(value);
  }

  render(): JSX.Element {
    const { classes, editor } = this.props;

    return (
      <div className={classes.root}>
        <EditorGuideComponent editor={editor}></EditorGuideComponent>

        <Input.TextArea
          rows={8}
          className={classes.text}
          value={editor.editorValue}
          onChange={(e) => this.setValue(e.currentTarget.value)}
          allowClear
        />
      </div>
    );
  }
}

function mapStateToProps(state: AppState): ReduxProps {
  const { editor } = state;
  return { editor };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    editorUpdated: (x) => dispatch(EditorUpdatedAction.get(x)),
  };
}

export default connect<ReduxProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(EditorComponent));
