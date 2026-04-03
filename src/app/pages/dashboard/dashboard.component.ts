import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService, Module, Menu } from '../../core/services/global.service';

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

  constructor(private globalService: GlobalService) {}

  ngOnInit() {
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
      next: (menus) => {
        this.menus[moduleId] = menus;
      },
      error: () => {
        this.menus[moduleId] = [];
      }
    });
  }
}