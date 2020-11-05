import { Typography } from 'antd';
import React from 'react';
import withStyles, { WithStylesProps } from 'react-jss';
import { connect } from 'react-redux';
import { AppState, EditorState } from 'state';

const styles = {
  root: {
    fontSize: 11,
  },
};

export interface OwnProps {}
export interface ReduxProps {
  editor: EditorState;
}
export interface DispatchProps {}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {}

class EditorSummaryComponent extends React.Component<Props, State> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Typography.Text type="secondary" className={classes.root}>
        (Title count: {this.props.editor.validationResult?.commit?.header?.length || 0}) - (Body
        count: {this.props.editor.validationResult?.commit?.body?.length || 0}) - (Footer count:{' '}
        {this.props.editor.validationResult?.commit?.footer?.length || 0})
      </Typography.Text>
    );
  }
}

function mapStateToProps(state: AppState): ReduxProps {
  const { editor } = state;
  return { editor };
}

export default connect<ReduxProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  null,
)(withStyles(styles)(EditorSummaryComponent));
