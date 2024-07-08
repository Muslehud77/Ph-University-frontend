import { NavLink } from 'react-router-dom';

import { TPath, TSideBar } from '../types';



export const sideNavbarRoutesGenerator = (paths: TPath[]) => {
  const sidebarRoutes = paths.reduce((acc: TSideBar[], item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={item.path}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          return {
            key: child.name,
            label: <NavLink to={child.path!}>{child.name}</NavLink>,
          };
        } ),
      } as TSideBar);
    }
    return acc;
  }, []);

  return sidebarRoutes;
};
