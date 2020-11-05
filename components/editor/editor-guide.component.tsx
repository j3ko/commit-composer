import React from 'react';
import withStyles, { WithStylesProps } from 'react-jss';
import { EditorState } from 'state';

const styles = {
  root: {
    fontFamily: '"Source Code Pro", monospace',
    fontSize: 12,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    height: '100%',
    display: 'none',
  },
  description: {
    border: '1px dashed red',
    width: '7.2px',
    height: '20px',
  },
  body: {
    border: '1px dashed blue',
    width: '7.2px',
    height: '20px',
  },
  footer: {
    border: '1px dashed black',
    width: '7.2px',
    height: '20px',
  },
};

export interface OwnProps {
  editor: EditorState;
}
export interface ReduxProps {}
export interface DispatchProps {}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {}

class EditorGuideComponent extends React.Component<Props, State> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.description}></div>
        <div className={classes.body}></div>
        <div className={classes.footer}></div>
      </div>
    );
  }
}

export default withStyles(styles)(EditorGuideComponent);
