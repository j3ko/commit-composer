/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="react-jss" />

declare type CommitComposerTheme = Styles;

declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}
