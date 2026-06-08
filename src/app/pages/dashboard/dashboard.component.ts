// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GlobalService, Module, Menu } from '../../core/services/global.service';
import { ModuleContextService } from '../../core/services/module-context.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  modules: Module[] = [];
  menus: { [moduleId: number]: Menu[] } = {};
  isLoading = true;
  errorMessage = '';
  activeIndex: number = -1;

  constructor(
    private globalService: GlobalService,
    private router: Router,
    private moduleContext: ModuleContextService
  ) {}

  ngOnInit() {
    this.moduleContext.setModulesMenus([]);
    this.moduleContext.setActiveMenu(null);
    this.loadModules();
  }

  loadModules() {
    this.globalService.getModules().subscribe({
      next: (modules) => {
        this.modules = modules.map(m => ({
          ...m,
          name: m.value?.replace('.svg', '').replace(/([A-Z])/g, ' $1').trim()
        }));
        this.isLoading = false;
        this.modules.forEach(module => {
          this.loadMenus(module.id);
        });
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Modullar yüklənərkən xəta baş verdi!';
      }
    });
  }

  loadMenus(moduleId: number) {
    this.globalService.getMenus(moduleId).subscribe({
      next: (menus) => { this.menus[moduleId] = menus; },
      error: () => { this.menus[moduleId] = []; }
    });
  }

  navigate(moduleName: string, index: number) {
    this.activeIndex = index;
    const routes: { [key: string]: string } = {
      'Settings': '/settings',
      'Orders': '/orders'             
    };
    const route = routes[moduleName];
    console.log('Navigating to:', moduleName, '->', route); 
    
    if (route) {
      this.router.navigate([route]);
    } else {
      console.warn('Route not found for module:', moduleName);
    }
  }

  getIcon(moduleName: string): string {
    const icons: { [key: string]: string } = {
      'Contracts': '📄',
      'Orders': '📦',
      'Railway operations': '🚆',
      'Marine Operations': '🚢',
      'Truck Operations': '🚛',
      'Terminal operations': '🏗️',
      'Finance': '💼',
      'Reporting': '📊',
      'Settings': '⚙️',
      'General': '👤',
    };
    return icons[moduleName] ?? '📋';
  }
}