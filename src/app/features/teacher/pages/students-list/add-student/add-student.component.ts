import { Component } from '@angular/core';
import { TeacherService } from '../../../teacher.service';
import { RouterLink } from "@angular/router";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  imports: [RouterLink, MatInputModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './add-student.component.html',
})

export class AddStudentComponent {
  isLoading: boolean = false;

  constructor(private teacherService: TeacherService) { }

  addStudentForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required, Validators.min(18)]),
    subjects: new FormArray([
      new FormControl('', Validators.required)
    ])
  })

   get subjects(){
    return this.addStudentForm.get('subjects') as FormArray;
  }

  addSubject(){
    this.subjects.push(new FormControl('', Validators.required));
  }

  removeSubject(index:number){
    this.subjects.removeAt(index);
  }


  addStudentFunc() {
    const formData = this.addStudentForm.value;

    this.isLoading = true;

    this.teacherService.addStudent(formData);
    this.addStudentForm.reset();
    this.addStudentForm.markAsUntouched();
    this.isLoading = false;
  }

}
