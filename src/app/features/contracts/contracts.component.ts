import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";

@Component({
  selector: 'app-contracts',
  imports: [SideBarComponent],
  templateUrl: './contracts.component.html',
})

export class ContractsComponent {
  subMenus!: any[];

  constructor(
    private globalService: GlobalService,
  ) { }

  ngOnInit() {
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
