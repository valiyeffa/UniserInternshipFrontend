import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { StudentListComponent } from '../student-list/student-list.component';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-students-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, RouterLink, StudentListComponent],
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.css'
})
export class StudentsPageComponent implements OnInit {
  students: any[] = [];
  searchText: string = '';
  showForm: boolean = false;
  editingStudent: any = null;

  // Reactive Form
  studentForm: FormGroup;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18)]],
      course: ['', Validators.required],
      status: ['aktiv', Validators.required],
      subjects: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    });
  }

  ngOnInit() {
    this.students = this.studentService.getStudents();
  }

  // FormArray-ə getter
  get subjects(): FormArray {
    return this.studentForm.get('subjects') as FormArray;
  }

  // Yeni subject sahəsi əlavə et
  addSubject() {
    this.subjects.push(this.fb.control('', Validators.required));
  }

  // Subject sahəsini sil
  removeSubject(index: number) {
    if (this.subjects.length > 1) {
      this.subjects.removeAt(index);
    }
  }

  get activeCount() {
    return this.students.filter(s => s.status === 'aktiv').length;
  }

  get inactiveCount() {
    return this.students.filter(s => s.status === 'qeyri-aktiv').length;
  }

  get filteredStudents() {
    return this.students.filter(s =>
      s.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.editingStudent = null;
  }

  onSubmit() {
    // Form invalid olarsa bütün sahələri touched et
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();  
      return;
    }

    // Service-ə göndər
    this.studentService.addStudent({
      name: this.studentForm.value.name,
      email: this.studentForm.value.email,
      age: this.studentForm.value.age,
      course: this.studentForm.value.course,
      status: this.studentForm.value.status,
      subjects: this.studentForm.value.subjects,
      enrollmentDate: '01.09.2024'
    });

    this.students = this.studentService.getStudents();

    // Submit uğurlu olduqda formu sıfırla
    this.studentForm.reset({ status: 'aktiv' });
    while (this.subjects.length > 1) {
      this.subjects.removeAt(1);
    }
    this.showForm = false;
  }

  editStudent(student: any) {
    this.editingStudent = { ...student };
    this.showForm = false;
  }

  saveEdit() {
    this.studentService.updateStudent(this.editingStudent);
    this.students = this.studentService.getStudents();
    this.editingStudent = null;
  }

  cancelEdit() {
    this.editingStudent = null;
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id);
    this.students = this.studentService.getStudents();
  }

  // Xəta mesajı göstərmək üçün köməkçi metod
  getError(controlName: string): string {
    const control = this.studentForm.get(controlName);
    if (!control || !control.errors || !control.touched) return '';
    if (control.errors['required']) return 'Bu sahə məcburidir!';
    if (control.errors['minlength']) return `Minimum ${control.errors['minlength'].requiredLength} hərf olmalıdır!`;
    if (control.errors['email']) return 'Düzgün email formatı daxil edin!';
    if (control.errors['min']) return `Yaş minimum ${control.errors['min'].min} olmalıdır!`;
    return '';
  }
}