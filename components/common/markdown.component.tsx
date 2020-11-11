import React from 'react';
import ReactMarkdown from 'react-markdown';
import gitmoji from 'remark-emoji';
import gfm from 'remark-gfm';

export interface OwnProps {
  markdown?: string;
}
export interface ReduxProps {}
export interface DispatchProps {}
type Props = OwnProps & ReduxProps & DispatchProps;
export interface State {}

export default class MarkdownComponent extends React.Component<Props, State> {
  render(): JSX.Element {
    return <ReactMarkdown plugins={[gitmoji, gfm]}>{this.props.markdown}</ReactMarkdown>;
  }
}
