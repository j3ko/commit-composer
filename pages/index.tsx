import { Col, Row } from 'antd';
import classNames from 'classnames';
import WriteUpComponent from 'components/common/write-up.component';
import ConfigEditorComponent from 'components/config/config-editor.component';
import EditorActionsComponent from 'components/editor/editor-actions.component';
import EditorSummaryComponent from 'components/editor/editor-summary.component';
import EditorValidationComponent from 'components/editor/editor-validation.component';
import EditorComponent from 'components/editor/editor.component';
import UseBreakpointHook from 'hooks/use-breakpoint.hook';
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
  summaryContainer: {
    padding: '0 0 3px 0',
  },
  buttonContainer: {
    textAlign: 'right',
  },
  configContainer: {
    paddingTop: 20,
  },
  writeUpContainer: {
    paddingTop: 20,
  },
  uploadContainer: {
    paddingTop: 20,
    textAlign: 'right',
  },
  center: {
    textAlign: 'center',
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
          <UseBreakpointHook>
            {(screen) => {
              return (
                <Col
                  xs={24}
                  sm={22}
                  md={18}
                  lg={16}
                  xl={16}
                  className={classNames(classes.summaryContainer, {
                    [classes.center]: !screen.md,
                  })}>
                  <EditorSummaryComponent></EditorSummaryComponent>
                </Col>
              );
            }}
          </UseBreakpointHook>
          <Col xs={0} sm={1} md={2} lg={4} xl={4}></Col>
        </Row>

        <Row>
          <Col xs={0} sm={1} md={2} lg={4} xl={4}></Col>
          <Col xs={24} sm={22} md={18} lg={16} xl={16} className={classes.buttonContainer}>
            <EditorActionsComponent></EditorActionsComponent>
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

        <Row>
          <Col xs={0} sm={1} md={2} lg={4} xl={4}></Col>
          <Col xs={24} sm={22} md={18} lg={16} xl={16} className={classes.writeUpContainer}>
            <WriteUpComponent></WriteUpComponent>
          </Col>
          <Col xs={0} sm={1} md={2} lg={4} xl={4}></Col>
        </Row>
      </>
    );
  }
}
export default withStyles(styles)(Index);
