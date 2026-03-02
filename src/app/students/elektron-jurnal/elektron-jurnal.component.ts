import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-elektron-jurnal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './elektron-jurnal.component.html',
  styleUrl: './elektron-jurnal.component.css'
})
export class ElektronJurnalComponent {
  journal = [
    { date: '01.03.2025', subject: 'Angular', present: true, note: '-' },
    { date: '01.03.2025', subject: 'TypeScript', present: false, note: 'Xəstə idi' },
    { date: '03.03.2025', subject: 'HTML/CSS', present: true, note: '-' },
    { date: '03.03.2025', subject: 'JavaScript', present: true, note: '-' },
    { date: '05.03.2025', subject: 'Git', present: false, note: 'Gəlmədi' },
    { date: '08.03.2025', subject: 'Angular', present: true, note: '-' },
    { date: '10.03.2025', subject: 'TypeScript', present: true, note: '-' },
  ];
}