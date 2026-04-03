import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService, User } from '../../../core/services/global.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  errorMessage = '';
  showModal = false;
  isEditing = false;
  selectedUser: User | null = null;
  userForm: FormGroup;

  constructor(private globalService: GlobalService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      finCode: [''],
      gender: [true],
      phone1: [''],
      phone2: [''],
      status: [true]
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.errorMessage = '';
    this.globalService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users || [];
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'İstifadəçilər yüklənərkən xəta baş verdi!';
        this.isLoading = false;
      }
    });
  }

  openAddModal() {
    this.isEditing = false;
    this.selectedUser = null;
    this.userForm.reset({ gender: true, status: true });
    this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.userForm.get('password')?.updateValueAndValidity();
    this.showModal = true;
  }

  openEditModal(user: User) {
    this.isEditing = true;
    this.selectedUser = user;
    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      finCode: user.finCode,
      gender: user.gender,
      phone1: user.phone1,
      phone2: user.phone2,
      status: user.status,
      password: ''
    });
    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password')?.updateValueAndValidity();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.userForm.reset();
    this.errorMessage = '';
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    if (this.isEditing && this.selectedUser) {
      const updateData = {
        id: this.selectedUser.id,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        username: this.userForm.value.username,
        email: this.userForm.value.email,
        finCode: this.userForm.value.finCode || '',
        gender: this.userForm.value.gender,
        phone1: this.userForm.value.phone1 || '',
        phone2: this.userForm.value.phone2 || '',
        status: this.userForm.value.status
      };
      this.globalService.updateUser(updateData).subscribe({
        next: () => {
          this.closeModal();
          this.loadUsers();
        },
        error: () => {
          this.errorMessage = 'Yenilənərkən xəta baş verdi!';
        }
      });
    } else {
      const addData = {
        id: 0,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        username: this.userForm.value.username,
        password: this.userForm.value.password,
        email: this.userForm.value.email,
        finCode: this.userForm.value.finCode || '',
        gender: this.userForm.value.gender,
        phone1: this.userForm.value.phone1 || '',
        phone2: this.userForm.value.phone2 || ''
      };
      this.globalService.addUser(addData).subscribe({
        next: () => {
          this.closeModal();
          this.loadUsers();
        },
        error: () => {
          this.errorMessage = 'Əlavə edilərkən xəta baş verdi!';
        }
      });
    }
  }
deleteUser(id: number) {
  if (!confirm('Bu istifadəçini silmək istədiyinizə əminsiniz?')) return;
  this.globalService.deleteUser(id).subscribe({
    next: (res) => {
      if (res.status === true) {
        this.loadUsers();
      } else {
        this.errorMessage = 'Silinərkən xəta baş verdi!';
      }
    },
    error: () => {
      this.loadUsers();
    }
  });
}

  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get username() { return this.userForm.get('username'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }
}