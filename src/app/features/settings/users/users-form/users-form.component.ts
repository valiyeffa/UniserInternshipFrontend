import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NgClass } from '@angular/common';
import Swal from 'sweetalert2';
import { GlobalService } from '../../../../services/global.service';

@Component({
  selector: 'app-users-form',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './users-form.component.html',
  styles: ``
})
export class UsersFormComponent {
  id!: number;

  constructor(
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  userForm = new FormGroup({
    gender: new FormControl(''),
    status: new FormControl(true),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    finCode: new FormControl('', [Validators.minLength(7)]),
    email: new FormControl('', [Validators.email]),
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    phone1: new FormControl('', [Validators.minLength(10)]),
    phone2: new FormControl('', [Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.globalService.getUserById(this.id).subscribe({
        next: (res) => {
          this.userForm.patchValue(res.data);

          this.userForm.get('password')?.clearValidators();
          this.userForm.get('password')?.updateValueAndValidity();
        },
        error(err) {
          console.error(err);
        },
      });
    }
  }

  addUserFunc() {
    const formData = this.userForm.value;

    if (this.id) {
      const updatedData = {
        ...formData,
        id: this.id
      }

      this.globalService.editUser(updatedData).subscribe({
        next: (res) => {
          // console.log(res);
          if (res.status == false) {
            Swal.fire({
              title: "Error",
              text: res.message,
              icon: "error"
            });
          } else {
            Swal.fire({
              title: "Success",
              text: "User successfuly updated!",
              icon: "success",
            }).then(() => {
              this.router.navigate(['/modules/settings/users'])
            });
          }
        },
        error: (err) => {
          Swal.fire({
            title: "Error",
            text: "Something went wrong!",
            icon: "error"
          });
          console.error(err);
        }
      })
    } else {
      this.globalService.addUser(formData).subscribe({
        next: (res) => {
          // console.log(res);
          if (res.status == false) {
            Swal.fire({
              title: "Error",
              text: res.message,
              icon: "error"
            });
          } else {
            Swal.fire({
              title: "Success",
              text: "User successfuly added!",
              icon: "success",
            }).then(() => {
              this.router.navigate(['/modules/settings/users'])
            });
          }
        },
        error: (err) => {
          Swal.fire({
            title: "Error",
            text: "Something went wrong!",
            icon: "error"
          });
          console.error(err);
        }
      })
    }

  }
}
