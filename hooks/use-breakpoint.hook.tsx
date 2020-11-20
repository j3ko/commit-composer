import { ScreenMap } from 'antd/lib/_util/responsiveObserve';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { FunctionComponent } from 'react';

type HookChildren = (value: ScreenMap) => JSX.Element | null;

interface HookProps {
  children: HookChildren;
}

export const UseBreakpointHook: FunctionComponent<HookProps> = ({ children }) => {
  const screen: ScreenMap = useBreakpoint();

  return children(screen);
};

export default UseBreakpointHook;
