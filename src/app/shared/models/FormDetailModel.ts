import { EstimatorModel, ServerModel, WorkstationModel, ServiceModel } from '../../shared/models';


export interface FormDetailModel {
  id?: string;
  formId?: string;
  formStatusId?: string;
  formStatus?: string;
  requestorName?: string;
  requestorId?: string;
  riskRating?: string;
  datePrepared?: string;
  validTo?: string;
  salesConnectNo?: string;
  rfsNo?: string;
  coe?: string;
  customerName?: string;
  customerId?: string;
  salesId?: string;
  approver?: string;
  tsa?: string;
  custom?: string;
  endPoint?: string;
  serviceWindow?: string;
  serviceScope?: string;
  vendor?: string;
  noOfServers?: number;
  noOfConsoles?: number;
  createdDate?: any;
  updatedDate?: any;

  formRegions?: any;
  estimatorDetails?: EstimatorModel;
  serviceDetails?: any;
  nbie?: boolean;
  deliveryLocation?: string;
  isUpdated?: boolean;
  isRejectedByApprover?: boolean;
  isSelfApprovedByRequestor?: boolean;
  deal?: string;
  remark?: string;
  // serverDetails?: ServerModel;
  // workstationDetails?: WorkstationModel;

}
