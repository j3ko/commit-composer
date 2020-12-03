import { Col, Row } from 'antd';
import classNames from 'classnames';
import WriteUpComponent from 'components/common/write-up.component';
import ConfigEditorComponent from 'components/config/config-editor.component';
import EditorActionsComponent from 'components/editor/editor-actions.component';
import EditorSummaryComponent from 'components/editor/editor-summary.component';
import EditorValidationComponent from 'components/editor/editor-validation.component';
import EditorComponent from 'components/editor/editor.component';
import GitmojiPickerComponent from 'components/preset/gitmoji-picker.component';
import ScopePickerComponent from 'components/preset/scope-picker.component';
import TypePickerComponent from 'components/preset/type-picker.component';
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
  static getLayout = (page: JSX.Element): JSX.Element => (
    <MainLayout title="Conventional commit composer">{page}</MainLayout>
  );

  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {};
  }

  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <>
        <Row>
          <Col xs={0} sm={1} md={2} lg={4} xl={5}></Col>
          <Col xs={24} sm={22} md={18} lg={16} xl={14} className={classes.validationContainer}>
            <EditorValidationComponent></EditorValidationComponent>
          </Col>
          <Col xs={0} sm={1} md={2} lg={4} xl={5}></Col>
        </Row>

        <Row>
          <Col xs={0} sm={1} md={2} lg={4} xl={5}></Col>
          <Col xs={24} sm={22} md={18} lg={16} xl={14} className={classes.editContainer}>
            <EditorComponent>
              <TypePickerComponent></TypePickerComponent>
              <ScopePickerComponent></ScopePickerComponent>
              <GitmojiPickerComponent></GitmojiPickerComponent>
            </EditorComponent>
          </Col>
          <Col xs={0} sm={1} md={2} lg={4} xl={5}></Col>
        </Row>

        <Row>
          <Col xs={0} sm={1} md={2} lg={4} xl={5}></Col>
          <UseBreakpointHook>
            {(screen) => {
              return (
                <Col
                  xs={24}
                  sm={22}
                  md={18}
                  lg={16}
                  xl={14}
                  className={classNames(classes.summaryContainer, {
                    [classes.center]: !screen.md,
                  })}>
                  <EditorSummaryComponent></EditorSummaryComponent>
                </Col>
              );
            }}
          </UseBreakpointHook>
          <Col xs={0} sm={1} md={2} lg={4} xl={5}></Col>
        </Row>

        <Row>
          <Col xs={0} sm={1} md={2} lg={4} xl={5}></Col>
          <Col xs={24} sm={22} md={18} lg={16} xl={14} className={classes.buttonContainer}>
            <EditorActionsComponent></EditorActionsComponent>
          </Col>
          <Col xs={0} sm={1} md={2} lg={4} xl={5}></Col>
        </Row>

        <Row>
          <Col xs={0} sm={1} md={2} lg={4} xl={5}></Col>
          <Col xs={24} sm={22} md={18} lg={16} xl={14} className={classes.configContainer}>
            <ConfigEditorComponent></ConfigEditorComponent>
          </Col>
          <Col xs={0} sm={1} md={2} lg={4} xl={5}></Col>
        </Row>

        <Row>
          <Col xs={0} sm={1} md={2} lg={4} xl={5}></Col>
          <Col xs={24} sm={22} md={18} lg={16} xl={14} className={classes.writeUpContainer}>
            <WriteUpComponent></WriteUpComponent>
          </Col>
          <Col xs={0} sm={1} md={2} lg={4} xl={5}></Col>
        </Row>
      </>
    );
  }
}
export default withStyles(styles)(Index);
