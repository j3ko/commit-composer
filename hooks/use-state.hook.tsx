import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';

type HookChildren = (
  value: string,
  setValue: Dispatch<SetStateAction<string>>,
) => JSX.Element | null;

interface HookProps {
  children: HookChildren;
}

export const UseStateHook: FunctionComponent<HookProps> = ({ children }) => {
  const [value, setValue] = useState('');

  return children(value, setValue);
};

export default UseStateHook;
