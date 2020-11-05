import {
  AppContextType,
  AppInitialProps,
  AppPropsType,
  NextComponentType,
  RenderPageResult,
} from 'next/dist/next-server/lib/utils';
import Document, { DocumentContext, DocumentInitialProps } from 'next/document';
import { createGenerateId, JssProvider, SheetsRegistry } from 'react-jss';

export default class JssDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const registry = new SheetsRegistry();
    const generateId = createGenerateId();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> =>
      originalRenderPage({
        enhanceApp: (App): NextComponentType<AppContextType, AppInitialProps, AppPropsType> => {
          const comp = (props): JSX.Element => {
            return (
              <JssProvider registry={registry} generateId={generateId}>
                <App {...props} />
              </JssProvider>
            );
          };
          comp.displayName = 'EnhancedApp';

          return comp;
        },
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id="server-side-styles">{registry.toString()}</style>
        </>
      ),
    };
  }
}
