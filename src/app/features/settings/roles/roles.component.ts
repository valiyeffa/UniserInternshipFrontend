import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-roles',
  imports: [RouterLink],
  templateUrl: './roles.component.html',
  styles: ``
})
export class RolesComponent {
  roles !: any[];

  constructor(
    private globalService: GlobalService
  ) { }

  ngOnInit() {
    this.globalService.getRoles().subscribe({
      next: (res) => {
        this.roles = res.data;
        // console.log(this.roles);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
