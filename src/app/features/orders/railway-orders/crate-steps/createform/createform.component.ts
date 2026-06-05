import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { OrdersService } from '../../../orders.service';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, Observable, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CommonService } from '../../../../../services/common.service';
import { ContractsService } from '../../../../contracts/contracts.service';

@Component({
  selector: 'app-createform',
  imports: [ReactiveFormsModule, RouterLink, NgClass, MatFormFieldModule, MatInputModule, MatAutocompleteModule, AsyncPipe, CommonModule],
  templateUrl: './createform.component.html',
  styles: [
    `
      input:disabled,
      select:disabled,
      textarea:disabled {
        background-color: #f8fafc;
        border-color: #cbd5e1;
        color: #64748b;
        cursor: not-allowed;
      }
    `
  ]
})

export class CreateformComponent {
  newOrderNumber: any;
  transportTypes: any[] = [];
  countries: any[] = [];
  companies: any[] = [];
  customOrders: any[] = [];

  addendumIdOpt: any[] = [];
  addendumDetailOption: any[] = [];

  selectedBorderEntryStationId: any;
  selectedBorderExitStationId: any;
  selectedCargoId: any;

  clientOptionsCache: any[] = [];
  stationOptionsCache: any[] = [];
  destStationOptionsCache: any[] = [];
  selectedCompany: any;

  selectedLoadStation: any;
  selectedDestinationStation: any;

  myControl = new FormControl('');
  clientOptions$!: Observable<any[]>;
  stationOptions$!: Observable<any[]>;
  dastStationOptions$!: Observable<any[]>;

  tariffOptions: any[] = [];

  @Input() selectedOrder!: any;

  constructor(
    private commonService: CommonService,
    private orderService: OrdersService,
    private contractService: ContractsService,
  ) { }

  private normalizeArray<T>(value: any): T[] {
    if (Array.isArray(value)) {
      return value;
    }
    if (value == null) {
      return [];
    }
    return [value];
  }

  private toAutocompleteText(value: any): string {
    if (value == null) {
      return '';
    }
    if (typeof value === 'object') {
      return value.value ?? value.key ?? '';
    }
    return String(value);
  }

  private formatDate(value: any): string {
    if (!value) {
      return '';
    }
    return String(value).split('T')[0];
  }

  private patchSelectedOrder(order: any): void {
    if (!order) {
      return;
    }

    const loadPlanIdC = this.orderForm.get('loadPlanId');
    const addendumIdC = this.orderForm.get('addendumId');
    const addendumDetailIdC = this.orderForm.get('addendumDetailId');

    loadPlanIdC?.enable({ emitEvent: false });
    addendumIdC?.enable({ emitEvent: false });
    addendumDetailIdC?.enable({ emitEvent: false });

    this.orderForm.patchValue({
      orderNo: order.orderNo ?? '',
      transportType: order.transportType ?? '',
      startDate: this.formatDate(order.startDate),
      endDate: this.formatDate(order.endDate),
      shippingStationId: order.shippingStationId ?? '',
      destinationStationId: order.destinationStationId ?? '',
      borderEntryStationId: order.borderEntryStation ?? '',
      borderExitStationId: order.borderExitStation ?? '',
      shipper: order.shipper ?? '',
      receiver: order.receiver ?? '',
      company: order.companyId ?? order.company ?? '',
      loadPlanId: order.loadPlanId ?? '',
      addendumId: order.addendumId ?? '',
      addendumDetailId: order.addendumDetailId ?? '',
      shippingCountryId: order.shippingCountryId ?? '',
      destinationCountryId: order.destinationCountryId ?? '',
      originCountryId: order.originCountryId ?? '',
      hasReturn: order.hasReturn ?? true,
      cargoId: order.cargoId ?? '',
      yds: order.yds ?? '',
      podcode: order.podcode ?? '',
      warrantDate: this.formatDate(order.warrantDate),
      note: order.note ?? '',
    }, { emitEvent: false });

    this.selectedCompany = { key: order.companyId, value: order.company };
    this.selectedLoadStation = { key: order.shippingStationId, value: order.shippingStation };
    this.selectedDestinationStation = { key: order.destinationStationId, value: order.destinationStation };
    this.selectedBorderEntryStationId = order.borderEntryStationId;
    this.selectedBorderExitStationId = order.borderExitStationId;
    this.selectedCargoId = order.cargoId;

    if (this.selectedCompany.key) {
      this.clientOptionsCache = [this.selectedCompany];
      this.commonService.getLoadPlansByCompany(this.selectedCompany.key).subscribe({
        next: (res) => {
          this.customOrders = this.normalizeArray<any>(res.data);
          if (order.loadPlanId) {
            this.orderForm.patchValue({ loadPlanId: order.loadPlanId }, { emitEvent: false });
          }
        }
      });
    }
    if (this.selectedLoadStation.key) {
      this.stationOptionsCache = [this.selectedLoadStation];
    }
    if (this.selectedDestinationStation.key) {
      this.destStationOptionsCache = [this.selectedDestinationStation];
    }

    if (order.loadPlanId) {
      this.contractService.getLoadPlanById(order.loadPlanId).subscribe({
        next: (res) => {
          this.addendumIdOpt = this.normalizeArray<any>(res.data);
          addendumIdC?.patchValue(order.addendumId ?? '', { emitEvent: false });

          if (order.addendumId) {
            this.contractService.getAddendumById(order.addendumId).subscribe({
              next: (res2) => {
                const responseData = res2?.data ?? {};
                this.addendumDetailOption = this.normalizeArray<any>(responseData.addendumDetails);
                this.selectedCargoId = responseData.cargoId ?? '';
                this.orderForm.patchValue({
                  cargoId: responseData.cargo ?? ''
                }, { emitEvent: false });

                addendumDetailIdC?.patchValue(order.addendumDetailId ?? '', { emitEvent: true });
              }
            });
          }
        }
      });
    }
  }

  onCompanySelected(event: MatAutocompleteSelectedEvent) {
    this.selectedCompany = event.option.value;

    this.orderForm.patchValue({
      company: this.selectedCompany.key
    });

    this.commonService.getLoadPlansByCompany(this.selectedCompany.key).subscribe({
      next: (res) => {
        this.customOrders = this.normalizeArray<any>(res.data);

        const loadPlan = this.orderForm.get('loadPlanId');
        const abde = this.orderForm.get('addendumDetailId');
        const abId = this.orderForm.get('addendumId');

        if (!this.customOrders.length) {
          loadPlan?.disable({ emitEvent: false });
          abde?.disable({ emitEvent: false });
          loadPlan?.setValue('');
          abde?.setValue('');
          abId?.setValue('');
        } else {
          loadPlan?.setValue('');
          abde?.setValue('');
          abId?.setValue('');
          loadPlan?.enable({ emitEvent: false });
          abde?.enable({ emitEvent: false });
        }
      }
    });
  }

  onStationSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedLoadStation = event.option.value;

    this.orderForm.patchValue({
      shippingStationId: this.selectedLoadStation.key,
    });
  }

  onDesStationSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedDestinationStation = event.option.value;

    this.orderForm.patchValue({
      destinationStationId: this.selectedDestinationStation.key
    });
  }

  displayCompany = (value: any): string => {
    if (!value) {
      return '';
    }
    if (typeof value === 'object') {
      return value.value ?? '';
    }
    return this.clientOptionsCache?.find(x => x.key === value)?.value || String(value);
  };

  displayPointNames = (value: any): string => {
    if (!value) {
      return '';
    }
    if (typeof value === 'object') {
      return value.value ?? '';
    }
    return this.stationOptionsCache?.find(x => x.key === value)?.value || String(value);
  };

  displayDestPointNames = (value: any): string => {
    if (!value) {
      return '';
    }
    if (typeof value === 'object') {
      return value.value ?? '';
    }
    return this.destStationOptionsCache?.find(x => x.key === value)?.value || String(value);
  };

  orderForm = new FormGroup({
    addendumId: new FormControl({ value: '', disabled: true }), //! ==> Addendum Number

    addendumDetailId: new FormControl({ value: '', disabled: true }, Validators.required),
    orderNo: new FormControl({ value: '', disabled: true }),
    transportType: new FormControl('', Validators.required),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    shippingStationId: new FormControl(''), //* ==> Loading ship
    destinationStationId: new FormControl(''),
    borderEntryStationId: new FormControl({ value: '', disabled: true }),
    borderExitStationId: new FormControl({ value: '', disabled: true }),
    shipper: new FormControl('', Validators.required),
    receiver: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    loadPlanId: new FormControl({ value: '', disabled: true }), //! ==> CUSTOMER ORDER
    shippingCountryId: new FormControl(''),
    destinationCountryId: new FormControl(''),
    originCountryId: new FormControl(''),
    hasReturn: new FormControl(true),
    cargoId: new FormControl({ value: '', disabled: true }),
    yds: new FormControl(''),
    podcode: new FormControl({ value: '', disabled: true }),
    warrantDate: new FormControl({ value: '', disabled: true }),
    note: new FormControl(''),
    orderWagons: new FormArray([]),
  })

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedOrder']) {
      const val = changes['selectedOrder'].currentValue;

      this.patchSelectedOrder(val);
    }
  }

  ngOnInit() {
    this.clientOptions$ = this.orderForm.get('company')!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.commonService.getClients(this.toAutocompleteText(value))),
      map(res => {
        const data = this.normalizeArray<any>(res.data);
        this.clientOptionsCache = data;
        return data;
      })
    );

    this.stationOptions$ = this.orderForm.get('shippingStationId')!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.commonService.getAllPoints(this.toAutocompleteText(value))),
      map(res => {
        const data = this.normalizeArray<any>(res.data);
        this.stationOptionsCache = data;
        return data;
      })
    );

    this.dastStationOptions$ = this.orderForm.get('destinationStationId')!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.commonService.getAllPoints(this.toAutocompleteText(value))),
      map(res => {
        const data = this.normalizeArray<any>(res.data);
        this.destStationOptionsCache = data;
        return data;
      })
    );

    this.orderService.getNewOrdersNumber().subscribe({
      next: (res) => {
        this.newOrderNumber = res.data;
        this.orderForm.patchValue({
          orderNo: this.newOrderNumber,
        });
      }
    });

    this.commonService.getContries().subscribe({
      next: (res) => {
        this.countries = res.data
      }
    })

    this.commonService.getTransportTypes().subscribe({
      next: (res) => {
        this.transportTypes = res.data;
      }
    });

    const transportTypeC = this.orderForm.get('transportType');
    const podcode = this.orderForm.get('podcode');
    const warrantDate = this.orderForm.get('warrantDate');

    transportTypeC?.valueChanges.subscribe((value: any) => {
      const id = Number(value);

      if (id === 2 || id === 4) {
        podcode?.enable({ emitEvent: false });
        warrantDate?.enable({ emitEvent: false });
        podcode?.setValue('');
        warrantDate?.setValue('');
      } else {
        podcode?.disable({ emitEvent: false });
        warrantDate?.disable({ emitEvent: false });
        podcode?.setValue('');
        warrantDate?.setValue('');
      }
    });

    //* ===========================================================
    const loadPlanIdC = this.orderForm.get('loadPlanId');

    loadPlanIdC?.valueChanges.subscribe((val: any) => {
      const id = Number(val);

      this.contractService.getLoadPlanById(id).subscribe({
        next: (res) => {
          const data = this.normalizeArray<any>(res.data);
          this.addendumIdOpt = data;

          this.orderForm.patchValue({
            addendumId: data[0]?.addendumId
          });
        }
      })
    })

    // !===========================================================

    const addendumIdC = this.orderForm.get('addendumId');

    addendumIdC?.valueChanges.subscribe((val: any) => {
      const id = Number(val);

      this.contractService.getAddendumById(id).subscribe({
        next: (res) => {
          const responseData = res?.data ?? {};
          this.addendumDetailOption = this.normalizeArray<any>(responseData.addendumDetails);
          this.selectedCargoId = responseData.cargoId ?? '';

          this.orderForm.patchValue({
            cargoId: responseData.cargo ?? ''
          });
        }
      })
    })

    const addendumDetailIdC = this.orderForm.get('addendumDetailId');
    addendumDetailIdC?.valueChanges.subscribe((val: any) => {
      const id = Number(val);

      this.contractService.getTariffValuesByAddendumDetailId(id).subscribe({
        next: (res) => {
          const data = this.normalizeArray<any>(res.data);
          this.tariffOptions = data;
        }
      })

      const selectedAddendumDetail = this.addendumDetailOption.find(i => i.id == id);
      this.selectedBorderExitStationId = selectedAddendumDetail?.borderExitStationId;
      this.selectedBorderEntryStationId = selectedAddendumDetail?.borderEntryStationId;

      this.orderForm.patchValue({
        borderEntryStationId: selectedAddendumDetail?.borderEntryStation,
        borderExitStationId: selectedAddendumDetail?.borderExitStation
      });
    })
  }

  preparePayload() {
    const formData = this.orderForm.getRawValue();

    const payload = {
      ...formData,
      shippingCountryId: Number(formData.shippingCountryId),
      destinationCountryId: Number(formData.destinationCountryId),
      originCountryId: Number(formData.originCountryId),
      transportType: Number(formData.transportType),
      loadPlanId: Number(formData.loadPlanId),
      addendumDetailId: Number(formData.addendumDetailId),
      borderExitStationId: this.selectedBorderExitStationId || '',
      borderEntryStationId: this.selectedBorderEntryStationId || '',
      cargoId: this.selectedCargoId || '',
      shippingStationId: this.selectedLoadStation?.key || '',
      destinationStationId: this.selectedDestinationStation?.key || '',
    };

    const { addendumId, ...payloadForm } = payload;

    return payloadForm;
  }
}
