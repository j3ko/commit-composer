import { Col, Row } from 'antd';
import React from 'react';
import withStyles, { WithStylesProps } from 'react-jss';

const styles = {
  root: {
    whiteSpace: 'nowrap',
    padding: '9px',
    flexWrap: 'nowrap',
    '&:hover': {
      backgroundColor: '#f5f5f5',
      cursor: 'pointer',
    },
  },
};

export interface OwnProps {
  item: string;
  icon?: JSX.Element;
  onClick?: (item: string) => void;
}
export interface ReduxProps {}
export interface DispatchProps {}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {}

class SearchableMenuItemComponent extends React.Component<Props, State> {
  render(): JSX.Element {
    const { classes, children, icon, onClick, item } = this.props;

    return (
      <Row className={classes.root} onClick={() => onClick?.(item)}>
        <Col flex="none">{icon}</Col>
        <Col flex="auto">{children}</Col>
      </Row>
    );
  }
}

export default withStyles(styles)(SearchableMenuItemComponent);
