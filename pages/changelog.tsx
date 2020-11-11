import { Col, Row } from 'antd';
import MarkdownComponent from 'components/common/markdown.component';
import { MainLayout } from 'layouts/main.layout';
import React from 'react';
import withStyles, { WithStylesProps } from 'react-jss';

const styles = {
  root: {
    marginTop: 40,
  },
};

export interface OwnProps {}
export interface ReduxProps {}
export interface DispatchProps {}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {
  markdown: string;
}

export class Changelog extends React.Component<Props, State> {
  static getLayout = (page: JSX.Element): JSX.Element => <MainLayout>{page}</MainLayout>;

  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      markdown: '',
    };
  }

  componentDidMount() {
    fetch(`/CHANGELOG.md`).then((x) => {
      if (x.status === 200) {
        x.text().then((markdown) => this.setState({ markdown }));
      } else {
        this.setState({ markdown: `# Unable to read changelog` });
      }
    });
  }

  render(): JSX.Element {
    const { classes } = this.props;
    const { markdown } = this.state;

    return (
      <Row className={classes.root}>
        <Col xs={0} sm={2} md={4} lg={6} xl={8}></Col>
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <MarkdownComponent markdown={markdown} />
        </Col>
        <Col xs={0} sm={2} md={4} lg={6} xl={8}></Col>
      </Row>
    );
  }
}
export default withStyles(styles)(Changelog);
