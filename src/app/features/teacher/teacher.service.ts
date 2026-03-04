import { Injectable } from '@angular/core';
import { StudentList } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor() { }

  getLessonPlans() {
    return {
      "lessonPlans": [
        {
          "id": 1,
          "subject": "Mathematics",
          "class": "10A",
          "date": "2026-03-01",
          "topic": "Limits introduction",
          "objectives": [
            "Understand concept of limit",
            "Solve basic limit problems"
          ],
          "materials": [
            "Slides",
            "Whiteboard",
            "Workbook"
          ],
          "activities": [
            "Explanation",
            "Board exercises",
            "Student practice"
          ],
          "homework": "Exercises 1-10 page 12",
          "status": "Completed"
        },
        {
          "id": 2,
          "subject": "Programming",
          "class": "10A",
          "date": "2026-03-02",
          "topic": "Angular Components",
          "objectives": [
            "Understand component structure",
            "Create component"
          ],
          "materials": ["IDE", "Projector"],
          "activities": ["Lecture", "Coding", "Q&A"],
          "homework": "Create 2 components",
          "status": "Planned"
        },
        {
          "id": 3,
          "subject": "Physics",
          "class": "10B",
          "date": "2026-03-02",
          "topic": "Force and motion",
          "objectives": ["Newton laws understanding"],
          "materials": ["Slides", "Simulation"],
          "activities": ["Explanation", "Demo"],
          "homework": "Read chapter 5",
          "status": "Planned"
        }
      ]
    }
  }

  getStudentAssessments() {
    return {
      "grading": [
        {
          "id": 1,
          "studentId": 101,
          "studentName": "Aylin Mammadova",
          "class": "10A",
          "subject": "Mathematics",
          "assessments": [
            { "type": "Quiz", "date": "2026-03-01", "score": 85 },
            { "type": "Homework", "date": "2026-03-02", "score": 90 }
          ],
          "teacherNote": "Good performance"
        },
        {
          "id": 2,
          "studentId": 102,
          "studentName": "Murad Aliyev",
          "class": "10A",
          "subject": "Mathematics",
          "assessments": [
            { "type": "Quiz", "date": "2026-03-01", "score": 70 }
          ],
          "teacherNote": "Needs improvement"
        },
        {
          "id": 3,
          "studentId": 103,
          "studentName": "Nigar Huseynova",
          "class": "10A",
          "subject": "Programming",
          "assessments": [
            { "type": "Project", "date": "2026-03-02", "score": 95 }
          ],
          "teacherNote": ""
        }
      ]
    }
  }

  getAttendanceRecords() {
    return {
      "attendance": [
        {
          "lessonId": 1,
          "subject": "Mathematics",
          "class": "10A",
          "date": "2026-03-01",
          "records": [
            { "studentId": 101, "studentName": "Aylin Mammadova", "status": "Present" },
            { "studentId": 102, "studentName": "Murad Aliyev", "status": "Absent" },
            { "studentId": 103, "studentName": "Nigar Huseynova", "status": "Late" }
          ]
        },
        {
          "lessonId": 2,
          "subject": "Programming",
          "class": "10A",
          "date": "2026-03-02",
          "records": [
            { "studentId": 101, "studentName": "Aylin Mammadova", "status": "Present" },
            { "studentId": 102, "studentName": "Murad Aliyev", "status": "Present" },
            { "studentId": 103, "studentName": "Nigar Huseynova", "status": "Present" }
          ]
        }
      ]
    }
  }

  // !====================================STUDENTS LIST=====================================

  private students: StudentList[] = [
    {
      "id": 1,
      "name": "Aylin",
      "surname": "Mammadova",
      "email": "aylin.mammadova@gmail.com",
      "age": 20,
      "subjects": [
        "Mathematics",
        "Physics",
        "Programming",
        "English"
      ]
    },
    {
      "id": 2,
      "name": "Murad",
      "surname": "Aliyev",
      "email": "murad.aliyev@gmail.com",
      "age": 21,
      "subjects": [
        "Mathematics",
        "Chemistry",
        "History"
      ]
    },
    {
      "id": 3,
      "name": "Nigar",
      "surname": "Huseynova",
      "email": "nigar.huseynova@gmail.com",
      "age": 19,
      "subjects": [
        "Programming",
        "UI/UX Design",
        "English"
      ]
    },
    {
      "id": 4,
      "name": "Elvin",
      "surname": "Quliyev",
      "email": "elvin.quliyev@gmail.com",
      "age": 22,
      "subjects": [
        "Physics",
        "Chemistry",
        "Mathematics"
      ]
    },
    {
      "id": 5,
      "name": "Sevinc",
      "surname": "Karimova",
      "email": "sevinc.karimova@gmail.com",
      "age": 20,
      "subjects": [
        "English",
        "History",
        "Mathematics"
      ]
    },
    {
      "id": 6,
      "name": "Orxan",
      "surname": "Rustamov",
      "email": "orxan.rustamov@gmail.com",
      "age": 23,
      "subjects": [
        "Programming",
        "Physics"
      ]
    },
    {
      "id": 7,
      "name": "Aysel",
      "surname": "Abbasova",
      "email": "aysel.abbasova@gmail.com",
      "age": 19,
      "subjects": [
        "UI/UX Design",
        "English",
        "Programming"
      ]
    },
    {
      "id": 8,
      "name": "Kamran",
      "surname": "Hasanli",
      "email": "kamran.hasanli@gmail.com",
      "age": 21,
      "subjects": [
        "Mathematics",
        "History",
        "Chemistry"
      ]
    }
  ]

  private subjects = [
    { "id": "Mathematics", "name": "Mathematics" },
    { "id": "Physics", "name": "Physics" },
    { "id": "Chemistry", "name": "Chemistry" },
    { "id": "Biology", "name": "Biology" },
    { "id": "History", "name": "History" },
    { "id": "Geography", "name": "Geography" },
    { "id": "English", "name": "English" },
    { "id": "Programming", "name": "Programming" },
    { "id": "UI/UX Design", "name": "UI/UX Design" },
    { "id": "Physical Education", "name": "Physical Education" }
  ];

  getStudentsList() {
    return this.students;
  }

  getSubjects() {
    return this.subjects;
  }

  addStudent(student: any) {
    const newStudent = {
      id: this.getStudentsList.length + 1,
      ...student
    }

    this.students.push(newStudent);

    alert('Student successfully added!');
  }

  updateStudent(updatedStudent: any) {
    this.students = this.students.map(i =>
      i.id === updatedStudent.id
        ? updatedStudent
        : i
    );
  }

  deleteStudent(id: number) {
    this.students = this.students.filter(i => i.id !== id);
  }
}
