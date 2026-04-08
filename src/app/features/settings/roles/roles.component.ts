import { Component, DestroyRef, inject } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { RolesFormComponent } from './roles-form/roles-form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private readonly destroyRef = inject(DestroyRef);

  openDialog() {
    const dialogRef = this.dialog.open(RolesFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  openEditDialog(data: any) {
    const dialogRef = this.dialog.open(RolesFormComponent, {
      data: data
    });
    console.log(data);
    this.selectedRole = data;
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  constructor(
    private globalService: GlobalService
  ) { }

  ngOnInit() {
    this.loadRoles();

    this.globalService.rolesRefresh$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
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
