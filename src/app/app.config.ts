import { environment } from '../environments/environment';


export class AppConfig {

  static APP_NAME = 'throq';

  static APP_URL = environment.api_url;

  static REQUESTOR_TYPE = 'REQUESTOR';
  static TSA_TYPE = 'TSA';
  static APPROVER_TYPE = 'APPROVER';
  static ADMIN_TYPE = 'ADMIN';

  static LEVEL2_APPROVER = 'LEVEL2_APPROVER';
  static LEVEL2_APPROVER_GBS = 'LEVEL2_APPROVER_GBS';
  static LEVEL3_APPROVER = 'LEVEL3_APPROVER';

  public static RISK_RATING = [
    { id: 'LOW', value: 'Low' },
    { id: 'MEDIUM', value: 'Medium' },
    { id: 'HIGH', value: 'High' },
  ];
}
