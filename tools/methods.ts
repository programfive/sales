import { routeNames } from '@/constants/routes';
import { BreadcrumbItemType } from '@/types';

export const getInitials = (name: string) => {
  const words = name.split(' ');
  if (words.length > 1) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const generateBreadcrumbs = (pathname: string): BreadcrumbItemType[] => {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 1 && segments[0] === 'dashboard') {
    return [{ name: 'Dashboard', href: '/dashboard', isLast: true }];
  }

  const breadcrumbs: BreadcrumbItemType[] = [
    { name: 'Dashboard', href: '/dashboard', isLast: segments.length === 0 },
  ];

  let currentPath = '';
  segments.forEach((segment, index) => {
    if (segment === 'dashboard') {
      return;
    }
    currentPath += `/${segment}`;
    let name;
    if (segment === 'edit') {
      name = 'Editar';
    } else if (segment === 'show') {
      name = 'Mostrar';
    } else if (
      !isNaN(Number(segment)) &&
      (segments.includes('edit') || segments.includes('show'))
    ) {
      return;
    } else {
      name =
        routeNames[currentPath] ||
        segment.charAt(0).toUpperCase() + segment.slice(1);
    }

    const fullPath = `${currentPath}`;

    breadcrumbs.push({
      name,
      href: fullPath,
      isLast: index === segments.length - 1,
    });
  });

  return breadcrumbs;
};
