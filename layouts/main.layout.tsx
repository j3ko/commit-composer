import { Col, Layout, Row } from 'antd';
import BuildEnvironmentComponent from 'components/common/build-environment.component';
import HeaderLinksComponent from 'components/common/header-links.component';
import Head from 'next/head';
import Link from 'next/link';
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
      cursor: 'pointer',
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
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <Layout className={classes.root}>
        <Header className={classes.header}>
          <Row justify="space-between">
            <Col>
              <Link href="/">
                <h1 className={classes.titleContainer}>commit-composer.dev</h1>
              </Link>
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
    </>
  );
};

export default MainLayout;
