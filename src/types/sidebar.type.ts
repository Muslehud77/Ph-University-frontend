export type TSideBar = {
  key: string;
  label: JSX.Element | string;
  children?: TSideBar[];
};

export type TPath = {
  name?: string;
  path?: string;

  element?: JSX.Element;
  children?: TPath[];
};
