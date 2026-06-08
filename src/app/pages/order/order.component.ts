import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { GlobalService, Menu } from '../../core/services/global.service';
import { ModuleContextService } from '../../core/services/module-context.service';
import { PathTransformService } from '../../core/services/path-transform.service';
import { inject } from '@angular/core'; 

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  menus: Menu[] = [];
  private routerSub?: Subscription;
  
  private globalService = inject(GlobalService);
  private moduleContext = inject(ModuleContextService);
  private router = inject(Router);
  private pathTransform = inject(PathTransformService);

  ngOnInit() { // qlobal servisden order modulunna aid menyulari getiririk 
    this.globalService.getMenusByModuleName('orders').subscribe({
      next: (menus) => { // menyular uqurla geldiyi zaman 
        this.menus = menus || []; // gelen menyulari yazdiriq menyu arreyina yad agelmiyibse yoxdusa bos arrey yaziriq 
        // console.log('ORDER MODULE MENUS:', this.menus);
        this.moduleContext.setModulesMenus(this.menus); // menyulari module kontexde gonderik ki navbarda gorunsun
        this.syncActiveMenuFromUrl();
      },
      error: () => {
        // xeta olsada navbar islesin
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

  const matched = this.menus.find(m => {
    const angularPath = this.pathTransform
      .extractAngularPath((m?.link || '').trim())
      .toLowerCase();
    return angularPath.length > 1 && currentUrl.includes(angularPath);
  });

  if (matched) {
    this.moduleContext.setActiveMenu(matched);
  }
}
}