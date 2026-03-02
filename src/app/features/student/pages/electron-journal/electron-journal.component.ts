import { Component } from '@angular/core';
import { StudentService } from '../../student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-electron-journal',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './electron-journal.component.html',
})
export class ElectronJournalComponent {
  electronJournal: any = [];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.electronJournal = this.studentService.getElectronJournal().journal;
  }
}
