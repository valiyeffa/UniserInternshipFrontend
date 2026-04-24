import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { GlobalService, Menu, Module } from '../../core/services/global.service';
import { ModuleContextService } from '../../core/services/module-context.service';

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
    private router: Router
  ) {}

  ngOnInit() {
    // Listen to username / module context
    this.username = localStorage.getItem('username') || 'User';

    // Get menus from ModuleContextService (set by the active page component)
    this.menuSub = this.moduleContext.modulesMenus$.subscribe(menus => {
      this.menus = menus;
    });

    this.activeMenuSub = this.moduleContext.activeMenu$.subscribe(menu => {
      this.activeMenu = menu;
    });

  
    this.moduleNameSub = this.moduleContext.activeModule$.subscribe(module => {
    this.moduleName = module?.value || '';
    });
    

    // Sync active menu highlight when URL changes
    this.routerSub = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => this.syncActiveFromUrl());
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
    this.menuSub?.unsubscribe();
    this.activeMenuSub?.unsubscribe();
    this.moduleNameSub?.unsubscribe();
  }

  /**
   * Called when user clicks a menu button.
   * Determines the correct child route and navigates there.
   */
  navigateToMenu(menu: Menu) {
    this.activeMenu = menu;
    this.moduleContext.setActiveMenu(menu);

    const link  = (menu.link  || '').toLowerCase();
    const value = (menu.value || '').toLowerCase();

    // Detect which settings child route to navigate to
    if (this.router.url.includes('settings')) {
      if (link.includes('role') || link.includes('rol') ||
          value.includes('role') || value.includes('rol')) {
        this.router.navigate(['/settings/roles']);
      } else if (link.includes('user') || value.includes('user') ||
                 value.includes('istifadə') || value.includes('istifadeci')) {
        this.router.navigate(['/settings/users']);
      } else {
        // For other settings menus (Points, Cargos etc.), navigate by index
        const idx = this.menus.indexOf(menu);
        const segments: Record<number, string> = {
          0: 'users',
          1: 'roles',
          2: 'points',
          3: 'cargos'
        };
        const seg = segments[idx] ?? 'users';
        this.router.navigate([`/settings/${seg}`]);
      }
    }
    // For non-settings modules, add similar logic here
  }

  /** Highlight the correct menu button based on current URL */
  syncActiveFromUrl() {
    if (!this.menus.length) return;
    const url = this.router.url.toLowerCase();

    const matched = this.menus.find(m => {
      const link  = (m.link  || '').toLowerCase();
      const value = (m.value || '').toLowerCase();
      if (url.includes('/roles')) {
        return link.includes('role') || link.includes('rol') ||
               value.includes('role') || value.includes('rol');
      }
      if (url.includes('/users')) {
        return link.includes('user') || value.includes('user') ||
               value.includes('istifadə') || value.includes('istifadeci');
      }
      return false;
    });

    if (matched) {
      this.activeMenu = matched;
      this.moduleContext.setActiveMenu(matched);
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}