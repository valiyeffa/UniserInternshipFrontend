import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { GlobalService } from '../../services/global.service';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";

@Component({
  selector: 'app-main-body',
  imports: [RouterOutlet, SideBarComponent],
  templateUrl: './main-body.component.html',
})
export class MainBodyComponent {
  subMenus!: any[];
  id !: string;
 
  constructor(
    private globalService: GlobalService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.firstChild?.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.globalService.getMenus(Number(this.id)).subscribe({
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
