import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { GlobalService, User, Role } from '../../../core/services/global.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  errorMessage = '';
  showModal = false;
  showRolesModal = false;
  isEditing = false;
  selectedUser: User | null = null;

  // Rol adlarını göstərmək üçün GetAllRoles + GetUserRolesByUserId birləşdirilir
  userRoles: Role[] = [];
  rolesLoading = false;

  userForm: FormGroup;
  showOperationsMenu = false;

  currentPage = 1;
  pageSize = 15;
  Math = Math;

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

  @HostListener('document:click')
  onDocumentClick() {
    this.showOperationsMenu = false;
  }

  toggleOperationsMenu(event: Event) {
    event.stopPropagation();
    this.showOperationsMenu = !this.showOperationsMenu;
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.pageSize) || 1;
  }

  get pagedUsers(): User[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.users.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  onPageSizeChange() {
    this.currentPage = 1;
  }

  selectUser(user: User) {
    this.selectedUser = this.selectedUser?.id === user.id ? null : user;
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
    this.showOperationsMenu = false;
    this.isEditing = false;
    this.selectedUser = null;
    this.errorMessage = '';
    this.userForm.reset({ gender: true, status: true });
    this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.userForm.get('password')?.updateValueAndValidity();
    this.showModal = true;
  }

  openEditModalFromSelection() {
    this.showOperationsMenu = false;
    if (!this.selectedUser) return;
    this.openEditModal(this.selectedUser);
  }

  openRolesModalFromSelection() {
    this.showOperationsMenu = false;
    if (!this.selectedUser) return;
    this.openRolesModal(this.selectedUser);
  }

  openEditModal(user: User) {
    this.isEditing = true;
    this.selectedUser = user;
    this.errorMessage = '';
    this.showModal = true;
    this.globalService.getUserById(user.id).subscribe({
      next: (userData) => {
        this.userForm.patchValue({
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.username,
          email: userData.email,
          finCode: userData.finCode,
          gender: userData.gender,
          phone1: userData.phone1,
          phone2: userData.phone2,
          status: userData.status,
          password: ''
        });
        this.userForm.get('password')?.clearValidators();
        this.userForm.get('password')?.updateValueAndValidity();
      },
      error: () => {
        this.errorMessage = 'İstifadəçi məlumatları yüklənərkən xəta baş verdi!';
      }
    });
  }

  openRolesModal(user: User) {
    this.selectedUser = user;
    this.userRoles = [];
    this.errorMessage = '';
    this.rolesLoading = true;
    this.showRolesModal = true;
    this.loadUserRoles(user.id);
  }

  closeRolesModal() {
    this.showRolesModal = false;
    this.userRoles = [];
    this.rolesLoading = false;
    this.errorMessage = '';
  }

  loadUserRoles(userId: number) {
    // GetAllRoles — tam ad siyahısı ilə gəlir (value field dolu)
    // GetUserRolesByUserId — bu istifadəçiyə aid assignStatus-lar ilə gəlir
    // İkisini birlikdə çağırıb birləşdiririk
    forkJoin({
      allRoles: this.globalService.getAllRoles(),
      userRoles: this.globalService.getUserRolesById(userId)
    }).subscribe({
      next: ({ allRoles, userRoles }) => {
        // User rollarının id-lərini götür
        const assignedIds = new Set(
          userRoles.filter(r => !!r.assignStatus).map(r => r.id)
        );

        // Bütün rolları göstər, user-ə aid olanları active et
        this.userRoles = (allRoles || []).map(role => ({
          ...role,
          assignStatus: assignedIds.has(role.id)
        }));

        this.rolesLoading = false;
      },
      error: () => {
        this.errorMessage = 'Rollar yüklənərkən xəta baş verdi!';
        this.rolesLoading = false;
      }
    });
  }

  toggleRole(role: Role) {
    role.assignStatus = !role.assignStatus;
  }

  saveUserRoles() {
    if (!this.selectedUser) return;
    const selectedRoleIds = this.userRoles
  .filter(r => r.assignStatus)
  .map(r => r.id);
    this.globalService.addRolesToUser({
      userId: this.selectedUser.id,
      roleIds: selectedRoleIds
    }).subscribe({
      next: () => { this.closeRolesModal(); },
      error: () => { this.errorMessage = 'Rollar təyin edilərkən xəta baş verdi!'; }
    });
  }

  closeModal() {
    this.showModal = false;
    this.userForm.reset();
    this.errorMessage = '';
  }

  resetPassword() {
    this.showOperationsMenu = false;
    if (!this.selectedUser) return;
    alert(`${this.selectedUser.firstName} ${this.selectedUser.lastName} üçün şifrə sıfırlanacaq`);
  }

  deleteSelectedUser() {
    this.showOperationsMenu = false;
    if (!this.selectedUser) return;
    this.deleteUser(this.selectedUser.id);
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    if (this.isEditing && this.selectedUser) {
      this.globalService.updateUser({
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
      }).subscribe({
        next: () => { this.closeModal(); this.loadUsers(); },
        error: () => { this.errorMessage = 'Yenilənərkən xəta baş verdi!'; }
      });
    } else {
      this.globalService.addUser({
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
      }).subscribe({
        next: () => { this.closeModal(); this.loadUsers(); },
        error: () => { this.errorMessage = 'Əlavə edilərkən xəta baş verdi!'; }
      });
    }
  }

  deleteUser(id: number) {
    if (!confirm('Bu istifadəçini silmək istədiyinizə əminsiniz?')) return;
    this.globalService.deleteUser(id).subscribe({
      next: (res) => {
        if (res.status === true) {
          if (this.selectedUser?.id === id) this.selectedUser = null;
          this.loadUsers();
        } else {
          this.errorMessage = 'Silinərkən xəta baş verdi!';
        }
      },
      error: () => { this.loadUsers(); }
    });
  }

  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get username() { return this.userForm.get('username'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }
}