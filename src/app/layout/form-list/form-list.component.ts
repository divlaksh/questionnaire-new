import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AppConfig } from '../../app.config';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { ServiceProvider } from '../../shared/services/service-provider';
import * as models from '../../shared/models';
import { EstimatorConfig } from '../../layout/estimator/estimator.config';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {

  page: any;
  public formList: models.FormDetailModel[];
  public userType: string = '';
  userSubscription: Subscription;
  public isPendingListPage: boolean = false;
  approverType: string = AppConfig.APPROVER_TYPE;
  tsaType: string = AppConfig.TSA_TYPE;
  requestorType: string = AppConfig.REQUESTOR_TYPE;

  isFormList: boolean = false;
  isPendingList: boolean = false;
  isApprovedList: boolean = false;
  isRejectedList: boolean = false;
  isMyList: boolean = false;
  isCompletedList: boolean = false;
  isView: string = 'false';

  commentList: models.CommentsModel = {};


  selectedFormId: string;
  selectedFormIndex: number;

  closeResult: string;

  commentForm: FormGroup;
  commentModel: models.CommentsModel = {};

  modalReference: any;
  modalAction: string;
  userLevel: string;
  isGbsUser: boolean;
  showStatusDropDown: boolean = false;
  commentStatusSelected: boolean = false;

  constructor(private serviceProvider: ServiceProvider, private _Activatedroute: ActivatedRoute,
    private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.userType = localStorage.getItem('user_type');
    this.userLevel = localStorage.getItem('user_level');
    const val = localStorage.getItem('is_gbs_approver');
    if (!!val && val === 'true') {
      this.isGbsUser = true;
    }

    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required],
      remark: ['']
    });
  }

  ngOnInit() {


    this.userSubscription = this._Activatedroute.params.subscribe(
      (params: Params) => {
        debugger
        if (!!params) {
          if (!!params['isFormList'] && params['isFormList'] === 'true') {
            this.setAction(true, false, false, false, false, false);
            this.getFormListItems();
          } else if (!!params['isPendingList'] && params['isPendingList'] === 'true') {
            this.setAction(false, true, false, false, false, false);
            this.getFormListItems();
          } else if (!!params['isMyList'] && params['isMyList'] === 'true') {
            this.setAction(false, false, false, false, true, false);
            this.getFormListItems();
          } else if (!!params['isRejectedList'] && params['isRejectedList'] === 'true') {
            this.setAction(false, false, false, true, false, false);
            this.getFormListItems();
          } else if (!!params['isApprovedList'] && params['isApprovedList'] === 'true') {
            this.setAction(false, false, true, false, false, false);
            this.getFormListItems();
          } else if (!!params['isCompletedList'] && params['isCompletedList'] === 'true') {
            this.setAction(false, false, false, false, false, true);
            this.getFormListItems();
          }
        }

        // if (!!params && !!params['showPendingList'] && params['showPendingList'] === 'true') {
        //   this.isPendingListPage = true;
        //   this.getPendingFormList();
        // } else {
        //   if (this.userType === this.tsaType) {
        //     this.getFormList(EstimatorConfig.STATUS_NEW);
        //   } else {
        //     this.isPendingListPage = false;
        //     this.getRequstorFormList();
        //   }
        // }
      });
  }

  getFormListItems() {
    this.isView = 'true';
    if (this.isFormList) {
      if (this.userType === this.requestorType) {
        this.getRequstorFormList();
      } else if (this.userType === this.tsaType) {
        let statusArray: any = [];
        statusArray.push(EstimatorConfig.STATUS_NEW);
        statusArray.push(EstimatorConfig.STATUS_REJECTED);
        this.getFormList(statusArray);
      } else {
        this.getFormList(EstimatorConfig.STATUS_PENDING_APPROVAL);
      }
    } else if (this.isPendingList) {

      if (!!this.userLevel && this.userLevel === '2' && this.userType === this.approverType) {
        if (this.isGbsUser) {
          this.getSecondLevelApproverGbsFormList(EstimatorConfig.STATUS_PENDING_APPROVAL);
        } else {
          this.getSecondLevelApproverFormList(EstimatorConfig.STATUS_PENDING_APPROVAL);
        }
      } else if (!!this.userLevel && this.userLevel === '3' && this.userType === this.approverType) {
        this.getThirdLevelApproverFormList(EstimatorConfig.STATUS_PENDING_APPROVAL);
      } else if (this.userType === this.approverType) {
        this.getApproverFormList(EstimatorConfig.STATUS_PENDING_APPROVAL);
      } else if (this.userType === this.tsaType) {
        this.isView = 'false';
        let statusArray: any = [];
        statusArray.push(EstimatorConfig.STATUS_ACCEPTED);
        statusArray.push(EstimatorConfig.STATUS_REVISE);
        this.getFormsByTsaAndStatus(statusArray);
      }

    } else if (this.isMyList) {
      this.isView = 'true';
      if (this.userType === this.approverType) {
        this.getFormsByApprover();
      } else if (this.userType === this.tsaType) {
        this.getFormsByTsa();
      }
    } else if (this.isRejectedList) {
      if (this.userType === this.tsaType) {
        this.isView = 'false';
        this.getFormsByTsaAndStatus(EstimatorConfig.STATUS_REJECTED);
      }
    } else if (this.isApprovedList) {
      if (this.userType === this.requestorType) {
        this.getRequstorFormByStatusList(EstimatorConfig.STATUS_APPROVED);
      }
    } else if (this.isCompletedList) {
      if (this.userType === this.requestorType) {
        this.getRequstorFormByStatusList(EstimatorConfig.STATUS_COMPLETED);
      }
    }
  }

  /**
   * set action to determine which list page selected
   * 
   * @param isFormList
   * @param isPendingList 
   * @param isApprovedList 
   * @param isRejectedList 
   */
  setAction(isFormList: boolean, isPendingList: boolean, isApprovedList: boolean, isRejectedList: boolean, isMyList: boolean,
    isCompletedList: boolean) {
    this.isFormList = isFormList;
    this.isPendingList = isPendingList;
    this.isApprovedList = isApprovedList;
    this.isRejectedList = isRejectedList;
    this.isMyList = isMyList;
    this.isCompletedList = isCompletedList;

  }

  getFormList(status: string) {
    this.serviceProvider.getFormListByStatus(status).subscribe(
      (result: models.FormDetailModel[]) => {
        if (!!result) {
          this.formList = result;
        }
      },
      err => {

      },
      () => {

      }
    );

  }

  refresh() {
    if (this.userType === this.tsaType) {
      this.getFormList(EstimatorConfig.STATUS_NEW);
    } else if (this.userType === this.approverType) {
      this.getFormList(EstimatorConfig.STATUS_PENDING_APPROVAL);
    }
  }

  // getTsaFormList(status: string) {
  //   this.serviceProvider.getTsaFormList(localStorage.getItem('current_user'), status).subscribe(
  //     (result: models.FormDetailModel[]) => {
  //       if (!!result) {
  //         this.formList = result;
  //       }
  //     },
  //     err => {

  //     },
  //     () => {

  //     }
  //   );
  // }

  getSecondLevelApproverFormList(status: string) {
    this.serviceProvider.getSecondLevelApproverFormList(status).subscribe(
      (result: models.FormDetailModel[]) => {
        if (!!result) {
          this.formList = result;
        }
      },
      err => {
        console.log('Error occured while fetching data for getSecondLevelApproverFormList()');
      }
    );
  }

  getSecondLevelApproverGbsFormList(status: string) {
    this.serviceProvider.getSecondLevelApproverGbsFormList(status).subscribe(
      (result: models.FormDetailModel[]) => {
        if (!!result) {
          this.formList = result;
        }
      },
      err => {
        console.log('Error occured while fetching data for getSecondLevelApproverGbsFormList()');
      }
    );
  }

  getThirdLevelApproverFormList(status: string) {
    this.serviceProvider.getThirdLevelApproverFormList(localStorage.getItem('current_user'), status).subscribe(
      (result: models.FormDetailModel[]) => {
        if (!!result) {
          this.formList = result;
        }
      },
      err => {
        console.log('Error occured while fetching data for getThirdLevelApproverFormList()');
      }
    );
  }

  getApproverFormList(status: string) {
    this.serviceProvider.getApproverFormList(localStorage.getItem('current_user'), status).subscribe(
      (result: models.FormDetailModel[]) => {
        debugger
        if (!!result) {
          this.formList = result;
        }
      },
      err => {

      },
      () => {

      }
    );
  }

  getFormsByApprover() {
    this.serviceProvider.getFormsByApprover(localStorage.getItem('current_user')).subscribe(
      (result: models.FormDetailModel[]) => {
        debugger
        if (!!result) {
          this.formList = result;
        }
      },
      err => {

      },
      () => {

      }
    );
  }

  getFormsByTsa() {
    this.serviceProvider.getFormsByTsa(localStorage.getItem('current_user')).subscribe(
      (result: models.FormDetailModel[]) => {
        debugger
        if (!!result) {
          this.formList = result;
        }
      },
      err => {

      },
      () => {

      }
    );
  }

  getFormsByTsaAndStatus(status: string) {
    this.serviceProvider.getFormsByTsaAndStatus(localStorage.getItem('current_user'), status).subscribe(
      (result: models.FormDetailModel[]) => {
        debugger
        if (!!result) {
          this.formList = result;
        }
      },
      err => {

      },
      () => {

      }
    );
  }

  getRequstorFormList() {
    this.serviceProvider.getRequestorFormList(localStorage.getItem('current_user')).subscribe(
      (result: models.FormDetailModel[]) => {
        if (!!result) {
          this.formList = result;
        }
      },
      err => {

      },
      () => {

      }
    );
  }

  getRequstorFormByStatusList(status: string) {
    this.serviceProvider.getFormsByRequestorAndStatus(localStorage.getItem('current_user'), status).subscribe(
      (result: models.FormDetailModel[]) => {
        if (!!result) {
          this.formList = result;
        }
      },
      err => {

      },
      () => {

      }
    );
  }


  acceptForm(formId: string, index: number) {
    this.serviceProvider.acceptForm(localStorage.getItem('current_user'), formId).subscribe(
      result => {
        if (!!result && result) {
          Swal.fire('Confirmation', 'Accepted', 'success');
          this.formList.splice(index, 1);
        } else {
          Swal.fire('Info', 'Unable to process it. Please click on refresh and try again.', 'error');
        }
      },
      err => {
        Swal.fire('Info', 'Unable to process it. Please click on refresh and try again.', 'error');
      },
      () => {

      }
    );
  }

  acceptPendingApprovalForm(formId: string, index: number) {
    this.serviceProvider.acceptPendingApprovalForm(localStorage.getItem('current_user'), formId).subscribe(
      result => {
        if (!!result && result) {
          Swal.fire('Confirmation', 'Accepted', 'success');
          this.formList.splice(index, 1);
        } else {
          Swal.fire('Info', 'Unable to process it. Please click on refresh and try again.', 'error');
        }
      },
      err => {
        Swal.fire('Info', 'Unable to process it. Please click on refresh and try again.', 'error');
      },
      () => {

      }
    );
  }

  approveForm(formId: string, index: number) {
    debugger
    const userLevel = localStorage.getItem('user_level');
    if (!!userLevel) {
      this.serviceProvider.approveSecondAndThirdLevel(localStorage.getItem('current_user'), formId, userLevel).subscribe(
        result => {
          if (!!result && result) {
            Swal.fire('Confirmation', 'Approved', 'success');
            this.formList.splice(index, 1);
          } else {
            Swal.fire('Info', 'Failed to Approve', 'error');
          }
        },
        err => {
          Swal.fire('Info', 'Failed to Approve', 'error');
        },
        () => {

        }
      );
    } else {
      this.serviceProvider.approveForm(localStorage.getItem('current_user'), formId).subscribe(
        result => {
          if (!!result && result) {
            Swal.fire('Confirmation', 'Approved', 'success');
            this.formList.splice(index, 1);
          } else {
            Swal.fire('Info', 'Failed to Approve', 'error');
          }
        },
        err => {
          Swal.fire('Info', 'Failed to Approve', 'error');
        },
        () => {

        }
      );
    }

  }

  rejectConfirm() {
    this.commentModel.comment = this.commentForm.get('comment').value;
    this.commentModel.status = EstimatorConfig.STATUS_REJECTED;
    this.commentModel.formId = this.selectedFormId;
    this.commentModel.userId = localStorage.getItem('current_user');
    this.commentModel.userLevel = localStorage.getItem('user_level');

    this.serviceProvider.rejectForm(this.commentModel).subscribe(
      result => {
        if (!!result && result) {
          this.modalReference.close();
          Swal.fire('Confirmation', 'Form haas been rejected.', 'success');
          this.formList.splice(this.selectedFormIndex, 1);

        } else {
          Swal.fire('Info', 'Failed to Reject', 'error');
        }
      },
      err => {
        Swal.fire('Info', 'Failed to Reject', 'error');
      },
      () => {

      }
    );
  }

  reviseConfirm() {
    this.commentModel.comment = this.commentForm.get('comment').value;
    this.commentModel.status = EstimatorConfig.STATUS_REVISE;
    this.commentModel.formId = this.selectedFormId;
    this.commentModel.userId = localStorage.getItem('current_user');

    this.serviceProvider.reviseForm(this.commentModel).subscribe(
      result => {
        if (!!result && result) {
          Swal.fire('Confirmation', 'Form has been sent for revise', 'success');
          this.formList.splice(this.selectedFormIndex, 1);
        } else {
          Swal.fire('Info', 'Failed to send for revise. Please try again later', 'error');
        }
      },
      err => {
        Swal.fire('Info', 'Failed to send for revise. Please try again later', 'error');
      },
      () => {

      }
    );
  }

  completeConfirm() {
    this.commentModel.comment = this.commentForm.get('comment').value;
    this.commentModel.remark = this.commentForm.get('remark').value;
    this.commentModel.status = EstimatorConfig.STATUS_COMPLETED;
    this.commentModel.formId = this.selectedFormId;
    this.commentModel.userId = localStorage.getItem('current_user');

    this.serviceProvider.completeForm(this.commentModel).subscribe(
      result => {
        if (!!result && result) {
          this.modalService.dismissAll();
          Swal.fire('Confirmation', 'Form updated as Completed', 'success');
          this.formList.splice(this.selectedFormIndex, 1);
        } else {
          Swal.fire('Info', 'Failed to update', 'error');
        }
      },
      err => {
        Swal.fire('Info', 'Failed to updated', 'error');
      },
      () => {

      }
    );
  }

  confirmAction() {
    if (this.modalAction === 'reject') {
      this.rejectConfirm();
    } else if (this.modalAction === 'revise') {
      this.reviseConfirm();
    } else if (this.modalAction === 'complete') {
      this.completeConfirm();
    }
  }

  rejectModal(modal, formId: string, index: number) {
    this.modalAction = 'reject';
    this.commentList = {};
    this.getCommentsList(formId, EstimatorConfig.STATUS_REJECTED);
    this.selectedFormId = formId;
    this.selectedFormIndex = index;

    this.modalReference = this.modalService.open(modal, { size: 'lg', ariaLabelledBy: 'modal-basic-title' });
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  reviseModal(modal, formId: string, index: number) {
    this.showStatusDropDown = false;
    this.commentList = {};
    this.modalAction = 'revise';
    this.getCommentsList(formId, EstimatorConfig.STATUS_REVISE);
    this.selectedFormId = formId;
    this.selectedFormIndex = index;

    this.modalReference = this.modalService.open(modal, { size: 'lg', ariaLabelledBy: 'modal-basic-title' });
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  completeModal(modal, formId: string, index: number) {
    this.showStatusDropDown = true;
    this.commentList = {};
    this.modalAction = 'complete';
    this.getCommentsList(formId, EstimatorConfig.STATUS_COMPLETED);
    this.selectedFormId = formId;
    this.selectedFormIndex = index;

    this.modalReference = this.modalService.open(modal, { size: 'lg', ariaLabelledBy: 'modal-basic-title' });
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getCommentsList(formId: string, status: string) {

    this.serviceProvider.getCommentsByFormIdAndStatus(formId, status).subscribe(
      result => {
        if (!!result && result) {
          this.commentList = result;
        }
      },
      err => {

      },
      () => {

      }
    );
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

  statusChanged(obj: any) {
    if (!!obj && !!obj.target.value) {
      this.commentStatusSelected = true;
    } else {
      this.commentStatusSelected = false;
    }
  }

}
