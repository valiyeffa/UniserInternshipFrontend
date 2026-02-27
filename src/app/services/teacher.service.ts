import { Injectable } from '@angular/core';

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
}
