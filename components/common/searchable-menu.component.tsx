import { Col, Input, Row, Space, Typography } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import withStyles, { WithStylesProps } from 'react-jss';

import SearchableMenuItemComponent from './searchable-menu-item.component';

export type SearchableItem = {
  item: string;
  title: string;
  description?: string;
  icon?: JSX.Element;
};

type RenderedItem = {
  item: string;
  title: JSX.Element;
  description?: JSX.Element;
  icon?: JSX.Element;
  found: boolean;
};

const styles = (theme: CommitComposerTheme) => ({
  root: {
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    [`@media only screen and (max-width: ${theme.screenMD})`]: {
      width: '100%',
    },
  },
  description: {
    fontSize: 12,
    paddingRight: 9,
  },
  searchRow: {
    padding: 9,
  },
  itemRow: {
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  itemCol: {},
  highlight: {
    fontWeight: 'bold',
  },
  hidden: {
    display: 'none',
  },
});

export interface OwnProps {
  className?: string;
  onClick?: (item: string) => void;
  focus: boolean;
  items: SearchableItem[];
}
export interface ReduxProps {}
export interface DispatchProps {}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {
  searchInputRef: React.RefObject<Input>;
  visibleItems: RenderedItem[];
}

class SearchableMenuComponent extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      searchInputRef: React.createRef(),
      visibleItems: this.renderItems(props.items),
    };
  }

  componentDidMount(): void {
    this.focus();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (!prevProps.focus && this.props.focus) {
      this.focus();
    }
  }

  focus(): void {
    if (this.state.searchInputRef.current) {
      setTimeout(() => {
        const x = window.scrollX;
        const y = window.scrollY;
        this.state.searchInputRef.current.focus();
        window.scrollTo(x, y);
      }, 100);
    }
  }

  clear(e?: React.MouseEvent<HTMLSpanElement, MouseEvent>): void {
    const timeout = e ? 0 : 500;

    if (this.state.searchInputRef.current) {
      setTimeout(() => {
        this.state.searchInputRef.current.setValue('');
        this.onSearch(undefined);
      }, timeout);
    }

    if (e) {
      e.stopPropagation();
      this.focus();
    }
  }

  onSearch(query?: string): void {
    const { items } = this.props;
    const visibleItems = this.renderItems(items, query);
    this.setState({ visibleItems });
  }

  onSelect(item: string): void {
    this.clear();
    this.props.onClick?.(item);
  }

  renderItems(items: SearchableItem[], query?: string): RenderedItem[] {
    const { classes } = this.props;

    const highlight = (input: string, regex?: RegExp): { elem: JSX.Element; found: boolean } => {
      const parts: React.ReactNode[] = input.split(regex);
      let found = false;

      for (let i = 1; i < parts.length; i += 2) {
        parts[i] = (
          <span key={i} className={classes.highlight}>
            {parts[i]}
          </span>
        );
        found = true;
      }
      return {
        elem: <Typography.Text>{parts}</Typography.Text>,
        found,
      };
    };

    const escapeRegExp = (str: string): string => {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    return items
      .map((x) => {
        const titleRegex = query ? new RegExp(`(${escapeRegExp(query)})`, 'gi') : undefined;
        const title = highlight(x.title, titleRegex);
        const descriptionRegex = query ? new RegExp(`(${escapeRegExp(query)})`, 'gi') : undefined;
        const description = highlight(x.description, descriptionRegex);

        const found = query === undefined || query === '' || title.found || description.found;

        description.elem = React.cloneElement(description.elem, {
          type: 'secondary',
          className: classes.description,
        });

        return {
          item: x.item,
          title: title.elem,
          description: description.elem,
          icon: x.icon,
          found,
        };
      })
      .filter((x) => x.found);
  }

  render(): JSX.Element {
    const { classes, className } = this.props;
    const { visibleItems } = this.state;

    return (
      <div className={classNames(classes.root, className)}>
        <Row className={classes.searchRow}>
          <span className="ant-input-affix-wrapper">
            <Input
              placeholder="Search"
              onChange={(e) => this.onSearch(e.target.value)}
              onFocus={(e) => e.target.select()}
              onClick={(e) => e.stopPropagation()}
              ref={this.state.searchInputRef}
            />
            <span
              className={classNames('ant-input-suffix', {
                [classes.hidden]: !this.state.searchInputRef?.current?.input.value,
              })}>
              <span
                tabIndex={-1}
                role="button"
                aria-label="close-circle"
                className="anticon anticon-close-circle ant-input-clear-icon"
                onKeyDown={(e) => e.stopPropagation()}
                onClick={(e) => this.clear(e)}>
                <AiFillCloseCircle />
              </span>
            </span>
          </span>
        </Row>
        <Row className={classes.itemRow}>
          <Col flex="auto" className={classes.itemCol}>
            {visibleItems.map((x) => (
              <SearchableMenuItemComponent
                onClick={(item) => this.onSelect(item)}
                key={x.item}
                item={x.item}
                icon={x.icon}>
                <Space size={1} direction="vertical">
                  {x.title}
                  {x.description}
                </Space>
              </SearchableMenuItemComponent>
            ))}
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(styles)(SearchableMenuComponent);
