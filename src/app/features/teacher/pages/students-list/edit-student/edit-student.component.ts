import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { TeacherService } from '../../../teacher.service';

@Component({
  selector: 'app-edit-student',
  imports: [RouterLink, MatInputModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './edit-student.component.html',
})
export class EditStudentComponent {
  subjectList: any[] = [];
  isLoading: boolean = false;

  constructor(private teacherService: TeacherService) { }

  addStudentForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required, Validators.min(18)]),
    subjects: new FormControl([], Validators.required)
  })

  ngOnInit() {
    this.subjectList = this.teacherService.getSubjects();
  }

  addStudentFunc() {
    const formData = this.addStudentForm.value;

    this.isLoading = true;

    this.teacherService.addStudent(formData);

    this.addStudentForm.reset();
    this.isLoading = false;
  }

}
