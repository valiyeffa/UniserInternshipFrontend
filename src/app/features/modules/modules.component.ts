import { Component } from '@angular/core';
import { PageCardComponent } from "../../components/page-card/page-card.component";
import { GlobalService } from '../../services/global.service';
import { Modules } from '../../models/model';

@Component({
  selector: 'app-home',
  imports: [PageCardComponent],
  standalone: true,
  templateUrl: './modules.component.html',
})

export class ModulesComponent {

  constructor(private globalService: GlobalService) { }

  modules!: Modules[];

  ngOnInit() {
    this.globalService.getModules().subscribe({
      next: (res) => {
        this.modules = res.data;
        // console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
