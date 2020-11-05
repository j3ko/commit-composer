import 'styles/styles.css';

import { MainLayout } from 'layouts/main.layout';
import App, { AppProps } from 'next/app';
import { IconContext } from 'react-icons';
import { ThemeProvider } from 'react-jss';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { PlainAction } from 'redux-typed-actions';
import { AppState } from 'state';
import rootEpic from 'state/epics';
import rootReducer from 'state/reducers';
import variables from 'styles/variables.module.less';

const theme: CommitComposerTheme = { ...variables };

const epicMiddleware = createEpicMiddleware<PlainAction, PlainAction, AppState>();
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);

class MyApp extends App<AppProps> {
  // // TODO: remove hacky fix for `react-jss` production bug: https://github.com/cssinjs/jss/issues/1200
  // componentDidMount(): void {
  //   const style = document.getElementById('server-side-styles');

  //   if (style) {
  //     style.parentNode.removeChild(style);
  //   }
  // }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    // TODO: fix this `any` cast
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getLayout = (Component as any).getLayout || ((page) => <MainLayout>{page}</MainLayout>);

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <IconContext.Provider value={{ className: 'anticon' }}>
            {getLayout(<Component {...pageProps} />)}
          </IconContext.Provider>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default MyApp;
