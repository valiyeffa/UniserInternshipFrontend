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
  users!: any[];

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

    // Subscribe to user changes to refresh the list automatically
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

}
