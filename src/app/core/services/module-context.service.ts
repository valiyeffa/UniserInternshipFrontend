import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Module, Menu } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleContextService {
  private activeModuleSubject = new BehaviorSubject<Module | null>(null);
  private activeMenuSubject = new BehaviorSubject<Menu | null>(null);
  private modulesMenusSubject = new BehaviorSubject<Menu[]>([]);

  activeModule$ = this.activeModuleSubject.asObservable();
  activeMenu$ = this.activeMenuSubject.asObservable();
  modulesMenus$ = this.modulesMenusSubject.asObservable();

  setActiveModule(module: Module | null) {
    this.activeModuleSubject.next(module);
  }

  setActiveMenu(menu: Menu | null) {
    this.activeMenuSubject.next(menu);
  }

  setModulesMenus(menus: Menu[]) {
    this.modulesMenusSubject.next(menus);
  }

  getActiveModule(): Module | null {
    return this.activeModuleSubject.value;
  }

  getActiveMenu(): Menu | null {
    return this.activeMenuSubject.value;
  }

  getModulesMenus(): Menu[] {
    return this.modulesMenusSubject.value;
  }
}
