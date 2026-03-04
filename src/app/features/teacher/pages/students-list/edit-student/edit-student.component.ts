import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TeacherService } from '../../../teacher.service';
import { StudentList } from '../../../../../models/model';

@Component({
  selector: 'app-edit-student',
  imports: [RouterLink, MatInputModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './edit-student.component.html',
})
export class EditStudentComponent {
  subjectList: any[] = [];
  isLoading: boolean = false;
  selectedStudent: StudentList | undefined;

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  studentForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required, Validators.min(18)]),
    subjects: new FormControl([], Validators.required)
  })

  ngOnInit() {
    this.subjectList = this.teacherService.getSubjects();
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.selectedStudent = this.teacherService.getStudentsList().find(i => i.id === id);

    if (this.selectedStudent) {
      this.studentForm.setValue({
        name: this.selectedStudent.name,
        surname: this.selectedStudent.surname,
        email: this.selectedStudent.email,
        age: this.selectedStudent.age,
        subjects: this.selectedStudent.subjects
      });
    }
  }

  updateStudentFunc() {
    const updatedStudent = {
      id: Number(this.route.snapshot.paramMap.get('id')),
      ...this.studentForm.value
    };

    this.teacherService.updateStudent(updatedStudent);

    const result = confirm("Student updated successfully. Go back to list?");

    if (result) {
      this.router.navigate(['/teacher-module/students-list']);
    }
  }

}
