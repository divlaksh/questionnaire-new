import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppConfig } from '../../app.config';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { ServiceProvider } from '../../shared/services/service-provider';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import $ from 'jquery';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

import * as models from '../../shared/models';
import { EstimatorConfig } from 'src/app/layout/estimator/estimator.config';


// import { DatepickerOptions } from 'ng2-datepicker';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-estimator',
  templateUrl: './estimator.component.html',
  styleUrls: ['./estimator.component.scss']
})
export class EstimatorComponent implements OnInit {
  userSubscription: Subscription;

  userType: string = '';
  requestor: string = AppConfig.REQUESTOR_TYPE;
  tsaType: string = AppConfig.TSA_TYPE;
  approverType: string = AppConfig.APPROVER_TYPE;
  closeResult: string;
  // collapseCustomerDetails = false;
  // collapseEstimatorDetails = false;
  // collapseServerDetails = true;
  // collapseWorkstationDetails = true;
  showEstimatorPanel = false;
  selectedFormId: string = '';

  serviceOperations: any = [];
  serviceScopes: any = [];
  filterServiceScopes: any = [];
  coesList: any = [];
  endpointList: any = [];
  filterEndpointList: any = [];

  isToggleSearchClicked = false;
  approverList: any = [];
  regionList: any = [];
  deliveryLocationList: any = [];
  vendorList: any = [];
  filterVendorList: any = [];
  riskRatings: any = [];
  priorities: any = [];
  contractTypes: any = [];

  // estimatorForm: FormGroup;
  detailsForm: FormGroup;
  estimatorForm: FormGroup;
  serviceList: FormArray;
  // serverForm: FormGroup;
  // workstationForm: FormGroup;
  termsAndConditionForm: FormGroup;
  searchForm: FormGroup;

  detailsFormSubmitted = false;
  currentForm: models.FormDetailModel = {};
  estimatorModel: models.EstimatorModel = {};
  // serverModel: models.ServerModel = {};
  // workstationModel: models.WorkstationModel = {};
  nextFormId: string;
  // encryptionEndpoint: boolean = false;
  // hostIpsOnServer: boolean = false;
  // hostFirewallOnServer: boolean = false;
  // hostIpsOnWorkstation: boolean = false;
  // hostFirewallOnWorkstation: boolean = false;
  // deviceApplicationControl: boolean = false;
  // isCoeValid: boolean = true;
  // isEndPointValid: boolean = true;
  downloadURL: string;
  downloadDocumentURL: string;
  termsAndConditions: models.TermsAndConditionModel = {};
  termsList: any[] = [];
  editTermsAndConditionsClicked: boolean = false;
  public submittedFormIdToDownload: string = '';
  public editor;
  public editorContent = ``;
  public editorOptions = {
    placeholder: ''
  };

  currentStatus: string = '';
  isSendForApproval: boolean = false;

  myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'd-m-yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    satHighlight: true,
    inline: false,
    markCurrentDay: true,
    markCurrentMonth: true,
    markCurrentYear: true,
    monthSelector: true,
    yearSelector: true,
    showTodayBtn: true,
    height: '27px',
  };

  // Initialized to specific date (09.10.2018).
  public datePreparedModel: any;
  validToModel: any;
  isView: boolean = false;
  public isSearchPage: boolean = false;
  isNewPage: boolean = false;
  maxFormIndex: number = 0;
  supportDetails: any = {};
  fte: number = 0;
  band5: number = 0;
  band7: number = 0;
  band5Hours: number = 0;
  band7Hours: number = 0;
  band7OnCallHours: number = 0;
  hours: number = 0;
  cost: number = 0;
  band5Cost: number = 0;
  band7Cost: number = 0;
  band7OnCallCost: number = 0;
  endPointSelected: boolean[] = [];
  isNbie: boolean = false;
  datePreparedValue: any = '';
  validToValue: any = '';
  isSelfApprovalByRequestor: boolean = false;

  value = 11;


  selectedRegions = [];
  regionSelectConfig = {};
  selectTermsAndConditionIndex: number;
  selectedFiles: any[];
  isAgreed: boolean = false;
  isRejectedByApprover: boolean = false;
  public currentFileUpload: File;
  @ViewChild('myInputFile')
  myInputVariable: ElementRef;
  documentList: any;
  deals: any = EstimatorConfig.getDeals();
  public selectedServices: any = [];
  public previewCostTableRowHeaders: string[] = [];


  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,
    private serviceProvider: ServiceProvider, private datePipe: DatePipe,
    private _Activatedroute: ActivatedRoute, private router: Router) {



    this.userType = localStorage.getItem('user_type');

    this.downloadURL = AppConfig.APP_URL + '/form/download-form';
    this.downloadDocumentURL = AppConfig.APP_URL + '/document/download-document';
    // this.getUsersByType(this.approverType);
    this.getRegionList();
    this.getTermsAndConditions();
    this.getVendorList();
    this.getCoeList();
    this.getEndpointList();
    this.getServiceScopeList();
    this.getServiceWindowList();
    this.getSupportDetails();
    this.getDeliveryLocationList();
    this.getContractTypeList();
    this.getPriorityList();

    this.riskRatings = AppConfig.RISK_RATING;

    const currentDate = moment().toDate();
    const dateStr = datePipe.transform(currentDate, 'dd-MM-yyyy');
    let dateArr = dateStr.split('-');
    this.datePreparedModel = { date: { year: dateArr[2], month: dateArr[1], day: dateArr[0] } };
    this.validToModel = { date: { year: dateArr[2], month: dateArr[1], day: dateArr[0] } };

    // setTimeout(() => {
    //   jQuery('.selectpicker').selectpicker('refresh');
    // }, 100);

  }

  ngOnInit() {


    // $('.selectpicker').selectpicker();

    this.userSubscription = this._Activatedroute.params.subscribe(
      (params: Params) => {

        if (!!params && params['isNewForm'] === 'true') {
          this.isNewPage = true;
          this.isView = false;
        } else {
          this.isNewPage = false;
          if (params['isView'] === 'true') {
            this.isView = true;
          } else {
            this.isView = false;
          }
        }

        if (params['isSearch'] === 'true') {
          this.isSearchPage = true;
        } else {
          this.isSearchPage = false;
        }


        const selectedFormId = params['formId'];
        // if (params['isView'] === 'true') {
        //   this.isView = true;
        // } else {
        //   this.isView = false;
        // }

        if (!!selectedFormId && selectedFormId !== '') {
          this.loadForm(selectedFormId);
          this.getDocumentsByFormId(selectedFormId);
          this.submittedFormIdToDownload = selectedFormId;
        }


        if (!!params['formId']) {
          this.selectedFormId = params['formId'];
        }

        this.initialiseRegionSelectConfig();

      });


    const currentDate = moment().toDate();
    const dateStr = this.datePipe.transform(currentDate, 'dd-MM-yyyy');
    let dateArr = dateStr.split('-');
    this.datePreparedModel = {
      date: { year: dateArr[2], month: dateArr[1], day: dateArr[0] },
      formatted: dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2]
    };
    this.validToModel = {
      date: { year: dateArr[2], month: dateArr[1], day: dateArr[0] },
      formatted: dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2]
    };


    this.addFormControl();
    // if (this.userType !== this.requestor) {
    this.addEstimatorFormControl();
    this.updateFormControl(this.isNbie);
    // }

    if (this.isNewPage) {
      this.getNextFormId();
    } else {
      this.detailsForm.get('formId').setValue('');
      this.detailsForm.get('formStatus').setValue('');
      this.detailsForm.get('formStatusId').setValue('');
      this.detailsForm.get('requestorName').setValue('');
      this.detailsForm.get('requestorId').setValue('');
      this.datePreparedModel = '';
      this.validToModel = '';
    }



    if (!this.isNewPage) {
      this.detailsForm.get('formId').setValue(this.selectedFormId);
    }

    const status = EstimatorConfig.getFormStatusbyId(EstimatorConfig.STATUS_NEW);
    if (!!status) {
      this.detailsForm.get('formStatus').setValue(status.value);
      this.detailsForm.get('formStatusId').setValue(EstimatorConfig.STATUS_NEW);
    }

  }

  initialiseRegionSelectConfig() {
    this.selectedRegions = [

    ];
    this.regionSelectConfig = {
      singleSelection: false,
      idField: 'regionCode',
      textField: 'regionName',
      allowSearchFilter: true,
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      clearSearchFilter: true,
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  ngViewAfterInit() {
    // if ($('.selectpicker').length !== 0) {
    //   $('.selectpicker').selectpicker({
    //     iconBase: 'fa',
    //     tickIcon: 'fa-check'
    //   });
    // }

  }

  // returns all form groups under services
  get serviceFormGroup() {

    return this.detailsForm.get('services') as FormArray;
  }


  addFormControl() {
    this.searchForm = this.formBuilder.group({
      searchFormId: [''],
    });

    this.detailsForm = this.formBuilder.group({
      formId: ['', Validators.required],
      formStatusId: ['', Validators.required],
      formStatus: ['', Validators.required],
      requestorName: [localStorage.getItem('current_user_name'), Validators.required],
      requestorId: [localStorage.getItem('current_user'), Validators.required],
      riskRating: [''],
      deal: [''],
      datePrepared: [''],
      validTo: [''],
      salesConnectNo: [''],
      rfsNo: [''],
      region: [''],
      customerName: [''],
      customerId: [''],
      salesId: [''],
      custom: [''],
      deliveryLocation: [''],
      services: this.formBuilder.array([this.createService()]),
      documentName: [''],
      documentComment: ['']

    });


    // set serviceList to this field
    this.serviceList = this.detailsForm.get('services') as FormArray;


    this.termsAndConditionForm = this.formBuilder.group({
      termsAndCondition: ['', Validators.required]
    });
  }

  // contact formgroup
  createService(): FormGroup {
    if (this.userType !== this.requestor) {
      return this.formBuilder.group({
        id: null,
        contractType: '',
        contractDuration: '',
        coe: '',
        endPoint: '',
        serviceWindow: '',
        serviceScope: '',
        vendor: '',
        noOfServers: '',
        noOfConsoles: '',
        onCallText: '',
        b7Text: '',
        b5Text: '',
        b6aText: '',
        b6bText: '',
        b8Text: '',
        fteText: '',
        travel: ''
      });
    } else {
      return this.formBuilder.group({
        id: null,
        contractType: '',
        contractDuration: '',
        coe: '',
        endPoint: '',
        serviceWindow: '',
        serviceScope: '',
        vendor: '',
        noOfServers: '',
        noOfConsoles: ''
      });
    }
  }

  addEstimatorFormControl() {
    this.estimatorForm = this.formBuilder.group({
      b5Tnt: [''],
      b7Tnt: [''],
      b7OnCallTnt: [''],
      totalTnt: [''],
      b5Ssb: [''],
      b7Ssb: [''],
      b7OnCallSsb: [''],
      totalSsb: [''],
      b5Hour: [''],
      b7Hour: [''],
      b7OnCallHour: [''],
      totalHour: [''],
      b5Cost: [''],
      b7Cost: [''],
      b7OnCallCost: [''],
      totalCost: [''],
    });
  }

  // add a service form group
  addService() {

    this.maxFormIndex = this.maxFormIndex + 1;
    this.serviceList.push(this.createService());
  }

  // remove service from group
  removeService(index) {
    if (this.serviceList.length === 1 && index === 0) {
      return;
    }

    this.maxFormIndex = this.maxFormIndex - 1;
    this.serviceList = this.detailsForm.get('services') as FormArray;
    this.serviceList.removeAt(index);
  }

  get df() {
    return this.detailsForm.controls;
  }




  toggleSearch() {
    this.isToggleSearchClicked = !this.isToggleSearchClicked;
  }

  closeSearch() {
    this.isToggleSearchClicked = false;
  }

  SearchFormById() {
    const formId = this.searchForm.get('searchFormId').value;
    this.serviceProvider.getFormByFormId(formId).subscribe(
      result => {
        this.isView = true;
        if (localStorage.getItem('user_type') !== AppConfig.REQUESTOR_TYPE) {
          this.isView = false;
        }
        this.currentForm = result;
        const isNbieVal = !!this.currentForm && !!this.currentForm.nbie && this.currentForm.nbie === true;
        this.updateFormControl(isNbieVal);
        this.setFormFields(this.currentForm);
      },
      err => {
        Swal.fire('Oops', 'Failed to load form. Please try again', 'error');
      },
      () => {

      }
    );
  }


  loadForm(formId: string) {

    let resetUpdated = false;
    if (this.userType === this.tsaType) {
      resetUpdated = true;
    }
    this.serviceProvider.getFormByFormId(formId, resetUpdated).subscribe(
      result => {

        this.currentForm = result;
        this.currentStatus = this.currentForm.formStatusId;
        const isNbieVal = !!this.currentForm && !!this.currentForm.nbie && this.currentForm.nbie === true;
        this.updateFormControl(isNbieVal);
        this.setFormFields(this.currentForm);

        if (this.userType === this.requestor) {
          if ((this.currentStatus === EstimatorConfig.STATUS_NEW || this.currentStatus === EstimatorConfig.STATUS_REJECTED
            || this.currentStatus === EstimatorConfig.STATUS_ACCEPTED
            || this.currentStatus === EstimatorConfig.STATUS_REVISE)) {
            this.isView = false;
          } else {
            this.isView = true;
          }
        } else if (this.userType = this.tsaType) {

          this.isRejectedByApprover = this.currentForm.isRejectedByApprover === null || this.currentForm.isRejectedByApprover ? true : false;
        }

      },
      err => {
        Swal.fire('Oops', 'Failed to load form. Please try again', 'error');
      },
      () => {

      }
    );
  }

  getDocumentsByFormId(formId: string) {

    this.serviceProvider.getDocumentsByFormId(formId).subscribe(
      result => {
        if (!!result) {
          this.documentList = result;
        }

      },
      err => {

      }
    );
  }

  saveForm() {

    this.detailsFormSubmitted = true;

    let status = EstimatorConfig.getFormStatusbyId(EstimatorConfig.STATUS_NEW);
    if (this.isSendForApproval && this.currentForm.formStatusId === EstimatorConfig.STATUS_REJECTED) {
      status = EstimatorConfig.getFormStatusbyId(EstimatorConfig.STATUS_PENDING_APPROVAL);
    } else if (this.isSendForApproval) {
      if (this.currentForm.formStatusId === EstimatorConfig.STATUS_REVISE) {
        status = EstimatorConfig.getFormStatusbyId(EstimatorConfig.STATUS_PENDING_APPROVAL);
      } else {
        status = EstimatorConfig.getFormStatusbyId(EstimatorConfig.STATUS_PENDING_APPROVAL);
      }

    } else if (this.isSelfApprovalByRequestor) {
      status = EstimatorConfig.getFormStatusbyId(EstimatorConfig.STATUS_APPROVED);
      this.currentForm.isSelfApprovedByRequestor = true;
    }
    if (!!status) {
      this.detailsForm.get('formStatusId').setValue(status.id);
      this.detailsForm.get('formStatus').setValue(status.value);
    }


    if (this.detailsForm.valid && (this.isNbie || this.selectedRegions.length > 0)) {

      this.setValuesToSave();
      this.currentForm.isUpdated = true;
      this.serviceProvider.saveForm(this.currentForm).subscribe(
        result => {
          if (result) {
            this.uploadDocuments();
            this.submittedFormIdToDownload = this.currentForm.formId;
            if (this.isSendForApproval) {
              Swal.fire('Confirmation', 'Form ' + this.currentForm.formId + ' has been sent for approval', 'success');
            } else {
              Swal.fire('Confirmation', 'Form ' + this.currentForm.formId + ' created successfully....', 'success');
              // this.resetFormFields();
            }
            if (this.userType === this.requestor) {
              this.router.navigate(['/form-list', 'true']);
            } else if (this.userType === this.tsaType) {
              if (this.currentStatus === EstimatorConfig.STATUS_REJECTED) {
                this.router.navigate(['/rejected-list', 'true']);
              } else {
                this.router.navigate(['/pending-list', 'true']);
              }
            }
          } else {
            if (this.isSendForApproval) {
              Swal.fire('Oops', 'Failed to send for approval. Please try again', 'error');
            } else {
              Swal.fire('Oops', 'Failed to create form. Please try again', 'error');
            }
          }
        },
        err => {
          if (this.isSendForApproval) {
            Swal.fire('Oops', 'Failed to send for approval. Please try again', 'error');
          } else {
            Swal.fire('Oops', 'Failed to create form. Please try again', 'error');
          }
        },
        () => {

        }
      );
    } else {
      Swal.fire('Oops', 'Some of the fields are empty', 'info');
    }
  }

  uploadDocuments() {
    if (!!this.selectedFiles && this.selectedFiles.length > 0) {
      for (const file of this.selectedFiles) {
        if (!!file['isNew'] && file['isNew']) {
          this.serviceProvider.uploadDocument(file, this.currentForm.formId, localStorage.getItem('current_user'), file['fileName'], file['comment']).subscribe(event => {
            this.myInputVariable.nativeElement.value = '';
          });
        }
      }
    }
  }

  sendForApproval() {
    this.isSendForApproval = true;
    this.saveForm();
  }

  selfApprovalByrequestor() {
    this.isSelfApprovalByRequestor = true;
    this.saveForm();
  }

  /**
   * get approvers list
   *
   * @param type
   */
  getUsersByType(type: string) {
    this.serviceProvider.getUsersByType(type).subscribe(
      result => {
        if (!!result) {
          this.approverList = result;
        }
      },
      err => {

      },
      () => {

      }
    );
  }

  /**
   * get region list
   */
  getRegionList() {
    this.serviceProvider.getList('/form/regions').subscribe(
      result => {
        if (!!result) {
          this.regionList = result;
        }
      },
      err => {

      },
      () => {

      }
    );
  }

  getContractTypeList() {
    this.serviceProvider.getList('/setting/contract-types').subscribe(
      result => {
        if (!!result) {
          this.contractTypes = result;
        }
      },
      err => {
        console.log('failed to get contract type list');
      }
    );
  }

  getPriorityList() {
    this.serviceProvider.getList('/setting/priorities').subscribe(
      result => {
        if (!!result) {
          this.priorities = result;
        }
      },
      err => {
        console.log('failed to get contract type list');
      }
    );
  }

  getDeliveryLocationList() {
    this.serviceProvider.getList('/form/delivery-location').subscribe(
      result => {
        if (!!result) {
          this.deliveryLocationList = result;
        }
      },
      err => {

      },
      () => {

      }
    );
  }

  getCoeList() {
    this.serviceProvider.getList('/form/coes').subscribe(
      result => {
        if (!!result) {
          this.coesList = result;
        }
      },
      err => {

      },
      () => {

      }
    );
  }

  getServicesName(name: string, code: string): string {

    let items: any;
    if (name === 'END_POINT') {
      items = this.coesList.filter(item => item.code === code);
    } else if (name === 'TECH') {
      items = this.endpointList.filter(item => item.code === code);
    } else if (name === 'SW') {
      items = this.serviceOperations.filter(item => item.code === code);
    } else if (name === 'SS') {
      items = this.serviceScopes.filter(item => item.code === code);
    } else if (name === 'PRODUCT') {
      items = this.vendorList.filter(item => String(item.id) === code);
    } else if (name === 'CONTRACT_TYPE') {
      items = this.contractTypes.filter(item => item.code === code);
    }

    if (!!items && items.length > 0) {
      if (!!items[0].name) {
        return items[0].name;
      } else {
        return items[0].description;
      }
    } else {
      return '';
    }
  }


  getEndpointList() {
    this.serviceProvider.getList('/form/endpoints').subscribe(
      result => {
        if (!!result) {
          this.endpointList = result;
          this.filterEndpointList = result;
        }
      },
      err => {

      },
      () => {

      }
    );
  }

  getServiceWindowList() {
    this.serviceProvider.getList('/form/service-window').subscribe(
      result => {
        if (!!result) {
          this.serviceOperations = result;
        }
      },
      err => {

      },
      () => {

      }
    );
  }

  getSupportDetails() {

    this.serviceProvider.getSupportDetails().subscribe(
      result => {
        if (!!result) {
          this.supportDetails = result;
        }
      },
      err => {

      },
      () => {

      }
    );
  }

  getServiceScopeList() {
    this.serviceProvider.getList('/form/service-scope').subscribe(
      result => {
        if (!!result) {
          this.serviceScopes = result;
          this.filterServiceScopes = result;
        }
      },
      err => {

      },
      () => {

      }
    );
  }


  getVendorList() {
    this.serviceProvider.getList('/form/vendors').subscribe(
      result => {
        if (!!result) {
          this.vendorList = result;
          this.filterVendorList = result;
        }
      },
      err => {

      },
      () => {

      }
    );
  }

  getNextFormId() {
    this.serviceProvider.getNewFormId().subscribe(
      result => {

        if (!!result) {
          const newFormId = 'IBMSEC' + '-' + result;
          this.detailsForm.get('formId').setValue(newFormId);
        }
      },
      err => {

      },
      () => {

      }
    );
  }

  setValuesToSave() {
    debugger
    this.currentForm.nbie = this.isNbie;
    const detailFormControls = EstimatorConfig.getDetailFormControls();
    this.currentForm.formRegions = this.selectedRegions;
    for (let control of detailFormControls) {
      if (control === 'datePrepared' || control === 'validTo') {
        if (!this.isSendForApproval) {
          if (!!this.detailsForm.get(control).value.formatted) {
            this.currentForm[control] = this.detailsForm.get(control).value.formatted;
          } else {
            this.currentForm[control] = this.detailsForm.get(control).value.date.day
              + '-' + this.detailsForm.get(control).value.date.month
              + '-' + this.detailsForm.get(control).value.date.year;
          }
        } else {
          if (!!this.detailsForm.get(control).value) {
            const dateValue = this.detailsForm.get(control).value.date.day
              + '-' + this.detailsForm.get(control).value.date.month
              + '-' + this.detailsForm.get(control).value.date.year;
          } else { }
        }
      } else {
        this.currentForm[control] = this.detailsForm.get(control).value;
      }
    }


    console.log(this.serviceList);

    const serviceListControls = EstimatorConfig.getServiceControls();
    debugger
    if (this.serviceList.controls.length > 0) {
      this.currentForm.serviceDetails = [];
      for (let service1 of this.serviceList.controls) {
        const coe = this.getCoeByCode(service1.get('coe').value);
        if (!!coe) {
          let serviceModel: models.ServiceModel = {};
          serviceModel.formId = this.detailsForm.get('formId').value;
          for (let control of serviceListControls) {
            if (!!service1.get(control))
              serviceModel[control] = service1.get(control).value;
          }
          serviceModel.approver = coe.approver;

          this.currentForm.serviceDetails.push(serviceModel);
        }
        console.log(service1.get('coe').value);
      }
    }

    if ((this.isNbie && this.isSelfApprovalByRequestor) || this.userType !== this.requestor) {
      this.currentForm.estimatorDetails = {};
      const estimatorControls = EstimatorConfig.getEstimatorControls();
      for (let control of estimatorControls) {
        this.currentForm.estimatorDetails[control] = this.estimatorForm.get(control).value;
      }
    }
    if (!this.currentForm.estimatorDetails) {
      this.currentForm.estimatorDetails = {};
      this.currentForm.estimatorDetails.id = null;
    }

    if (this.currentForm.formId.indexOf('--') > 0) {
      const val = this.currentForm.formId.split('--');
      this.currentForm.formId = val[0] + '-' + val[1];
    }


  }

  getCoeByCode(code: string) {
    const items = this.coesList.filter(item => item.code === code);
    if (!!items && items.length > 0) {
      return items[0];
    }

    return null;
  }

  openTermsAndConditions(modal) {

    this.updateTermsAndConditionList();
    this.open(modal);
  }

  preview(modal) {
    debugger
    this.selectedServices = [];
    this.previewCostTableRowHeaders = EstimatorConfig.getPreviewCostTableRowHeaders();
    for (let service1 of this.serviceList.controls) {
      const code = service1.get('coe').value;
      if (!!code) {
        const coeObj = this.getCoeByCode(code);
        let coe = {};
        coe['code'] = code;
        coe['name'] = coeObj.name;
        this.selectedServices.push(coe);
      }
    }

    this.updateTermsAndConditionList();
    this.open(modal);

  }

  updateTermsAndConditionList() {
    const terms = [];
    this.termsList = [];
    if (this.serviceList.controls.length > 0) {
      this.currentForm.serviceDetails = [];
      for (const service1 of this.serviceList.controls) {
        const value = service1.get('endPoint').value;
        const filterItem = terms.filter(item => item === value);
        if (!filterItem || filterItem.length <= 0) {
          terms.push(value);
        }
      }
    }

    const conditionList: any = this.termsAndConditions;

    if (terms.length > 0 && !!conditionList && conditionList.length > 0) {
      for (const term of terms) {
        const conditions = conditionList.filter(item => item.code === term);
        if (!!conditions && conditions.length > 0) {
          this.termsList.push(conditions[0]);
        }
      }
    }


    if (!this.termsList || this.termsList.length <= 0) {
      const conditions = conditionList.filter(item => item.code === 'GENERAL');
      this.termsList.push(conditions[0]);
    }
  }


  open(modal) {
    this.modalService.open(modal, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getTermsAndConditions() {
    this.serviceProvider.getTermsAndConditions().subscribe(
      result => {
        if (!!result) {
          this.termsAndConditions = result;
        }
      },
      err => {

      },
      () => {

      }
    );
  }

  editTermsAndCondition(index: number) {
    this.termsAndConditionForm = this.formBuilder.group({
      termsAndCondition: ['', Validators.required]
    });
    this.selectTermsAndConditionIndex = index;
    this.editorContent = this.termsList[index].termsAndCondition;
    this.editTermsAndConditionsClicked = true;
  }

  onEditorBlured(quill) {
    console.log('editor blur!', quill);
  }

  onEditorFocused(quill) {
    console.log('editor focus!', quill);
  }

  onEditorCreated(quill) {
    this.editor = quill;
    console.log('quill is ready! this is current quill instance object', quill);
  }

  onContentChanged({ quill, html, text }) {
    console.log('quill content is changed!', quill, html, text);
  }

  saveTermsAndConditions() {
    const obj: models.TermsAndConditionModel = this.termsList[this.selectTermsAndConditionIndex];
    obj.termsAndCondition = this.termsAndConditionForm.get('termsAndCondition').value;

    // this.termsAndConditions.termsAndCondition = this.termsAndConditionForm.get('termsAndCondition').value;
    this.termsAndConditions.createdBy = localStorage.getItem('current_user');
    this.serviceProvider.updateTermsAndCondition(obj).subscribe(
      result => {
        if (!!result) {
          this.termsAndConditionForm.get('termsAndCondition').setValue('');
          this.editor = {};
          this.editorContent = '';
          this.editorOptions = {
            placeholder: ''
          };
          this.editTermsAndConditionsClicked = false;
          this.getTermsAndConditions();
        }
      },
      err => {

      },
      () => {

      }
    );
  }

  closeTermAndCondition() {

    this.editorContent = '';

    this.editTermsAndConditionsClicked = false;
  }

  setFormFields(formDetail: models.FormDetailModel) {

    this.isNbie = formDetail.nbie;
    this.selectedRegions = formDetail.formRegions;
    const detailFormControls = EstimatorConfig.getDetailFormControls();
    for (const control of detailFormControls) {
      this.detailsForm.get(control).setValue(formDetail[control]);
    }

    if (!!formDetail.datePrepared) {
      const dateArr = formDetail.datePrepared.split('-');
      this.datePreparedModel = { date: { year: dateArr[2], month: dateArr[1], day: dateArr[0] } };
      this.datePreparedValue = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
    }
    if (!!formDetail.validTo) {
      const dateArr = formDetail.validTo.split('-');
      this.validToModel = { date: { year: dateArr[2], month: dateArr[1], day: dateArr[0] } };
      this.validToValue = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
    }

    // if (this.userType !== this.requestor) {
    const estimatorFormControls = EstimatorConfig.getEstimatorControls();
    if (!formDetail['estimatorDetails']) {
      formDetail['estimatorDetails'] = {};
    }
    for (const control of estimatorFormControls) {
      this.estimatorForm.get(control).setValue(formDetail['estimatorDetails'][control]);
    }
    // }



    if (!!formDetail.serviceDetails && formDetail.serviceDetails.length > 0) {
      let serviceCount = 0;
      for (const serviceDetail of formDetail.serviceDetails) {
        if (serviceCount !== 0) {
          this.addService();
        }
        serviceCount++;
      }

      const serviceListControls = EstimatorConfig.getServiceControls();
      let serviceIndex = 0;
      const serviceListcon = this.serviceList.controls;
      debugger
      for (let service of serviceListcon) {
        console.log(serviceIndex);
        for (const control of serviceListControls) {

          const value = formDetail.serviceDetails[serviceIndex][control];
          if (!!service.get(control)) {
            service.get(control).setValue(value);
          }
          // if (control === 'coe') {
          //   if (value === 'END_POINT') {
          //     this.endPointSelected[serviceIndex] = true;
          //   } else {
          //     this.endPointSelected[serviceIndex] = false;
          //   }
          // }
        }
        serviceIndex++;
      }
    }

    // this.runEstimate();

    if (!!formDetail.estimatorDetails) {
      const estimatorValues = formDetail.estimatorDetails;
      if (!!estimatorValues.b5Cost) {
        this.estimatorForm.get('b5Cost').setValue(estimatorValues.b5Cost.toFixed(2));
      }

      if (!!estimatorValues.b7Cost) {
        this.estimatorForm.get('b7Cost').setValue(estimatorValues.b7Cost.toFixed(2));
      }

      if (estimatorValues.totalCost) {
        this.estimatorForm.get('totalCost').setValue(estimatorValues.totalCost.toFixed(2));
      }
    }

  }



  resetFormFields() {
    this.detailsFormSubmitted = false;
    // this.estimatorForm.reset();
    // this.serverForm.reset();
    // this.workstationForm.reset();
    this.detailsForm.reset();

    this.getNextFormId();
    this.detailsForm.get('requestorName').setValue(localStorage.getItem('current_user_name'));
    this.detailsForm.get('requestorId').setValue(localStorage.getItem('current_user'));
    const status = EstimatorConfig.getFormStatusbyId(EstimatorConfig.STATUS_NEW);
    if (!!status) {
      this.detailsForm.get('formStatus').setValue(status.value);
      this.detailsForm.get('formStatusId').setValue(EstimatorConfig.STATUS_NEW);
    }

    const currentDate = moment().toDate();
    const dateStr = this.datePipe.transform(currentDate, 'dd-MM-yyyy');
    let dateArr = dateStr.split('-');
    this.datePreparedModel = { date: { year: dateArr[2], month: dateArr[1], day: dateArr[0] } };
    this.validToModel = { date: { year: dateArr[2], month: dateArr[1], day: dateArr[0] } };

  }

  runEstimate() {

    this.band5Cost = 0;
    this.band7Cost = 0;
    this.band7OnCallCost = 0;
    this.hours = 0;
    this.band5 = 0;
    this.band7 = 0;
    this.band5Hours = 0;
    this.band7Hours = 0;
    this.band7OnCallHours = 0;

    if (!!this.serviceList.controls) {
      for (const control of this.serviceList.controls) {
        const selectedServiceWindow = control.get('serviceWindow').value;
        const serviceWindow = this.getServiceWindowValue(selectedServiceWindow);
        const serviceScope = control.get('serviceScope').value;
        const supportValue = this.getSupportOperationValues(serviceScope + '_' + serviceWindow);
        const consoles = control.get('noOfConsoles').value;
        const servers = control.get('noOfServers').value;

        this.calculateEstimation(supportValue, consoles, servers, serviceScope, selectedServiceWindow);
      }
    }
  }

  calculateEstimation(supportValue: any, consoles: number, servers: number, serviceScope: string, selectedServiceWindow: string) {
    const constantValue = supportValue.constant;
    const onCallValue = supportValue.onCall;



    let fteValue = 0;
    let band5Value = 0;
    let band7Value = 0;
    if (serviceScope === 'SERVER') {

      if (servers > 0 && servers <= constantValue) {
        if (selectedServiceWindow === EstimatorConfig.SERVICE_WINDOW_8_5
          || selectedServiceWindow === EstimatorConfig.SERVICE_WINDOW_8_5_ON_CALL) {

          fteValue = 2;
          band5Value = 1;
          band7Value = 1;

        } else if (selectedServiceWindow === EstimatorConfig.SERVICE_WINDOW_16_5
          || selectedServiceWindow === EstimatorConfig.SERVICE_WINDOW_16_5_ON_CALL) {

          fteValue = 3;
          band5Value = 1;
          band7Value = 2;

        } else if (selectedServiceWindow === EstimatorConfig.SERVICE_WINDOW_24_7) {
          fteValue = 6;
          band5Value = 2;
          band7Value = 4;
        }
      } else if (servers > constantValue) {
        const temp = (servers / 1200) - 3;
        fteValue = constantValue + 0.80 + temp;
        band7Value = 0.6 * Math.round(fteValue);
        band5Value = Math.round(fteValue) - Math.round(band7Value);

      }
    } else if (serviceScope === 'WORKSTATION') {
      if (consoles > 0 && consoles <= constantValue) {
        if (selectedServiceWindow === EstimatorConfig.SERVICE_WINDOW_8_5) {

          fteValue = 2;
          band5Value = 1;
          band7Value = 1;

        } else if (selectedServiceWindow === EstimatorConfig.SERVICE_WINDOW_8_5_ON_CALL) {

          fteValue = 2;
          band5Value = 0;
          band7Value = 2;

        } else if (selectedServiceWindow === EstimatorConfig.SERVICE_WINDOW_16_5
          || selectedServiceWindow === EstimatorConfig.SERVICE_WINDOW_16_5_ON_CALL) {

          fteValue = 3;
          band5Value = 1;
          band7Value = 2;

        } else if (selectedServiceWindow === EstimatorConfig.SERVICE_WINDOW_24_7) {
          fteValue = 6;
          band5Value = 2;
          band7Value = 4;
        }
      } else if (consoles > constantValue) {
        const temp = (consoles / 12000) - 3;
        fteValue = constantValue + 0.80 + temp;
        band7Value = 0.6 * Math.round(fteValue);
        band5Value = Math.round(fteValue) - Math.round(band7Value);

      }
    }

    const hoursValue = fteValue * EstimatorConfig.HOURS_CONSTANT;
    this.band5 = this.band5 + band5Value;
    this.band7 = this.band7 + band7Value;

    this.hours = this.hours + hoursValue;
    this.band5Cost = this.band5 * EstimatorConfig.BAND_5_USD;
    this.band7Cost = this.band7 * EstimatorConfig.BAND_7_USD;
    this.band7OnCallCost = onCallValue * EstimatorConfig.BAND_7_USD;
    this

    this.band5Hours = this.band5Hours + (band5Value * hoursValue);
    this.band7Hours = this.band7Hours + (band7Value * hoursValue);
    this.band7OnCallHours = this.band7OnCallHours + (onCallValue * hoursValue);


    this.estimatorForm.get('b5Ssb').setValue(this.band5.toFixed(2));
    this.estimatorForm.get('b7Ssb').setValue(this.band7.toFixed(2));
    this.estimatorForm.get('b7OnCallSsb').setValue(onCallValue.toFixed(2));
    this.estimatorForm.get('totalSsb').setValue((this.band5 + this.band7 + onCallValue).toFixed(2));

    this.estimatorForm.get('b5Hour').setValue(this.band5Hours);
    this.estimatorForm.get('b7Hour').setValue(this.band7Hours);
    this.estimatorForm.get('b7OnCallHour').setValue(this.band7OnCallHours);
    this.estimatorForm.get('totalHour').setValue((this.band5Hours + this.band7Hours + this.band7OnCallHours));
    // this.estimatorForm.get('b7OnCallHour').setValue(this.band7 * EstimatorConfig.HOURS_CONSTANT);

    this.estimatorForm.get('b5Cost').setValue(this.band5Cost.toFixed(2));
    this.estimatorForm.get('b7Cost').setValue(this.band7Cost.toFixed(2));
    this.estimatorForm.get('b7OnCallCost').setValue(this.band7OnCallCost.toFixed(2));
    this.estimatorForm.get('totalCost').setValue((this.band5Cost + this.band7Cost + this.band7OnCallCost).toFixed(2));
  }

  getServiceWindowValue(key: string) {
    const operation = this.serviceOperations.filter(item => key === item.code);
    if (!!operation && operation.length > 0) {
      return operation[0].name;
    }
  }

  getSupportOperationValues(key: string) {
    return this.supportDetails[key];
  }

  coeChanged(index: number) {
    debugger
    console.log(this.serviceList.controls[index].get('coe').value);

    this.endPointSelected[index] = !!this.serviceList.controls[index].get('coe').value;

    if (!this.endPointSelected[index]) {
      this.serviceList.controls[index].get('endPoint').setValue('');
      this.serviceList.controls[index].get('serviceWindow').setValue('');
      this.serviceList.controls[index].get('serviceScope').setValue('');
      this.serviceList.controls[index].get('vendor').setValue('');
      this.serviceList.controls[index].get('noOfServers').setValue('');
      this.serviceList.controls[index].get('noOfConsoles').setValue('');
      this.serviceList.controls[index].get('contractType').setValue('');
      this.serviceList.controls[index].get('contractDuration').setValue('');
      this.serviceList.controls[index].get('onCallText').setValue('');
      this.serviceList.controls[index].get('b7Text').setValue('');
      this.serviceList.controls[index].get('b5Text').setValue('');
      this.serviceList.controls[index].get('b6aText').setValue('');
      this.serviceList.controls[index].get('b6bText').setValue('');
      this.serviceList.controls[index].get('b8Text').setValue('');
      this.serviceList.controls[index].get('fteText').setValue('');
      this.serviceList.controls[index].get('travel').setValue(0);

    } else {
      const coe = this.serviceList.controls[index].get('coe').value;
      this.serviceProvider.getList('/setting/service-map?c=' + coe + '&t=&s=').subscribe(
        result => {
          if (!!result) {
            this.filterEndpointList = [];
            this.filterServiceScopes = [];
            this.filterVendorList = [];
            let resultArr: any = result;
            for (let res of resultArr) {
              let isEndpointAvail = this.filterEndpointList.find(e => e.code === res['technology']);
              let isScopeAvail = this.filterServiceScopes.find(e => e.code === res['scope']);
              let isVendorAvail = this.filterVendorList.find(e => e.id === res['vendor']);

              if (!isEndpointAvail && !!res['technology']) {
                this.filterEndpointList.push(this.endpointList.find(e => res['technology'] === e.code));
              }

              if (!isScopeAvail && !!res['scope']) {
                this.filterServiceScopes.push(this.serviceScopes.find(e => res['scope'] === e.code));
              }

              if (!isVendorAvail && !!res['vendor']) {
                this.filterVendorList.push(this.vendorList.find(e => res['vendor'] === e.id));
              }
            }
          }
        },
        err => {

        }
      );
    }
  }

  endPointChanged(index: number) {
    const coe = this.serviceList.controls[index].get('coe').value;
    const endpoint = this.serviceList.controls[index].get('endPoint').value;
    if (!!coe && !!endpoint) {
      this.serviceProvider.getList('/setting/service-map?c=' + coe + '&t=' + endpoint + '&s=').subscribe(
        result => {
          if (!!result) {
            this.filterServiceScopes = [];
            this.filterVendorList = [];
            let resultArr: any = result;
            for (let res of resultArr) {
              let isScopeAvail = this.filterServiceScopes.find(e => e.code === res['scope']);
              let isVendorAvail = this.filterVendorList.find(e => e.id === res['vendor']);

              if (!isScopeAvail && !!res['scope']) {
                this.filterServiceScopes.push(this.serviceScopes.find(e => res['scope'] === e.code));
              }

              if (!isVendorAvail && !!res['vendor']) {
                this.filterVendorList.push(this.vendorList.find(e => res['vendor'] === e.id));
              }
            }
          }
        },
        err => {

        }
      );
    }
  }

  scopeChanged(index: number) {
    const coe = this.serviceList.controls[index].get('coe').value;
    const endpoint = this.serviceList.controls[index].get('endPoint').value;
    const scope = this.serviceList.controls[index].get('serviceScope').value;
    if (!!coe && !!endpoint && !!scope) {
      this.serviceProvider.getList('/setting/service-map?c=' + coe + '&t=' + endpoint + '&s=' + scope).subscribe(
        result => {
          if (!!result) {
            this.filterVendorList = [];
            let resultArr: any = result;
            for (let res of resultArr) {
              let isVendorAvail = this.filterVendorList.find(e => e.id === res['vendor']);

              if (!isVendorAvail && !!res['vendor']) {
                this.filterVendorList.push(this.vendorList.find(e => res['vendor'] === e.id));
              }
            }
          }
        },
        err => {

        }
      );
    }
  }


  nbieSelected(event) {

    this.isNbie = event;
    this.updateFormControl(event);
    const currentDate = moment().toDate();
    const dateStr = this.datePipe.transform(currentDate, 'dd-MM-yyyy');
    let dateArr = dateStr.split('-');
    this.datePreparedModel = { date: { year: dateArr[2], month: dateArr[1], day: dateArr[0] } };
    this.validToModel = { date: { year: dateArr[2], month: dateArr[1], day: dateArr[0] } };
  }

  updateFormControl(isNbie: boolean) {

    this.detailsForm.removeControl('riskRating');
    this.detailsForm.removeControl('datePrepared');
    this.detailsForm.removeControl('validTo');
    this.detailsForm.removeControl('salesConnectNo');
    this.detailsForm.removeControl('rfsNo');
    // this.detailsForm.removeControl('region');
    this.detailsForm.removeControl('customerName');
    this.detailsForm.removeControl('deliveryLocation');
    this.detailsForm.removeControl('customerId');
    this.detailsForm.removeControl('salesId');
    this.detailsForm.removeControl('custom');
    this.detailsForm.removeControl('deal');

    if (isNbie === true) {
      this.detailsForm.addControl('riskRating', new FormControl(''));
      this.detailsForm.addControl('deal', new FormControl(''));
      this.detailsForm.addControl('datePrepared', new FormControl(''));
      this.detailsForm.addControl('validTo', new FormControl(''));
      this.detailsForm.addControl('salesConnectNo', new FormControl(''));
      this.detailsForm.addControl('rfsNo', new FormControl(''));
      // this.detailsForm.addControl('region', new FormControl(''));
      this.detailsForm.addControl('customerName', new FormControl(''));
      this.detailsForm.addControl('deliveryLocation', new FormControl(''));
      this.detailsForm.addControl('customerId', new FormControl(''));
      this.detailsForm.addControl('salesId', new FormControl(''));
      this.detailsForm.addControl('custom', new FormControl(''));

    } else {
      this.detailsForm.addControl('riskRating', new FormControl('', Validators.required));
      this.detailsForm.addControl('deal', new FormControl(''));
      this.detailsForm.addControl('datePrepared', new FormControl('', Validators.required));
      this.detailsForm.addControl('validTo', new FormControl('', Validators.required));
      if (this.userType === this.requestor) {
        this.detailsForm.addControl('salesConnectNo', new FormControl(''));
      } else {
        this.detailsForm.addControl('salesConnectNo', new FormControl('', Validators.required));
      }
      this.detailsForm.addControl('rfsNo', new FormControl('', Validators.required));
      // this.detailsForm.addControl('region', new FormControl('', Validators.required));
      this.detailsForm.addControl('customerName', new FormControl('', Validators.required));
      this.detailsForm.addControl('deliveryLocation', new FormControl('', Validators.required));
      this.detailsForm.addControl('customerId', new FormControl('', Validators.required));
      this.detailsForm.addControl('salesId', new FormControl('', Validators.required));
      this.detailsForm.addControl('custom', new FormControl('', Validators.required));
    }
  }

  selectFile(event) {

    this.currentFileUpload = event.target.files[0];
    // let file = event.target.files[0];

    // const fileName = this.detailsForm.get('documentName').value;
    // file['documentName'] = !!fileName ? fileName : file['name'];

    // if (!this.selectedFiles || this.selectedFiles.length <= 0) {
    //   this.selectedFiles = [];

    //   this.selectedFiles[0] = file;
    // } else {
    //   this.selectedFiles.push(file);
    // }

  }

  upload() {

    let fileName = this.detailsForm.get('documentName').value;
    const comment = this.detailsForm.get('documentComment').value;
    fileName = !!fileName ? fileName : this.currentFileUpload['name'];
    this.currentFileUpload['fileName'] = fileName;
    this.currentFileUpload['comment'] = comment;
    this.currentFileUpload['isNew'] = true;
    if (!!this.currentForm && !!this.currentForm.id) {

      this.serviceProvider.uploadDocument(this.currentFileUpload, this.currentForm.formId, localStorage.getItem('current_user'), fileName, comment).subscribe(event => {
        this.myInputVariable.nativeElement.value = '';
      });
    }

    this.myInputVariable.nativeElement.value = '';
    this.detailsForm.get('documentName').setValue('');
    this.detailsForm.get('documentComment').setValue('');
    let document: models.DocumentModel = {};
    document.comment = comment;
    document.fileName = fileName;
    if (!this.documentList || this.documentList.length <= 0) {
      this.documentList = [];

    }
    this.documentList.push(document);
    if (!this.selectedFiles || this.selectedFiles.length <= 0) {
      this.selectedFiles = [];

      this.selectedFiles[0] = this.currentFileUpload;
    } else {
      this.selectedFiles.push(this.currentFileUpload);
    }
  }

  agreeClicked() {

    this.isAgreed = !this.isAgreed;
  }

  showDisclaimer(modal) {
    this.open(modal);
  }

  deleteDocument(index: number) {
    if (!!this.documentList[index] && !!this.documentList[index]['id']) {
      this.serviceProvider.deleteDocumentById(this.documentList[index]['id']).subscribe(
        result => {
          if (!!result && result) {
            Swal.fire('Info', 'Document Deleted Successfully', 'info');
          }
        },
        err => {

        },
        () => {

        }
      );
    }

    this.documentList.splice(index, 1);
  }

  calcClicked(selectedIndex: number) {
    debugger
    console.log("the number is" + selectedIndex)
    if (!!this.serviceList.controls) {
      for (const control of this.serviceList.controls) {
        const selectedServiceWindow1 = control.get('endPoint').value;
        const selectedServiceWindow = control.get('serviceWindow').value;
        const serviceWindow = this.getServiceWindowValue(selectedServiceWindow);
        const serviceScope = control.get('serviceScope').value;
        const supportValue = this.getSupportOperationValues(serviceScope + '_' + serviceWindow);
        const consoles = control.get('noOfConsoles').value;
        const servers = control.get('noOfServers').value;
        const coe = control.get('coe').value;
        console.log("selectedServiceWindow" + selectedServiceWindow)
        console.log("selectedServiceWindow1" + selectedServiceWindow1)
        console.log("serviceWindow" + serviceWindow)
        console.log("serviceScope" + serviceScope)
        console.log("supportValue" + supportValue)
        console.log("consoles" + consoles)
        console.log("servers" + servers)
        console.log("coe" + coe)
        console.log("formId" + this.selectedFormId)
        this.serviceProvider.serviceCalculation(coe, selectedServiceWindow1, serviceScope, serviceWindow, servers, consoles).subscribe(
          result => {
            console.log("result" + result)
            // this.estimatorForm.get('b5Ssb').setValue(this.band5.toFixed(2));
            this.fte = result[0]
            this.band5 = result[1]
            this.band7 = result[2]
            this.band7OnCallCost = result[3]
            this.serviceList.controls[selectedIndex].get('fteText').setValue(this.fte);
            this.serviceList.controls[selectedIndex].get('b5Text').setValue(this.band5);
            this.serviceList.controls[selectedIndex].get('b7Text').setValue(this.band7);
            this.serviceList.controls[selectedIndex].get('b6aText').setValue('0');
            this.serviceList.controls[selectedIndex].get('b6bText').setValue('0');
            this.serviceList.controls[selectedIndex].get('b8Text').setValue('0');
            this.serviceList.controls[selectedIndex].get('onCallText').setValue(this.band7OnCallCost)
            /*this.dataSource.data = result;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;*/
          },
          err => {
            if (err.status === 500) {
              err.statusText = 'Server is not reachable. Please try again later.'
              Swal.fire('Info', err.statusText, 'warning');
            } else if (err.status === 0) {
              err.statusText = 'Internal server error occured. Please try again later.'
              Swal.fire('Info', err.statusText, 'warning');
            } else {
              Swal.fire('Info', err.statusText, 'warning');
            }
          }, () => {
          });
      }
    }

  }

}
