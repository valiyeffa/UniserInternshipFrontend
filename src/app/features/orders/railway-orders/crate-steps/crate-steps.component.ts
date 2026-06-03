import { Component } from '@angular/core';
import { CreateformComponent } from "./createform/createform.component";
import { CommonModule, NgClass } from '@angular/common';
import { CreateStep1Component } from "./create-step2/create-step2.component";

@Component({
  selector: 'app-crate-steps',
  imports: [CreateformComponent, CommonModule, CreateStep1Component],
  templateUrl: './crate-steps.component.html',
  styles: ``
})
export class CrateStepsComponent {
  step: number = 1;

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  firstForm: any;
  scndForm: any;

  submit() {
    const payload = {
      ...this.firstForm,
      ...this.scndForm
    }
    console.log(this.firstForm);

    console.log(payload);
  }
}
