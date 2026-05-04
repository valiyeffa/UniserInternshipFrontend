import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contracts',
  imports: [SideBarComponent, RouterOutlet],
  templateUrl: './contracts.component.html',
})

export class ContractsComponent {
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
    this.globalService.getMenus(1).subscribe({
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
