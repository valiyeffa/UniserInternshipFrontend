import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortNamePipe } from '../../shared/short-name.pipe';

@Component({
  selector: '[app-student-item]',
  imports: [CommonModule, ShortNamePipe],
  templateUrl: './student-item.component.html',
  styleUrl: './student-item.component.css',
})
export class StudentItemComponent implements OnInit, OnChanges, OnDestroy {
  @Input() student: any;
  //  Parent-dən (StudentList) bir student obyekti alır
  // item componentinin parenti list componentidi 

  @Output() deleteStudent = new EventEmitter<number>();
  //  Delete basılanda parent-ə student-in id-sini göndərir
  // bu studentlisde gonderir id ni studentlistde studentpageye gonderir

  @Output() editStudent = new EventEmitter<any>();

  onDelete() {
    this.deleteStudent.emit(this.student.id);
       //  Bu funksiyanı Delete düyməsi çağıracaq
  }
   

  onEdit() {
    this.editStudent.emit(this.student);
    // bu funksiya isə edit butonu islesin deye parente gonderecek
  }

  constructor() {
    console.log('StudentItem - constructor işlədi');
    // komponent yaradilan zaman consructor isleyir
  }

  ngOnInit() {
    console.log('StudentItem - ngOnInit işlədi:', this.student?.name);
    // ekrana render olunanda isleyir
    // eger student varsa name gosderir
    // student undefined olarsa eror vermir
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('StudentItem - ngOnChanges işlədi', changes);
    // @Input deyisende isleyir
  }

  ngOnDestroy() {
    console.log('StudentItem - ngOnDestroy işlədi');
    // silinme zamani isleyir
  }

  
}
