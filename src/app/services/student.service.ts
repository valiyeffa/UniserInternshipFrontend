import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }

  getLessonShedule() {
    return {
      "schedule": [
        {
          "day": "Monday",
          "lessons": [
            { "lessonId": 1, "subject": "Mathematics", "teacher": "Aygun Mammadova", "room": "301", "startTime": "09:00", "endTime": "09:45" },
            { "lessonId": 2, "subject": "Physics", "teacher": "Rauf Aliyev", "room": "205", "startTime": "10:00", "endTime": "10:45" },
            { "lessonId": 3, "subject": "English", "teacher": "Leyla Hasanli", "room": "110", "startTime": "11:00", "endTime": "11:45" },
            { "lessonId": 4, "subject": "Programming", "teacher": "Nigar Safarova", "room": "Lab2", "startTime": "12:00", "endTime": "12:45" },
            { "lessonId": 5, "subject": "Physical Education", "teacher": "Orxan Rustamov", "room": "Gym", "startTime": "13:00", "endTime": "13:45" }
          ]
        },
        {
          "day": "Tuesday",
          "lessons": [
            { "lessonId": 6, "subject": "History", "teacher": "Kamran Karimov", "room": "212", "startTime": "09:00", "endTime": "09:45" },
            { "lessonId": 7, "subject": "Chemistry", "teacher": "Sevda Abbasova", "room": "Lab1", "startTime": "10:00", "endTime": "10:45" },
            { "lessonId": 8, "subject": "Mathematics", "teacher": "Aygun Mammadova", "room": "301", "startTime": "11:00", "endTime": "11:45" },
            { "lessonId": 9, "subject": "Programming", "teacher": "Nigar Safarova", "room": "Lab2", "startTime": "12:00", "endTime": "12:45" }
          ]
        },
        {
          "day": "Wednesday",
          "lessons": [
            { "lessonId": 10, "subject": "Physics", "teacher": "Rauf Aliyev", "room": "205", "startTime": "09:00", "endTime": "09:45" },
            { "lessonId": 11, "subject": "English", "teacher": "Leyla Hasanli", "room": "110", "startTime": "10:00", "endTime": "10:45" },
            { "lessonId": 12, "subject": "UI/UX Design", "teacher": "Aysel Quliyeva", "room": "Design1", "startTime": "11:00", "endTime": "11:45" },
            { "lessonId": 13, "subject": "Mathematics", "teacher": "Aygun Mammadova", "room": "301", "startTime": "12:00", "endTime": "12:45" }
          ]
        },
        {
          "day": "Thursday",
          "lessons": [
            { "lessonId": 14, "subject": "Programming", "teacher": "Nigar Safarova", "room": "Lab2", "startTime": "09:00", "endTime": "09:45" },
            { "lessonId": 15, "subject": "History", "teacher": "Kamran Karimov", "room": "212", "startTime": "10:00", "endTime": "10:45" },
            { "lessonId": 16, "subject": "Chemistry", "teacher": "Sevda Abbasova", "room": "Lab1", "startTime": "11:00", "endTime": "11:45" },
            { "lessonId": 17, "subject": "Physical Education", "teacher": "Orxan Rustamov", "room": "Gym", "startTime": "12:00", "endTime": "12:45" }
          ]
        },
        {
          "day": "Friday",
          "lessons": [
            { "lessonId": 18, "subject": "Mathematics", "teacher": "Aygun Mammadova", "room": "301", "startTime": "09:00", "endTime": "09:45" },
            { "lessonId": 19, "subject": "Physics", "teacher": "Rauf Aliyev", "room": "205", "startTime": "10:00", "endTime": "10:45" },
            { "lessonId": 20, "subject": "English", "teacher": "Leyla Hasanli", "room": "110", "startTime": "11:00", "endTime": "11:45" },
            { "lessonId": 21, "subject": "UI/UX Design", "teacher": "Aysel Quliyeva", "room": "Design1", "startTime": "12:00", "endTime": "12:45" }
          ]
        }
      ]
    }
  }

  getGrades() {
    return {
      "grades": [
        {
          "subject": "Mathematics",
          "assessments": [
            { "type": "Quiz", "date": "2026-02-01", "score": 88 },
            { "type": "Homework", "date": "2026-02-05", "score": 92 },
            { "type": "Midterm", "date": "2026-02-15", "score": 81 },
            { "type": "Final", "date": "2026-02-25", "score": 86 }
          ],
          "average": 86.75
        },
        {
          "subject": "Physics",
          "assessments": [
            { "type": "Lab", "date": "2026-02-03", "score": 90 },
            { "type": "Quiz", "date": "2026-02-10", "score": 85 },
            { "type": "Exam", "date": "2026-02-20", "score": 89 }
          ],
          "average": 88
        },
        {
          "subject": "Programming",
          "assessments": [
            { "type": "Project", "date": "2026-02-07", "score": 95 },
            { "type": "Code Test", "date": "2026-02-14", "score": 91 },
            { "type": "Final Project", "date": "2026-02-26", "score": 97 }
          ],
          "average": 94.3
        },
        {
          "subject": "English",
          "assessments": [
            { "type": "Speaking", "date": "2026-02-02", "score": 84 },
            { "type": "Writing", "date": "2026-02-12", "score": 80 },
            { "type": "Exam", "date": "2026-02-22", "score": 87 }
          ],
          "average": 83.7
        },
        {
          "subject": "Chemistry",
          "assessments": [
            { "type": "Lab", "date": "2026-02-06", "score": 78 },
            { "type": "Quiz", "date": "2026-02-13", "score": 82 }
          ],
          "average": 80
        },
        {
          "subject": "History",
          "assessments": [
            { "type": "Presentation", "date": "2026-02-09", "score": 91 },
            { "type": "Exam", "date": "2026-02-21", "score": 88 }
          ],
          "average": 89.5
        }
      ]
    }
  }

  getElectronJournal() {
    return {
      "journal": [
        { "date": "2026-02-17", "subject": "Mathematics", "attendance": "Present", "topic": "Derivatives", "homework": "Exercises 1-15", "note": "Good work" },
        { "date": "2026-02-17", "subject": "Physics", "attendance": "Late", "topic": "Momentum", "homework": "Read chapter 4", "note": "Late 5 min" },
        { "date": "2026-02-18", "subject": "Programming", "attendance": "Present", "topic": "Angular Services", "homework": "Create service", "note": "" },
        { "date": "2026-02-18", "subject": "English", "attendance": "Absent", "topic": "Listening", "homework": "Watch video", "note": "Medical leave" },
        { "date": "2026-02-19", "subject": "Chemistry", "attendance": "Present", "topic": "Organic intro", "homework": "Exercises page 22", "note": "" },
        { "date": "2026-02-19", "subject": "History", "attendance": "Present", "topic": "WW2", "homework": "Essay", "note": "" },
        { "date": "2026-02-20", "subject": "UI/UX Design", "attendance": "Present", "topic": "Color theory", "homework": "Palette create", "note": "Creative" },
        { "date": "2026-02-20", "subject": "Mathematics", "attendance": "Present", "topic": "Integrals", "homework": "Exercises 5-10", "note": "" }
      ]
    }
  }
}
