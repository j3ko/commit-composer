import { Col, Layout, Row } from 'antd';
import BuildEnvironmentComponent from 'components/common/build-environment.component';
import HeaderLinksComponent from 'components/common/header-links.component';
import { FunctionComponent } from 'react';
import { createUseStyles, useTheme } from 'react-jss';

const { Header, Footer, Content } = Layout;

const useStyles = (theme: CommitComposerTheme) =>
  createUseStyles({
    root: {
      minHeight: '100vh',
    },
    header: {
      color: theme.lighter,
      backgroundColor: theme.dark,
      width: '100%',
    },
    titleContainer: {
      color: theme.lighter,
    },
    buttonContainer: {
      textAlign: 'right',
    },
    footer: {
      textAlign: 'right',
      height: theme.layoutFooterHeight,
    },
  });

interface HookProps {
  children: JSX.Element;
}

export const MainLayout: FunctionComponent<HookProps> = ({ children }) => {
  const theme = useTheme();
  const classes = useStyles(theme)();

  return (
    <Layout className={classes.root}>
      <Header className={classes.header}>
        <Row justify="space-between">
          <Col>
            <h1 className={classes.titleContainer}>commit-composer.dev</h1>
          </Col>
          <Col className={classes.buttonContainer}>
            <HeaderLinksComponent></HeaderLinksComponent>
          </Col>
        </Row>
      </Header>
      <Content>{children}</Content>
      <Footer className={classes.footer}>
        <BuildEnvironmentComponent></BuildEnvironmentComponent>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
