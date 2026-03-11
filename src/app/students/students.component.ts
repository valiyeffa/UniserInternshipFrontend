import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentListComponent } from '../student-list/student-list.component';
import { Student } from './student.interface';
import { DatePipe, NgIf, NgClass } from '@angular/common';
import { fullNameConverter } from './fullnameConverter.pipe';
import { StudentDataService } from '../student-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  imports: [StudentListComponent, ReactiveFormsModule, FormsModule, NgClass, DatePipe, fullNameConverter, NgIf],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit, OnDestroy {
  private studentDataService = inject(StudentDataService);
  students: Student[] = [];
  filterName = '';
  tarix: string = Date();
  myName: string = 'Mike Wheeler';

  studentForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname:new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl<number | null>(null, [Validators.required, Validators.min(18)]),
    subjects: new FormArray([])
  });

  get subjectsArray(): FormArray {
    return this.studentForm.get('subjects') as FormArray;
  }

  get filteredStudents(): Student[] {
    return this.students.filter(s =>
      s.name.toLowerCase().includes(this.filterName.toLowerCase())
    );
  }

  addSubject(): void {
    this.subjectsArray.push(new FormControl('', Validators.required));
  }

  removeSubject(index: number): void {
    this.subjectsArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched(); 
      return;
    }

    const newStudent: Student = {
      id: this.students.length > 0 ? Math.max(...this.students.map(s => s.id)) + 1 : 1,
      name: this.studentForm.value.name!,
      surname: this.studentForm.value.surname!,
      email: this.studentForm.value.email!,
      age: this.studentForm.value.age!,
      subjects: this.studentForm.value.subjects as string[]
    };

    this.studentDataService.addStudent(newStudent);
    this.students = this.studentDataService.getStudent();
    this.studentForm.reset();
    this.subjectsArray.clear(); 
  }

  deleteStudent(id: number): void {
    this.studentDataService.deleteStudent(id);
    this.students = this.studentDataService.getStudent();
  }

  ngOnInit(): void {
    this.students = this.studentDataService.getStudent();
  }

  ngOnDestroy(): void {
    console.log('Students page component destroyed');
  }
}