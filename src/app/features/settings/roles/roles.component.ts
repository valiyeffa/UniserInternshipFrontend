import { Component, DestroyRef, inject } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { RolesFormComponent } from './roles-form/roles-form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RoleMenusComponent } from './role-menus/role-menus.component';

@Component({
  selector: 'app-roles',
  imports: [],
  templateUrl: './roles.component.html',
  styles: ``
})
export class RolesComponent {
  roles: any[] = [];
  selectedRole !: any[];
  rowsPerPage = 6;
  currentPage = 1;

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

  openMenuDialog(id: any) {
    const dialogRef = this.dialog.open(RoleMenusComponent, {
      data: id
    });
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
        this.currentPage = 1;
        // console.log(this.roles);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.roles.length / this.rowsPerPage));
  }

  get paginatedRoles() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    return this.roles.slice(start, start + this.rowsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
