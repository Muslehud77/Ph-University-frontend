import { TPath } from "../types";


export const generateRoutes = (paths: TPath[]) => {
  const routes = paths.reduce((acc: TPath[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }
    if (item.children) {
      item.children.forEach((route) =>
        acc.push({ path: route.path, element: route.element })
      );
    }
    return acc;
  }, []);

  return routes;
};
