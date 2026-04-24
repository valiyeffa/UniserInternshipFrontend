import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService, Menu } from '../../core/services/global.service';
import { ModuleContextService } from '../../core/services/module-context.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  menus: Menu[] = [];
  isLoading = true;

  constructor(
    private globalService: GlobalService,
    private moduleContext: ModuleContextService
  ) {}

  ngOnInit() {
    this.loadModuleMenus('order');
  }

  loadModuleMenus(moduleName: string) {
    this.globalService.getMenusByModuleName(moduleName).subscribe({
      next: (menus) => {
        this.menus = menus;
        this.moduleContext.setModulesMenus(menus);
        if (menus.length > 0) {
          this.moduleContext.setActiveMenu(menus[0]);
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.moduleContext.setModulesMenus([]);
      }
    });
  }
}
