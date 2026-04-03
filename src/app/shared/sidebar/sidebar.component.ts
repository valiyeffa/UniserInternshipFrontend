import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GlobalService, Module, Menu } from '../../core/services/global.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  modules: Module[] = [];
  menus: { [moduleId: number]: Menu[] } = {};
  activeModuleId: number | null = null;

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
      if (this.modules.length > 0) {
        this.activeModuleId = this.modules[0].id;
        this.modules.forEach(m => this.loadMenus(m.id));
      }
    }
  });
}

loadMenus(moduleId: number) {
  this.globalService.getMenus(moduleId).subscribe({
    next: (menus) => {
      this.menus[moduleId] = menus;
    }
  });
}

  toggleModule(moduleId: number) {
    this.activeModuleId = this.activeModuleId === moduleId ? null : moduleId;
  }
}