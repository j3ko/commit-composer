import { Col, Row, Tooltip } from 'antd';
import classNames from 'classnames';
import React from 'react';
import withStyles, { WithStylesProps } from 'react-jss';

const styles = (theme: CommitComposerTheme) => ({
  center: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    minHeight: 25,
    minWidth: 25,
    padding: 10,
    '&:hover': {
      backgroundColor: theme.itemHoverBG,
      cursor: 'pointer',
    },
  },
  tooltip: {
    fontSize: 12,
  },
});

export interface OwnProps {
  item: string;
  title: string;
  display?: JSX.Element;
  onClick?: (item: string) => void;
}
export interface ReduxProps {}
export interface DispatchProps {}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {}

class RecentListItemComponent extends React.Component<Props, State> {
  render(): JSX.Element {
    const { classes, display, item, title, onClick } = this.props;

    return (
      <Tooltip overlayClassName={classes.tooltip} title={title} mouseLeaveDelay={0}>
        <Col className={classNames(classes.itemContainer)} onClick={() => onClick?.(item)}>
          <Row className={classes.center}>{display}</Row>
        </Col>
      </Tooltip>
    );
  }
}

export default withStyles(styles)(RecentListItemComponent);