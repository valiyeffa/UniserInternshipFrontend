import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { NgClass } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-form',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './users-form.component.html',
  styles: ``
})
export class UsersFormComponent {
  selectedUser!: any[];
  id!: number;

  constructor(
    private globalService: GlobalService,
    private router: ActivatedRoute
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
    this.id = Number(this.router.snapshot.paramMap.get('id'));

    this.globalService.getUserById(this.id).subscribe({
      next: (res) => {
        this.selectedUser = res.data;
        console.log(this.selectedUser);
      },
      error(err) {
        console.error(err);
      },
    });
  }

  addUserFunc() {
    const formData = this.userForm.value;

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
            this.userForm.reset();
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
