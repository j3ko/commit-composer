import { Col, Row } from 'antd';
import classNames from 'classnames';
import React from 'react';
import withStyles, { WithStylesProps } from 'react-jss';

import RecentListItemComponent from './recent-list-item.component';

export type RecentItem = {
  item: string;
  title: string;
  display?: JSX.Element;
};

const styles = {
  root: {
    background: 'white',
    padding: '5px 9px',
  },
  titleRow: {
    fontSize: 12,
  },
  itemRow: {
    overflow: 'hidden',
    maxHeight: 42,
  },
};

export interface OwnProps {
  className?: string;
  itemClassName?: string;
  onClick?: (item: string) => void;
  items: RecentItem[];
}
export interface ReduxProps {}
export interface DispatchProps {}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {}

class RecentListComponent extends React.Component<Props, State> {
  render(): JSX.Element {
    const { classes, items, className, itemClassName, onClick } = this.props;

    return items && items.length ? (
      <Row className={classNames(classes.root, className)}>
        <Col flex="auto">
          <Row className={classes.titleRow}>Recently Used:</Row>
          <Row className={classes.itemRow}>
            {items.map((x) => (
              <RecentListItemComponent
                itemClassName={itemClassName}
                key={x.item}
                item={x.item}
                title={x.title}
                display={x.display}
                onClick={(item) => onClick?.(item)}
              />
            ))}
          </Row>
        </Col>
      </Row>
    ) : (
      <></>
    );
  }
}

export default withStyles(styles)(RecentListComponent);
