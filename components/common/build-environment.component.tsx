import { Typography } from 'antd';
import React from 'react';

export interface OwnProps {}
export interface ReduxProps {}
export interface DispatchProps {}
type Props = OwnProps & ReduxProps & DispatchProps;
export interface State {}

export default class BuildEnvironmentComponent extends React.Component<Props, State> {
  render(): JSX.Element {
    return (
      <Typography.Text type="secondary">
        Build {process.env.PACKAGE_VERSION}{' '}
        {process.env.NEXT_PUBLIC_BUILD !== 'prod' ? `(${process.env.NEXT_PUBLIC_BUILD})` : ''}
      </Typography.Text>
    );
  }
}
