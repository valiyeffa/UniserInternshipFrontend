import { Component, inject } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { RolesFormComponent } from './roles-form/roles-form.component';

@Component({
  selector: 'app-roles',
  imports: [],
  templateUrl: './roles.component.html',
  styles: ``
})
export class RolesComponent {
  roles !: any[];
  selectedRole !: any[];

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(RolesFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  constructor(
    private globalService: GlobalService
  ) { }

  ngOnInit() {
    this.loadRoles();

    this.globalService.rolesRefresh$.subscribe(() => {
      this.loadRoles();
    });
  }

  private loadRoles() {
    this.globalService.getRoles().subscribe({
      next: (res) => {
        this.roles = res.data;
        // console.log(this.roles);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
