import { Component, ViewChild } from '@angular/core';
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
  @ViewChild(CreateformComponent)
  step1Component!: CreateformComponent;

  @ViewChild(CreateStep1Component)
  step2Component!: CreateStep1Component;
  step: number = 1;

  nextStep() {
    this.firstForm = this.step1Component.preparePayload();

    this.step++;
  }

  prevStep() {
    this.step--;
  }

  firstForm: any;
  scndForm: any;

  submit() {
    const wagonData = this.step2Component.orderWagons.getRawValue();

    const payload = {
      ...this.firstForm,
      orderWagons: [wagonData]
    };

    console.log(payload);
  }
}
