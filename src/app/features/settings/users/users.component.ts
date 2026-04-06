import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import Swal from 'sweetalert2';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-users',
  imports: [RouterLink],
  templateUrl: './users.component.html',
  styles: ``
})
export class UsersComponent {
  users!: any[];

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.globalService.getUsers().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.users = res.data.reverse();
      },
      error: (err) => {
        console.error(err);
      }
    })

    this.globalService.getUsers().subscribe();
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
