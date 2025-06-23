'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { routeNames } from '@/constants/routes';

type BreadcrumbItemType = {
  name: string;
  href: string;
  isLast: boolean;
};

export function Breadcrumbs() {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItemType[] => {
    const segments = pathname.split('/').filter(Boolean);

    // If on the root dashboard page, only show "Dashboard"
    if (segments.length === 1 && segments[0] === 'dashboard') {
      return [{ name: 'Dashboard', href: '/dashboard', isLast: true }];
    }

    const breadcrumbs: BreadcrumbItemType[] = [
      { name: 'Dashboard', href: '/dashboard', isLast: segments.length === 0 },
    ];

    let currentPath = '';
    // Start from the first segment, as dashboard is already added
    segments.forEach((segment, index) => {
      // Skip the 'dashboard' segment as it's the root
      if (segment === 'dashboard') {
        return;
      }
      currentPath += `/${segment}`;
      const name =
        routeNames[currentPath] ||
        segment.charAt(0).toUpperCase() + segment.slice(1);

      // We need to build the full path from the root for the href
      const fullPath = `/dashboard${currentPath}`;

      breadcrumbs.push({
        name,
        href: fullPath,
        isLast: index === segments.length - 1,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={`${breadcrumb.href}-${index}`}>
            <BreadcrumbItem>
              {breadcrumb.isLast ? (
                <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={breadcrumb.href}>{breadcrumb.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!breadcrumb.isLast && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
