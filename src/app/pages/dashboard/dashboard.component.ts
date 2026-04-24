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
    this.loadModules();
    // Clear module context when on dashboard
    this.moduleContext.setActiveModule(null);
    this.moduleContext.setModulesMenus([]);
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
    const module = this.modules[index];
    this.moduleContext.setActiveModule(module);

    const routes: { [key: string]: string } = {
      'Settings': '/settings',
      'Order': '/order',
      'Orders': '/order'
    };
    const route = routes[moduleName];
    if (route) {
      this.router.navigate([route]);
    }
  }

  getIcon(moduleName: string): string {
    const icons: { [key: string]: string } = {
      'Contracts': '📄',
      'Orders': '📦',
      'Order': '📦',
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
