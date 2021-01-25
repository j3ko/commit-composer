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
      [`@media only screen and (max-width: ${theme.screenSM})`]: {
        padding: '0 10px',
      },
    },
    titleContainer: {
      color: theme.lighter,
      cursor: 'pointer',
    },
    titleText: {
      [`@media only screen and (max-width: ${theme.screenSM})`]: {
        display: 'none',
      },
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
  title?: string;
}

export const MainLayout: FunctionComponent<HookProps> = ({ children, title }) => {
  const theme = useTheme();
  const classes = useStyles(theme)();
  const siteName = 'Commit-composer';
  const pageTitle = title ? `${siteName} - ${title}` : siteName;

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width,initial-scale=1" charSet="UTF-8" />
        <title>{pageTitle}</title>
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" name="title" key="title" content={pageTitle} />
        <meta
          property="og:description"
          name="description"
          key="description"
          content="A tool for composing conventional commit messages.  Commit-composer aims to bridge the gap between your favorite Git GUI and beautifully structured commit messages for your repository."
        />
        <meta
          name="keywords"
          content="commit-composer, conventional commits, commitlint, git, commitizen"></meta>
        <meta
          name="google-site-verification"
          content="nXBa4XO6AR0iHLCZ3_N-7zMpZJqUJN_nmq6Z4w3iiKM"
        />
      </Head>
      <Layout className={classes.root}>
        <Header className={classes.header}>
          <Row justify="space-between">
            <Col>
              <Link href="/">
                <h1 className={classes.titleContainer}>
                  <span aria-label="Commit-composer" role="img">
                    📝
                  </span>{' '}
                  <span className={classes.titleText}>Commit-composer</span>
                </h1>
              </Link>
            </Col>
            <Col flex="auto" className={classes.buttonContainer}>
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
