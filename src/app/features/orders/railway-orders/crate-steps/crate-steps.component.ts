import { Component, ViewChild } from '@angular/core';
import { CreateformComponent } from "./createform/createform.component";
import { CommonModule } from '@angular/common';
import { CreateStep2Component } from "./create-step2/create-step2.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crate-steps',
  imports: [CreateformComponent, CommonModule, CreateStep2Component],
  templateUrl: './crate-steps.component.html',
  styles: ``
})
export class CrateStepsComponent {
  @ViewChild(CreateformComponent)
  step1Component!: CreateformComponent;

  @ViewChild(CreateStep2Component)
  step2Component!: CreateStep2Component;

  step: number = 1;
  firstForm: any;
  tariffOptions: any[] = [];

  nextStep() {
    this.firstForm = this.step1Component.preparePayload();
    this.tariffOptions = this.step1Component?.tariffOptions ?? [];

    this.step++;
  }

  prevStep() {
    this.step--;
  }

  submit() {
    const wagonData = this.step2Component.customOrders;

    const payload = {
      ...this.firstForm,
      orderWagons: wagonData
    };

    console.log(payload);

    // this.globalService.addUser(formData).subscribe({
    //   next: (res) => {
    //   // console.log(res);
    //     if (res.status == false) {
    // Swal.fire({
    //         title: "Error",
    //         text: res.message,
    //         icon: "error"
    //       });
    //     } else {
    //       Swal.fire({
    //         title: "Success",
    //         text: "User successfuly added!",
    //         icon: "success",
    //       }).then(() => {
    //         this.router.navigate(['/modules/settings/users'])
    //       });
    //     }
    //   },
    //   error: (err) => {
    //     Swal.fire({
    //       title: "Error",
    //       text: "Something went wrong!",
    //       icon: "error"
    //     });
    //     console.error(err);
    //   }
    // })
  }
}
