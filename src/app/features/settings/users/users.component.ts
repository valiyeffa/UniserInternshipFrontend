import { Component, DestroyRef, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import Swal from 'sweetalert2';
import { GlobalService } from '../../../services/global.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { AddRolesTouserComponent } from './add-roles-touser/add-roles-touser.component';

@Component({
  selector: 'app-users',
  imports: [RouterLink],
  templateUrl: './users.component.html',
  styles: ``
})
export class UsersComponent {
  users: any[] = [];
  rowsPerPage = 6;
  currentPage = 1;

  private readonly destroyRef = inject(DestroyRef);
  readonly dialog = inject(MatDialog);

  constructor(private globalService: GlobalService) { }


 openDialog(id: number) {
     const dialogRef = this.dialog.open(AddRolesTouserComponent, {
       data: id
     });
     dialogRef.afterClosed().subscribe(result => {
       // console.log(`Dialog result: ${result}`);
     });
   }

  ngOnInit() {
    this.loadUsers();

    this.globalService.usersRefresh$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loadUsers();
      })
  }

  private loadUsers() {
    this.globalService.getUsers().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.users = res.data.reverse();
        this.currentPage = 1;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  deleteUser(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.globalService.deleteUser(id).subscribe({
          next: (res) => {
            // console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'User deleted!',
              timer: 1000,
              showConfirmButton: false
            })
          },
          error: (err) => {
            console.error(err);
          },
        });
      }
    });
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.users.length / this.rowsPerPage));
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    return this.users.slice(start, start + this.rowsPerPage);
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
