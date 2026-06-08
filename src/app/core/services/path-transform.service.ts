import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathTransformService {
  extractAngularPath(link: string): string {
    let path = link.trim().toLowerCase();

    if (path.startsWith('/')) {
      path = path.slice(1);
    }
    if (path.startsWith('modules/')) {
      path = path.replace('modules/', '');
    }
    if (path.startsWith('order/')) {
      path = path.replace('order/', 'orders/');
    }

    if (path === 'order') {
      path = 'orders';
    }

    if (path === 'roles' || path === 'users') {
      path = 'settings/' + path;
    }

    if (path === 'railwayorders' || path === 'railway-orders') {
      path = 'orders/railwayOrders';
    }

    return '/' + path;
  }

   matchesUrl(currentUrl: string, angularPath: string): boolean {
    return currentUrl.toLowerCase().includes(angularPath.toLowerCase());
  }
}