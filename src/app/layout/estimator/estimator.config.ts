

export class EstimatorConfig {

  static CONSTANT_VALUE = 2.90;
  static HOURS_CONSTANT = 1795;
  static BAND_7_USD = 22.27;
  static BAND_5_USD = 15.78;

  static STATUS_NEW = 'NEW';
  static STATUS_ACCEPTED = 'ACCEPTED';
  static STATUS_PENDING_APPROVAL = 'PENDING_APPROVAL';
  static STATUS_PENDING_APPROVAL_ACCEPTED = 'PENDING_APPROVAL_ACCEPTED';
  static STATUS_APPROVED = 'APPROVED';
  static STATUS_REJECTED = 'REJECTED';
  static STATUS_COMPLETED = 'COMPLETED';
  static STATUS_REVISE = 'REVISE';
  static SECOND_LEVEL_APPROVAL_PENDING = 'SECOND_LEVEL_APPROVAL_PENDING';
  static SECOND_LEVEL_APPROVED = 'SECOND_LEVEL_APPROVED';
  static THIRD_LEVEL_APPROVAL_PENDING = 'THIRD_LEVEL_APPROVAL_PENDING';


  static SERVICE_WINDOW_8_5 = '8_5';
  static SERVICE_WINDOW_16_5 = '16_5';
  static SERVICE_WINDOW_24_7 = '24_7';
  static SERVICE_WINDOW_8_5_ON_CALL = '8_5_ON_CALL';
  static SERVICE_WINDOW_16_5_ON_CALL = '16_5_ON_CALL';

  static BAG = 'Bag';
  static RENEW = 'Renew';

  static getDeals() {
    return [
      { id: 'BAG', value: 'Bag' },
      { id: 'RENEW', value: 'Renew' },

    ];
  }


  static getFormStatuses() {
    return [
      { id: 'NEW', value: 'New' },
      { id: 'ACCEPTED', value: 'Accepted' },
      { id: 'PENDING_APPROVAL', value: 'Pending Approval' },
      { id: 'PENDING_APPROVAL_ACCEPTED', value: 'Pending Approval Accepted' },
      { id: 'APPROVED', value: 'Approved' },
      { id: 'REJECTED', value: 'Rejected' },
      { id: 'COMPLETED', value: 'Completed' },
      { id: 'REVISE', value: 'Revise' },
      { id: 'SECOND_LEVEL_APPROVAL_PENDING', value: 'Level 2 Approval Pending' },
      { id: 'SECOND_LEVEL_APPROVED', value: 'Level 2 Approved' },
      { id: 'THIRD_LEVEL_APPROVAL_PENDING', value: 'Level 3 Approval Pending' },
    ];
  }

  static getFormStatusbyId(id: string) {
    const statuses = this.getFormStatuses();
    const data = statuses.filter(item => id === item.id);
    if (!!data && data.length > 0) {
      return data[0];
    }
  }

  static getDetailFormControls() {
    return [
      'formId', 'formStatusId', 'formStatus', 'requestorName', 'requestorId', 'riskRating', 'datePrepared',
      'validTo', 'salesConnectNo', 'rfsNo', 'customerName', 'customerId', 'salesId', 'custom', 'deliveryLocation',
      'deal'
      // 'coe', 'custom', 'endPoint', 'serviceWindow', 'serviceScope', 'vendor', 'noOfServer', 'noOfConsole',

    ];
  }

  static getServiceControls() {
    return [
      'id', 'coe', 'endPoint', 'serviceWindow', 'serviceScope', 'vendor', 'noOfServers', 'noOfConsoles',
      'contractType', 'contractDuration', 'onCallText', 'b7Text', 'b6aText', 'b6bText', 'b8Text', 'calcText', 'b5Text',
      'fteText', 'travel'

    ];
  }

  static getEstimatorControls() {
    return [
      'b5Tnt', 'b7Tnt', 'b7OnCallTnt', 'totalTnt', 'b5Ssb', 'b7Ssb', 'b7OnCallSsb', 'totalSsb',
      'b5Hour', 'b7Hour', 'b7OnCallHour', 'totalHour', 'b5Cost', 'b7Cost', 'b7OnCallCost', 'totalCost'
    ];
  }

  static getPreviewCostTableRowHeaders() {
    return ['OTC', 'Travel', 'Steady State', 'Transition', 'Transformation', 'Consulting'];
  }

  // static getServerFormControls() {
  //   return ['vendor', 'antiMalwareAgent', 'hostIpsOnServers', 'hostFirewallOnServers',
  //     'noOfConsoles', 'serverFactor', 'serverSupported',
  //     'hipsEffort', 'hipsFwEffort', 'noOfConsoleEffort', 'fteRoundOff', 'fteForCalculation',
  //     'serverFactorBaseFte', 'serverSupportedBaseFte',
  //     'hipsEffortBaseFte', 'hipsFwEffortBaseFte', 'noOfConsoleEffortBaseFte', 'fteRoundOffBaseFte', 'fteForCalculationBaseFte',
  //     'serverFactorFinalFte', 'serverSupportedFinalFte', 'hipsEffortFinalFte',
  //     'hipsFwEffortFinalFte', 'noOfConsoleEffortFinalFte', 'fteRoundOffFinalFte', 'fteForCalculationFinalFte'];
  // }

  // static getWorkstationFormControls() {
  //   return ['vendor', 'antiMalwareAgent', 'hostIpsOnServers', 'hostFirewallOnServers', 'deviceApplicationControl', 'noOfConsoles',
  //     'serverFactor', 'serverSupported', 'encryptionEffort', 'hipsEffort', 'hipsFwEffort', 'deviceApplicationControlEffort',
  //     'noOfConsoleEffort', 'fteRoundOff', 'fteForCalculation', 'serverFactorBaseFte', 'serverSupportedBaseFte',
  //     'encryptionEffortBaseFte', 'deviceApplicationControlBaseFte', 'hipsEffortBaseFte', 'hipsFwEffortBaseFte', 'noOfConsoleEffortBaseFte',
  //     'fteRoundOffBaseFte', 'fteForCalculationBaseFte', 'serverFactorFinalFte', 'serverSupportedFinalFte', 'hipsEffortFinalFte',
  //     'encryptionEffortFinalFte', 'hipsFwEffortFinalFte', 'deviceApplicationControlFinalFte', 'noOfConsoleEffortFinalFte',
  //     'fteRoundOffFinalFte', 'fteForCalculationFinalFte'];
  // }
}
