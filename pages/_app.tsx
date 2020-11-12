import { MainLayout } from 'layouts/main.layout';
import App, { AppProps } from 'next/app';
import { IconContext } from 'react-icons';
import { ThemeProvider } from 'react-jss';
import { Provider } from 'react-redux';
import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { PersistGate } from 'redux-persist/integration/react';
import { PlainAction } from 'redux-typed-actions';
import { AppState } from 'state';
import rootEpic from 'state/epics';
import rootReducer from 'state/reducers';
import 'styles/styles.css';
import variables from 'styles/variables.module.less';


const theme: CommitComposerTheme = { ...variables };

const epicMiddleware = createEpicMiddleware<PlainAction, PlainAction, AppState>();
const store: Store<AppState & PersistPartial, AnyAction> = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware),
);

const persistor = persistStore(store);

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
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <IconContext.Provider value={{ className: 'anticon' }}>
              {getLayout(<Component {...pageProps} />)}
            </IconContext.Provider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default MyApp;
