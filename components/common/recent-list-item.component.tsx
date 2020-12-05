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
    padding: '5px 10px',
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
  itemClassName?: string;
  item: string;
  tooltip?: string;
  display: JSX.Element;
  onClick?: (item: string) => void;
}
export interface ReduxProps {}
export interface DispatchProps {}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {}

class RecentListItemComponent extends React.Component<Props, State> {
  render(): JSX.Element {
    const { classes, display, item, itemClassName, tooltip, onClick } = this.props;

    return (
      <Tooltip
        mouseEnterDelay={1.5}
        overlayClassName={classes.tooltip}
        title={tooltip}
        mouseLeaveDelay={0}>
        <Col
          className={classNames(classes.itemContainer, itemClassName)}
          onClick={() => onClick?.(item)}>
          <Row className={classes.center}>{display}</Row>
        </Col>
      </Tooltip>
    );
  }
}

export default withStyles(styles)(RecentListItemComponent);
