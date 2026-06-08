import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { GlobalService, Menu } from '../../core/services/global.service';
import { ModuleContextService } from '../../core/services/module-context.service';
import { PathTransformService } from '../../core/services/path-transform.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  menus: Menu[] = [];
  activeMenu: Menu | null = null;
  moduleName = '';
  username = '';
  dropdownOpen = false;

  private routerSub?: Subscription;
  private menuSub?: Subscription;
  private activeMenuSub?: Subscription;
  private moduleNameSub?: Subscription;

  constructor(
    private globalService: GlobalService,
    private moduleContext: ModuleContextService,
    private router: Router,
    private toast: ToastService,
    private pathTransform: PathTransformService
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') || 'User';

    this.menuSub = this.moduleContext.modulesMenus$.subscribe((menus: Menu[]) => {
      this.menus = menus;
      console.log('ORDER MODULE MENUS updated:', menus.map(m => m.link));
      this.syncActiveFromUrl();
    });

    this.activeMenuSub = this.moduleContext.activeMenu$.subscribe((menu: Menu | null) => {
      this.activeMenu = menu;
    });

    this.moduleNameSub = this.moduleContext.activeModule$.subscribe((module) => {
      this.moduleName = module?.value || '';
    });

    
    this.routerSub = this.router.events.pipe(
  filter(e => e instanceof NavigationEnd)
).subscribe(() => {
  console.log('CURRENT URL:', this.router.url);
  if (this.menus.length > 0) {
    this.syncActiveFromUrl();
  }
});
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
    this.menuSub?.unsubscribe();
    this.activeMenuSub?.unsubscribe();
    this.moduleNameSub?.unsubscribe();
  }

   navigateToMenu(menu: Menu) {
  this.activeMenu = menu;
  this.moduleContext.setActiveMenu(menu);

  const link = (menu.link || '').trim();
  if (!link) {
    console.warn('Menu link boşdur:', menu);
    return;
  }

  let angularPath = this.pathTransform.extractAngularPath(menu.link || '');

  // ✅ "dashboard" linki cari modulun dashboard-una getməlidir
  if (angularPath === '/dashboard') {
    const currentUrl = this.router.url;
    if (currentUrl.startsWith('/orders')) {
      angularPath = '/orders/dashboard';
    }
  }

  console.log('MENU CLICKED:', { original: menu.link, extracted: angularPath });
  this.router.navigate([angularPath]);
}
  
  
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

   syncActiveFromUrl() {
  if (!this.menus.length) return;

  const currentUrl = this.router.url.toLowerCase().trim();

  let matched: Menu | undefined;
  let bestMatchLength = 0;

  this.menus.forEach(m => {
    // ✅ toLowerCase() path-ə də tətbiq et
    const rawPath = this.pathTransform.extractAngularPath((m?.link || '').trim());
    const path = rawPath.toLowerCase();

    if (!path || path.length < 2) return;

    if (currentUrl === path || currentUrl.startsWith(path + '/')) {
      if (path.length > bestMatchLength) {
        bestMatchLength = path.length;
        matched = m;
      }
    }
  });

  if (matched) {
    this.activeMenu = matched;
    this.moduleContext.setActiveMenu(matched);
  } else {
    this.activeMenu = null;
  }
}

  logout() {
    localStorage.clear();
    this.toast.info('Sistemdən çıxdınız.');
    this.router.navigate(['/login']);
    
  }
}