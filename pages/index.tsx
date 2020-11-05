import { Col, Row, Space } from 'antd';
import ConfigEditorComponent from 'components/config/config-editor.component';
import ConfigSwitcherComponent from 'components/config/config-switcher.component';
import EditorCopyComponent from 'components/editor/editor-copy.component';
import EditorFormatComponent from 'components/editor/editor-format.component';
import EditorSummaryComponent from 'components/editor/editor-summary.component';
import EditorValidationComponent from 'components/editor/editor-validation.component';
import EditorComponent from 'components/editor/editor.component';
import { MainLayout } from 'layouts/main.layout';
import React from 'react';
import withStyles, { WithStylesProps } from 'react-jss';

const styles = {
  validationContainer: {
    paddingTop: 20,
  },
  editContainer: {
    paddingTop: 20,
    height: 200,
  },
  summaryContainer: {},
  buttonContainer: {
    textAlign: 'right',
  },
  configContainer: {
    paddingTop: 20,
    height: 200,
    width: '100%',
  },
  uploadContainer: {
    paddingTop: 20,
    textAlign: 'right',
  },
};

export interface OwnProps {}
export interface ReduxProps {}
export interface DispatchProps {}
type Props = WithStylesProps<typeof styles> & OwnProps & ReduxProps & DispatchProps;
export interface State {}

export class Index extends React.Component<Props, State> {
  static getLayout = (page: JSX.Element): JSX.Element => <MainLayout>{page}</MainLayout>;

  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {};
  }

  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <>
        <Row>
          <Col xs={0} sm={1} md={2} lg={4} xl={4}></Col>
          <Col xs={24} sm={22} md={18} lg={16} xl={16} className={classes.validationContainer}>
            <EditorValidationComponent></EditorValidationComponent>
          </Col>
          <Col xs={0} sm={1} md={2} lg={4} xl={4}></Col>
        </Row>

        <Row>
          <Col xs={0} sm={1} md={2} lg={4} xl={4}></Col>
          <Col xs={24} sm={22} md={18} lg={16} xl={16} className={classes.editContainer}>
            <EditorComponent></EditorComponent>
          </Col>
          <Col xs={0} sm={1} md={2} lg={4} xl={4}></Col>
        </Row>

        <Row>
          <Col xs={0} sm={1} md={2} lg={4} xl={4}></Col>
          <Col xs={24} sm={22} md={18} lg={16} xl={16} className={classes.summaryContainer}>
            <EditorSummaryComponent></EditorSummaryComponent>
          </Col>
          <Col xs={0} sm={1} md={2} lg={4} xl={4}></Col>
        </Row>

        <Row>
          <Col xs={0} sm={1} md={2} lg={4} xl={4}></Col>
          <Col xs={24} sm={22} md={18} lg={16} xl={16} className={classes.buttonContainer}>
            <Space>
              <ConfigSwitcherComponent></ConfigSwitcherComponent>
              <EditorFormatComponent></EditorFormatComponent>
              <EditorCopyComponent></EditorCopyComponent>
            </Space>
          </Col>
          <Col xs={0} sm={1} md={2} lg={4} xl={4}></Col>
        </Row>

        <Row>
          <Col xs={0} sm={1} md={2} lg={4} xl={4}></Col>
          <Col xs={24} sm={22} md={18} lg={16} xl={16} className={classes.configContainer}>
            <ConfigEditorComponent></ConfigEditorComponent>
          </Col>
          <Col xs={0} sm={1} md={2} lg={4} xl={4}></Col>
        </Row>
      </>
    );
  }
}
export default withStyles(styles)(Index);
