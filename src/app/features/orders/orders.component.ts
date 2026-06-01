import { Component } from '@angular/core';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";
import { RouterOutlet } from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-orders',
  imports: [SideBarComponent, RouterOutlet],
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  subMenus!: any[];

  constructor(
    private globalService: GlobalService,
  ) { }

  ngOnInit() {
    this.loadMenus();

    this.globalService.menusRefresh$
      .subscribe(() => {
        this.loadMenus();
      })
  }

  private loadMenus() {
    this.globalService.getMenus(2).subscribe({
      next: (res) => {
        this.subMenus = res.data;
        // console.log(this.subMenus);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
