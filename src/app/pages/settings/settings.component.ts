import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { GlobalService, Menu } from '../../core/services/global.service';
import { ModuleContextService } from '../../core/services/module-context.service';
import { PathTransformService } from '../../core/services/path-transform.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  menus: Menu[] = [];
  private routerSub?: Subscription;

  constructor(
    private globalService: GlobalService,
    private moduleContext: ModuleContextService,
    private router: Router,
    private pathTransform: PathTransformService
  ) {}

  ngOnInit() {
    // Menu yükləməsi routing-i BLOKLAMIR — router-outlet həmişə aktifdir
    this.globalService.getMenusByModuleName('settings').subscribe({
      next: (menus) => {
        this.menus = menus || [];
        this.moduleContext.setModulesMenus(this.menus);
        this.syncActiveMenuFromUrl();
      },
      error: () => {
        // Xəta olsa belə səhifə işləməlidir
      }
    });

    this.routerSub = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => this.syncActiveMenuFromUrl());
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

  syncActiveMenuFromUrl() {
    if (!this.menus.length) return;
    const currentUrl = this.router.url.toLowerCase();
    
    // Menu linkini Angular path-inə çevir (service istifadə edərək)
    const matched = this.menus.find(m => {
      const angularPath = this.pathTransform.extractAngularPath((m?.link || '').toLowerCase().trim());
      return angularPath.length > 1 && currentUrl.includes(angularPath);
    }) ?? this.menus[0];
    
    this.moduleContext.setActiveMenu(matched ?? null);
  }
}