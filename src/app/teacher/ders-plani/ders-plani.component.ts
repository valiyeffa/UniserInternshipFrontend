import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ders-plani',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ders-plani.component.html',
  styleUrl: './ders-plani.component.css'
})
export class DersPlaniComponent {
  schedule = [
    {
      day: 'Bazar ertəsi',
      lessons: [
        { time: '09:00-10:30', subject: 'Angular', group: 'FE-01', room: '101' },
        { time: '11:00-12:30', subject: 'TypeScript', group: 'FE-02', room: '102' },
      ]
    },
    {
      day: 'Çərşənbə',
      lessons: [
        { time: '09:00-10:30', subject: 'JavaScript', group: 'FE-01', room: '103' },
        { time: '11:00-12:30', subject: 'Angular', group: 'FE-03', room: '101' },
        { time: '14:00-15:30', subject: 'HTML/CSS', group: 'FE-02', room: '104' },
      ]
    },
    {
      day: 'Cümə',
      lessons: [
        { time: '09:00-10:30', subject: 'TypeScript', group: 'FE-03', room: '102' },
        { time: '11:00-12:30', subject: 'Git & GitHub', group: 'FE-01', room: '101' },
      ]
    },
  ];

  lessonPlans = [
    { subject: 'Angular', group: 'FE-01', weeklyHours: 3, totalHours: 54, completion: 65, status: 'active' },
    { subject: 'TypeScript', group: 'FE-02', weeklyHours: 3, totalHours: 54, completion: 40, status: 'active' },
    { subject: 'JavaScript', group: 'FE-01', weeklyHours: 3, totalHours: 54, completion: 100, status: 'done' },
    { subject: 'HTML/CSS', group: 'FE-02', weeklyHours: 3, totalHours: 54, completion: 80, status: 'active' },
    { subject: 'Git & GitHub', group: 'FE-03', weeklyHours: 2, totalHours: 36, completion: 0, status: 'planned' },
  ];
}