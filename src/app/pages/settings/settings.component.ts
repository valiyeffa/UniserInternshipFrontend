import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { GlobalService, Menu } from '../../core/services/global.service';
import { ModuleContextService } from '../../core/services/module-context.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  menus: Menu[] = [];
  activeMenu: Menu | null = null;
  isLoading = true;

  private routerSub?: Subscription;

  constructor(
    private globalService: GlobalService,
    private moduleContext: ModuleContextService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadModuleMenus('settings');

    // Re-sync activeMenu whenever the URL changes
    this.routerSub = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => this.syncActiveMenuFromUrl());
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

  loadModuleMenus(moduleName: string) {
    this.globalService.getMenusByModuleName(moduleName).subscribe({
      next: (menus) => {
        this.menus = menus;
        this.moduleContext.setModulesMenus(menus);
        this.syncActiveMenuFromUrl();
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  /** Match the active menu to the current URL segment */
  syncActiveMenuFromUrl() {
    if (!this.menus.length) return;
    const url = this.router.url.toLowerCase();
    const isRoles = url.includes('/settings/roles');

    const matched = this.menus.find(m => {
      const link = (m.link || '').toLowerCase();
      const val  = (m.value || '').toLowerCase();
      if (isRoles) {
        return link.includes('role') || link.includes('rol') ||
               val.includes('role')  || val.includes('rol');
      } else {
        return link.includes('user') || val.includes('user') ||
               val.includes('istifadə') || val.includes('istifadeci');
      }
    }) ?? this.menus[0];

    this.activeMenu = matched;
    this.moduleContext.setActiveMenu(matched);
  }
}