import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService, Wagon } from '../../../../core/services/global.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of, forkJoin } from 'rxjs';

@Component({
  selector: 'app-new-railway-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './new-railway-order.component.html',
  styleUrls: ['./new-railway-order.component.css']
})
export class NewRailwayOrderComponent implements OnInit {

  activeTab: 'main' | 'wagons' = 'main';
  isEditing = false;
  orderId: number | null = null;
  isSaving = false;
  errorMessage = '';

  mainForm: FormGroup;

  modeOptions:     any[] = [];
  countries:       any[] = [];
  parkOptions:     any[] = [];
  categoryOptions: any[] = [];
  typeOptions:     any[] = [];
  
  customerOrderOptions: any[] = [];
  addendumOptions: any[] = [];
  addendumDetailOptions: any[] = [];
  tariffOptions: any[] = [];

  companySearch = '';
  companyOptions: any[] = [];
  showCompanyDrop = false;
  selectedCompanyId: number | null = null;
  companyError = false;
  private companySearch$ = new Subject<string>();

  loadingStationSearch = '';
  destinationSearch    = '';
  borderEntrySearch    = '';
  borderExitSearch     = '';
  loadingStationOptions: any[] = [];
  destinationOptions:    any[] = [];
  borderEntryOptions:    any[] = [];
  borderExitOptions:     any[] = [];
  showLoadingStationDrop = false;
  showDestinationDrop    = false;
  showBorderEntryDrop    = false;
  showBorderExitDrop     = false;
  private loadingStationSearch$ = new Subject<string>();
  private destinationSearch$    = new Subject<string>();
  private borderEntrySearch$    = new Subject<string>();
  private borderExitSearch$     = new Subject<string>();
  private currentAddendumData: any = null;

  wagons: Wagon[] = [];
  wagonForm: FormGroup;
  editingWagonIndex: number | null = null;
  inDetails = false;

  constructor(
    private fb: FormBuilder,
    private globalService: GlobalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.mainForm = this.fb.group({
      orderNo:            [{ value: '', disabled: true }],
      mode:               [null, Validators.required],
      companyId:          [null, Validators.required],
      customerOrder:      [{ value: '', disabled: true }],
      addendumNo:         [{ value: '', disabled: true }],
      addendumDetails:    [{ value: '', disabled: true }],
      warrantNumber:      [{ value: '', disabled: true }],
      warrantDate:        [{ value: '', disabled: true }],
      startDate:          ['', Validators.required],
      endDate:            ['', Validators.required],
      consignor:          ['', Validators.required],
      consignee:          ['', Validators.required],
      loadingStation:     [''],
      loadingStationId:   [null],
      destination:        [''],
      destinationId:      [null],
      borderEntry:        [{ value: '', disabled: true }],
      borderEntryId:      [null],
      borderExit:         [{ value: '', disabled: true }],
      borderExitId:       [null],
      cargo:              [{ value: '', disabled: true }],
      shippingCountry:    [null],
      destinationCountry: [null],
      originOfCargo:      [null],
      emptyReturn:        [false],
      yds:                [''],
      note:               ['']
    });

    this.wagonForm = this.fb.group({
      number:     [''],
      tariffId:   [null],
      tariff:     [''],
      parkId:     [null],
      park:       [''],
      categoryId: [null, Validators.required],
      category:   [''],
      typeId:     [null, Validators.required],
      type:       [''],
      weight:     [null, Validators.required],
      count:      [1]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.orderId = +id;
    }

    forkJoin({
      modes:      this.globalService.getTransportTypes(),
      countries:  this.globalService.getCountries(),
      parks:      this.globalService.getParkTypes(),
      categories: this.globalService.getTransportCategories(1),
    }).subscribe({
      next: ({ modes, countries, parks, categories }) => {
        this.modeOptions     = modes;
        this.countries       = countries;
        this.parkOptions     = parks;
        this.categoryOptions = categories;

        if (this.isEditing && this.orderId) {
          this.loadOrderForEdit(this.orderId);
        } else {
          this.globalService.getNewOrderNumber().subscribe({
            next: (num) => this.mainForm.patchValue({ orderNo: num })
          });
        }
      }
    });

    this.mainForm.get('mode')?.valueChanges.subscribe(mode => {
      this.onModeChange(mode);
    });

    this.mainForm.get('companyId')?.valueChanges.subscribe(companyId => {
      this.onCompanyIdChange(companyId);
    });

    this.companySearch$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(q => this.globalService.getClients(q))
    ).subscribe(results => {
      this.companyOptions = results;
      this.showCompanyDrop = results.length > 0;
    });

    this.setupAutocomplete(this.loadingStationSearch$, r => {
      this.loadingStationOptions = r;
      this.showLoadingStationDrop = r.length > 0;
    });
    this.setupAutocomplete(this.destinationSearch$, r => {
      this.destinationOptions = r;
      this.showDestinationDrop = r.length > 0;
    });
    this.setupAutocomplete(this.borderEntrySearch$, r => {
      this.borderEntryOptions = r;
      this.showBorderEntryDrop = r.length > 0;
    });
    this.setupAutocomplete(this.borderExitSearch$, r => {
      this.borderExitOptions = r;
      this.showBorderExitDrop = r.length > 0;
    });

    this.wagonForm.get('categoryId')?.valueChanges.subscribe(catId => {
      if (catId) {
        this.loadTypesByCategory(+catId);
        const cat = this.categoryOptions.find(c => (c.key ?? c.id) === +catId);
        this.wagonForm.patchValue({ category: cat?.value ?? cat?.name ?? '' }, { emitEvent: false });
      } else {
        this.typeOptions = [];
      }
      this.wagonForm.patchValue({ typeId: null, type: '' }, { emitEvent: false });
    });
  }

 onModeChange(mode: string | number): void {
  const warrantNumberCtrl = this.mainForm.get('warrantNumber');
  const warrantDateCtrl   = this.mainForm.get('warrantDate');
  const customerOrderCtrl = this.mainForm.get('customerOrder');

  const isActive = (mode == 2 || mode === 'export' || mode === '2' ||
                    mode == 1 || mode === 'local'  || mode === '1');

  if (isActive) {
    warrantNumberCtrl?.enable();
    warrantDateCtrl?.enable();
    customerOrderCtrl?.enable();
  } else {
    warrantNumberCtrl?.disable();
    warrantDateCtrl?.disable();
    warrantNumberCtrl?.setValue('');
    warrantDateCtrl?.setValue('');
    if (!this.selectedCompanyId) {
      customerOrderCtrl?.disable();
      customerOrderCtrl?.setValue('');
      this.clearAddendumRelatedFields();
    }
  }
}

   onCompanyIdChange(companyId: number): void {
  const customerOrderCtrl = this.mainForm.get('customerOrder');
  this.customerOrderOptions = [];
  customerOrderCtrl?.setValue('');
  this.clearAddendumRelatedFields();

  if (!companyId) {
    customerOrderCtrl?.disable();
    return;
  }

  this.globalService.getLoadPlansByCompany(companyId).subscribe({
    next: (data: any[]) => {
      if (data && data.length > 0) {
        this.customerOrderOptions = data; 
        customerOrderCtrl?.enable();
      } else {
        customerOrderCtrl?.disable();
      }
    },
    error: () => customerOrderCtrl?.disable()
  });
}


   onCustomerOrderChange(loadPlanId: any): void {
  const addendumCtrl = this.mainForm.get('addendumNo');
  this.addendumOptions = [];
  this.addendumDetailOptions = [];
  this.clearDetailFields();

  if (!loadPlanId || loadPlanId === 'null') {
    addendumCtrl?.disable();
    return;
  }

  this.globalService.getLoadPlanById(+loadPlanId).subscribe({
    next: (data: any) => {
      if (data?.addendumId) {
        this.addendumOptions = [{
          id:         data.addendumId,
          addendumNo: data.addendumNo
        }];
        addendumCtrl?.enable();
        addendumCtrl?.setValue(data.addendumId, { emitEvent: false });
        this.onAddendumChange(data.addendumId);
      } else {
        addendumCtrl?.disable();
      }
    },
    error: () => addendumCtrl?.disable()
  });
}
   onAddendumChange(addendumId: any): void {
  const detailCtrl = this.mainForm.get('addendumDetails');
  this.addendumDetailOptions = [];
  this.currentAddendumData = null;
  this.clearDetailFields();

  if (!addendumId || addendumId === 'null') {
    detailCtrl?.disable();
    return;
  }

  this.globalService.getAddendumById(+addendumId).subscribe({
    next: (res: any) => {
      this.currentAddendumData = res;
      const details = res?.addendumDetails ?? res?.data?.addendumDetails ?? [];

      if (details.length > 0) {
        this.addendumDetailOptions = details;
        detailCtrl?.enable();

        if (details.length === 1) {
          detailCtrl?.setValue(details[0].id, { emitEvent: false });
          this.onAddendumDetailChange(details[0].id);
        }
      } else {
        detailCtrl?.disable();
      }
    },
    error: () => detailCtrl?.disable()
  });
}

  onAddendumDetailChange(detailId: any): void {
  if (!detailId || detailId === 'null') {
    this.clearDetailFields();
    return;
  }

  const detail = this.addendumDetailOptions.find(d => d.id === +detailId);

  if (detail) {
    const startDate = this.toInputDate(this.currentAddendumData?.effectiveDate ?? null);
    const endDate   = this.toInputDate(this.currentAddendumData?.endDate ?? null);

    this.mainForm.patchValue({
      startDate,
      endDate,
      loadingStation:   detail.startPointName                     || '',
      loadingStationId: detail.startPointId                      || null,
      destination:      detail.endPointName                      || '',
      destinationId:    detail.endPointId                        || null,
      borderEntry:      detail.borderEntryStation                || '',
      borderEntryId:    detail.borderEntryStationId              || null,
      borderExit:       detail.borderExitStation                 || '',
      borderExitId:     this.nullIfZero(detail.borderExitStationId),
      cargo:            detail.cargoName                         || '',
      originOfCargo:    this.nullIfZero(detail.originCountryId ?? null)
    }, { emitEvent: false });

    this.loadingStationSearch = detail.startPointName     || '';
    this.destinationSearch    = detail.endPointName       || '';
    this.borderEntrySearch    = detail.borderEntryStation || '';
    this.borderExitSearch     = detail.borderExitStation  || '';

    if (detail.categoryId) {
      this.wagonForm.patchValue({
        categoryId: detail.categoryId,
        typeId:     detail.wagonTypeId
      });
      this.loadTypesByCategory(detail.categoryId);
    }
  }

  this.globalService.getTariffValuesByAddendumDetailId(+detailId).subscribe({
    next: (res: any) => {
      this.tariffOptions = Array.isArray(res) ? res : (res?.data ?? []);
    }
  });
}

  private clearAddendumRelatedFields(): void {
    this.addendumOptions = [];
    this.addendumDetailOptions = [];
    this.tariffOptions = [];
    this.mainForm.patchValue({
      addendumNo: '',
      addendumDetails: '',
      loadingStation: '',
      loadingStationId: null,
      destination: '',
      destinationId: null,
      borderEntry: '',
      borderEntryId: null,
      borderExit: '',
      borderExitId: null,
      cargo: '',
      originOfCargo: null
    });
  }

  private clearDetailFields(): void {
    this.addendumDetailOptions = [];
    this.tariffOptions = [];
    this.mainForm.patchValue({
      addendumDetails: '',
      loadingStation: '',
      loadingStationId: null,
      destination: '',
      destinationId: null,
      borderEntry: '',
      borderEntryId: null,
      borderExit: '',
      borderExitId: null,
      cargo: '',
      originOfCargo: null
    });
  }

  loadTypesByCategory(categoryId: number) {
    this.globalService.getTransportTypesByCategory(categoryId).subscribe({
      next: (data) => { this.typeOptions = data; }
    });
  }

  private setupAutocomplete(subject: Subject<string>, handler: (r: any[]) => void) {
    subject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(q => q.length >= 2 ? this.globalService.getPoints(q) : of([]))
    ).subscribe(handler);
  }

  private toInputDate(d: string | null): string {
    if (!d) return '';
    return d.split('T')[0]; 
  }

  private nullIfZero(val: number | null | undefined): number | null {
    return (val === 0 || val == null) ? null : val;
  }

  onCompanyInput(val: string) {
    this.companySearch = val;
    this.selectedCompanyId = null;
    this.mainForm.patchValue({ companyId: null });
    this.companySearch$.next(val);
  }
  
  selectCompany(opt: any) {
    this.companySearch = opt.value;
    this.selectedCompanyId = opt.key;
    this.mainForm.patchValue({ companyId: opt.key });
    this.companyError = false;
    this.showCompanyDrop = false;
  }

  onLoadingStationInput(val: string) {
    this.loadingStationSearch = val;
    this.loadingStationSearch$.next(val);
  }
  selectLoadingStation(opt: any) {
    this.mainForm.patchValue({ loadingStation: opt.value, loadingStationId: opt.key });
    this.loadingStationSearch = opt.value;
    this.showLoadingStationDrop = false;
  }
  onDestinationInput(val: string) {
    this.destinationSearch = val;
    this.destinationSearch$.next(val);
  }
  selectDestination(opt: any) {
    this.mainForm.patchValue({ destination: opt.value, destinationId: opt.key });
    this.destinationSearch = opt.value;
    this.showDestinationDrop = false;
  }
  onBorderEntryInput(val: string) {
    this.borderEntrySearch = val;
    this.borderEntrySearch$.next(val);
  }
  selectBorderEntry(opt: any) {
    this.mainForm.patchValue({ borderEntry: opt.value, borderEntryId: opt.key });
    this.borderEntrySearch = opt.value;
    this.showBorderEntryDrop = false;
  }
  onBorderExitInput(val: string) {
    this.borderExitSearch = val;
    this.borderExitSearch$.next(val);
  }
  selectBorderExit(opt: any) {
    this.mainForm.patchValue({ borderExit: opt.value, borderExitId: opt.key });
    this.borderExitSearch = opt.value;
    this.showBorderExitDrop = false;
  }

  onTypeChange(typeId: any) {
    const t = this.typeOptions.find(x => (x.key ?? x.id) === +typeId);
    this.wagonForm.patchValue({ type: t?.value ?? t?.name ?? '' });
  }

  onParkChange(parkId: any) {
    const p = this.parkOptions.find(x => (x.key ?? x.id) === +parkId);
    this.wagonForm.patchValue({ park: p?.value ?? p?.name ?? '' });
  }

  loadOrderForEdit(id: number) {
    this.globalService.getRailwayOrderById(id).subscribe({
      next: (order) => {
        if (!order) return;
        const raw = order as any;

        this.companySearch        = raw.company            || '';
        this.selectedCompanyId    = raw.companyId          || null;
        this.loadingStationSearch = raw.shippingStation    || '';
        this.destinationSearch    = raw.destinationStation || '';
        this.borderEntrySearch    = raw.borderEntryStation || '';
        this.borderExitSearch     = raw.borderExitStation  || '';

        this.mainForm.patchValue({
          orderNo:            raw.orderNo,
          mode:               raw.transportType,           
          companyId:          raw.companyId,
          customerOrder:      raw.loadPlanId,
          addendumNo:         raw.addendumId,
          addendumDetails:    raw.addendumDetailId,
          warrantNumber:      raw.podcode                  || '',
          warrantDate:        this.toInputDate(raw.warrantDate),
          startDate:          this.toInputDate(raw.startDate),
          endDate:            this.toInputDate(raw.endDate),
          consignor:          raw.shipper                  || '',
          consignee:          raw.receiver                 || '',
          loadingStationId:   raw.shippingStationId        || null,
          destinationId:      raw.destinationStationId     || null,
          borderEntryId:      raw.borderEntryStationId     || null,
          borderExitId:       raw.borderExitStationId      || null,
          cargo:              raw.qnqEtsnq                 || '',
          shippingCountry:    this.nullIfZero(raw.shippingCountryId),
          destinationCountry: this.nullIfZero(raw.destinationCountryId),
          originOfCargo:      this.nullIfZero(raw.originCountryId),
          emptyReturn:        raw.hasReturn                ?? false,
          yds:                raw.yds                      || '',
          note:               raw.note                     || '',
        });

        this.onModeChange(raw.transportType);
        
       if (raw.companyId) {
        this.onCompanyIdChange(raw.companyId);
        if (raw.loadPlanId) this.onCustomerOrderChange(raw.loadPlanId);
      }

        this.wagons = (raw.orderWagons || []).map((w: any) => ({
          id:         w.id,
          number:     w.wagonNo          || '',
          tariffId:   w.addendumTariffType,
          tariff:     w.selectedTariff   || '',
          parkId:     w.parkType,
          park:       w.parkTypeName     || '',
          categoryId: w.categoryId,
          category:   w.categoryName     || '',
          typeId:     w.typeId,
          type:       w.typeName         || '',
          weight:     w.weight,
          count:      w.count,
        }));
      }
    });
  }

  goToWagons() {
    if (this.mainForm.invalid) {
      this.mainForm.markAllAsTouched();
      if (!this.selectedCompanyId) this.companyError = true;
      return;
    }
    if (!this.selectedCompanyId && !this.isEditing) {
      this.companyError = true;
      return;
    }
    this.activeTab = 'wagons';
  }

  goToMain() { this.activeTab = 'main'; }

  addWagon() {
    if (this.wagonForm.invalid) {
      this.wagonForm.markAllAsTouched();
      return;
    }
    const w: Wagon = this.wagonForm.getRawValue();
    if (this.editingWagonIndex !== null) {
      this.wagons[this.editingWagonIndex] = w;
      this.editingWagonIndex = null;
    } else {
      this.wagons.push(w);
    }
    this.wagonForm.reset({ count: 1 });
  }

  editWagon(i: number) {
    this.editingWagonIndex = i;
    this.wagonForm.patchValue(this.wagons[i]);
    if (this.wagons[i].categoryId) {
      this.loadTypesByCategory(this.wagons[i].categoryId!);
    }
  }

  deleteWagon(i: number) {
    const w = this.wagons[i];
    if (w.id) this.globalService.deleteWagon(w.id).subscribe();
    this.wagons.splice(i, 1);
  }

  approve() {
    if (this.mainForm.invalid) {
      this.mainForm.markAllAsTouched();
      this.activeTab = 'main';
      return;
    }
    this.isSaving = true;
    this.errorMessage = '';
    const raw = this.mainForm.getRawValue();

    const body: any = {
      transportType:        raw.mode,
      companyId:            raw.companyId,
      loadPlanId:           raw.customerOrder,
      addendumId:           raw.addendumNo,
      addendumDetailId:     raw.addendumDetails,
      shippingStationId:    raw.loadingStationId  || 0,
      destinationStationId: raw.destinationId     || 0,
      borderEntryStationId: raw.borderEntryId     || 0,
      borderExitStationId:  raw.borderExitId      || 0,
      shipper:              raw.consignor,
      receiver:             raw.consignee,
      qnqEtsnq:             raw.cargo,
      shippingCountryId:    raw.shippingCountry   || 0,
      destinationCountryId: raw.destinationCountry || 0,
      originCountryId:      raw.originOfCargo     || 0,
      hasReturn:            raw.emptyReturn,
      yds:                  raw.yds,
      note:                 raw.note,
      podcode:              raw.warrantNumber,
      warrantDate:          raw.warrantDate        || null,
      startDate:            raw.startDate,
      endDate:              raw.endDate,
      orderWagons:          this.wagons.map(w => ({
        id: w.id,
        wagonNo: w.number,
        categoryId: w.categoryId,
        typeId: w.typeId,
        weight: w.weight,
        count: w.count,
        parkType: w.parkId,
        addendumTariffType: w.tariffId
      }))
    };

    const req$ = this.isEditing && this.orderId
      ? this.globalService.updateRailwayOrder({ ...body, id: this.orderId })
      : this.globalService.createRailwayOrder(body);

    req$.subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['orders', 'railwayOrders']);
      },
      error: () => {
        this.errorMessage = 'Xəta baş verdi. Yenidən cəhd edin.';
        this.isSaving = false;
      }
    });
  }

  exit() { this.router.navigate(['orders', 'railwayOrders']); }

  get f()  { return this.mainForm.controls; }
  get wf() { return this.wagonForm.controls; }
}