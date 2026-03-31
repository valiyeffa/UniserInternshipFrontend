import { Component } from '@angular/core';
import { PageCardComponent } from "../../components/page-card/page-card.component";
import { GlobalService } from '../../services/global.service';
import { Modules } from '../../models/model';

@Component({
  selector: 'app-home',
  imports: [PageCardComponent],
  standalone: true,
  templateUrl: './home.component.html',
})

export class HomeComponent {

  constructor(private globalService: GlobalService) { }

  modules!: Modules[];

  ngOnInit() {
    this.globalService.getModules().subscribe({
      next: (res) => {
        this.modules = res.data;
        // console.log(this.modules);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
