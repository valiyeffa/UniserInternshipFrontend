import { Component } from '@angular/core';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [SideBarComponent, RouterOutlet],
  templateUrl: './settings.component.html',
  styles: ``
})
export class SettingsComponent {
  subMenus!: any[];

  constructor(
    private globalService: GlobalService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadMenus();

    this.globalService.menusRefresh$.subscribe(() => {
      this.loadMenus();
    })
  }

  private loadMenus() {
    this.globalService.getMenus(8).subscribe({
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
