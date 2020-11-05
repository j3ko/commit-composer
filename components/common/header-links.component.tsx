import { Button, Space, Tooltip } from 'antd';
import Link from 'next/link';
import React from 'react';
import { FaBullhorn, FaGithub } from 'react-icons/fa';

export interface OwnProps {}
export interface ReduxProps {}
export interface DispatchProps {}
type Props = OwnProps & ReduxProps & DispatchProps;
export interface State {}

export default class HeaderLinksComponent extends React.Component<Props, State> {
  render(): JSX.Element {
    return (
      <Space>
        <Link href="http://www.github.com">
          <Tooltip title="Changelog">
            <Button ghost shape="circle" icon={<FaBullhorn />} />
          </Tooltip>
        </Link>
        <Link href="http://www.github.com">
          <Tooltip title="GitHub">
            <Button ghost shape="circle" icon={<FaGithub />} />
          </Tooltip>
        </Link>
      </Space>
    );
  }
}
