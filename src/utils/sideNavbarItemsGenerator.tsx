import { NavLink } from 'react-router-dom';

import { TPath, TSideBar } from '../types';



export const sideNavbarItemsGenerator = (paths: TPath[]) => {
  const sidebarRoutes = paths.reduce((acc: TSideBar[], item) => {
    console.log(item?.children)
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
          if(!child.name){
            return
          }
          return item.name && {
            key: child.name,
            label: <NavLink to={child.path!}>{child.name}</NavLink>,
          };
        }),
      } as TSideBar);
    }
    return acc;
  }, []);

  return sidebarRoutes;
};
