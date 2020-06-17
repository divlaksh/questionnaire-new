import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AppConfig } from '../../app.config';
import { LocalStorageService } from '../../shared/LocalStorage.service';



@Injectable()
export class ServiceProvider {


  private handleError(error: any): Observable<any> {

    if (error.status === 500) {
      error.statusText = 'Server is not reachable. Please try again later.'
    } else if (error.status === 0) {
      error.statusText = 'Internal server error occured. Please try again later.'
    }
    return Observable.throw(error);
  }

  constructor(public http: HttpClient, private localStorageService: LocalStorageService) {
    console.log('Hello HttpProvider Provider');
  }



  login(data: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(AppConfig.APP_URL + '/login', data).pipe(map((res: Response) => {
      // if (res['errcode'] !== '00000') {
      //   return [];
      // }
      return res;
    }));
  }

  signup(data: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(AppConfig.APP_URL + '/users/sign-up', data);
  }

  getUserById(username: String) {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/users/loadUser' + '?username=' + username, { headers: headers });
  }

  getUsersByType(type: string) {

    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/users/user-type?type=' + type, { headers: headers });
  }

  getList(url: string) {

    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + url, { headers: headers });
  }

  getNewFormId() {
    debugger
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/form/new-form-id', { headers: headers });
  }

  saveForm(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.put(AppConfig.APP_URL + '/form/new-form', data, { headers: headers });
  }

  getFormByFormId(formId: string, resetUpdated?: boolean) {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/form/form?f=' + formId
      + '&u=' + (!!resetUpdated && resetUpdated ? true : false), { headers: headers });
  }

  getTermsAndConditions() {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/form/term-condition', { headers: headers });
  }

  updateTermsAndCondition(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.put(AppConfig.APP_URL + '/form/term-condition', data, { headers: headers });
  }

  getFormListByStatus(status: string) {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/form/formbystatus?s=' + status, { headers: headers });
  }

  // getTsaFormList(userId: string, status: string) {
  //   const headers = new HttpHeaders();
  //   const token = localStorage.getItem('token');
  //   headers.append('Authorization', token);
  //   return this.http.get(AppConfig.APP_URL + '/form/pending-tsa?a=' + userId + '&s=' + status, { headers: headers });
  // }

  getSecondLevelApproverFormList(status: string) {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/form/second-level-pending-approver?s=' + status, { headers: headers });
  }

  getSecondLevelApproverGbsFormList(status: string) {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/form/second-level-pending-approver-gbs?s=' + status, { headers: headers });
  }

  getThirdLevelApproverFormList(userId: string, status: string) {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/form/third-level-pending-approver?a=' + userId + '&s=' + status, { headers: headers });
  }

  getApproverFormList(userId: string, status: string) {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/form/pending-approver?a=' + userId + '&s=' + status, { headers: headers });
  }

  getFormsByApprover(userId: string) {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/form/by-approver?a=' + userId, { headers: headers });
  }

  getFormsByTsa(userId: string) {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/form/by-tsa?a=' + userId, { headers: headers });
  }

  getFormsByTsaAndStatus(userId: string, status: string) {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/form/by-tsa-status?a=' + userId + '&s=' + status, { headers: headers });
  }

  getRequestorFormList(requestor: string) {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/form/requestor-forms?r=' + requestor, { headers: headers });
  }

  getFormsByRequestorAndStatus(userId: string, status: string) {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/form/by-requestor-status?a=' + userId + '&s=' + status, { headers: headers });
  }

  approveForm(approver: string, formId: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.put(AppConfig.APP_URL + '/form/approve?a=' + approver + '&f=' + formId, { headers: headers });
  }

  approveSecondAndThirdLevel(approver: string, formId: string, level: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.put(AppConfig.APP_URL + '/form/level-approval-app?a=' + approver + '&f=' + formId + '&l=' + level, { headers: headers });
  }

  rejectForm(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.put(AppConfig.APP_URL + '/form/reject', data, { headers: headers });
  }

  acceptForm(tsa: string, formId: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.put(AppConfig.APP_URL + '/form/accept?a=' + tsa + '&f=' + formId, { headers: headers });
  }

  reviseForm(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.put(AppConfig.APP_URL + '/form/revise', data, { headers: headers });
  }

  completeForm(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.put(AppConfig.APP_URL + '/form/complete', data, { headers: headers });
  }

  acceptPendingApprovalForm(approver: string, formId: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.put(AppConfig.APP_URL + '/form/accept-pending-approval?a=' + approver + '&f=' + formId, { headers: headers });
  }

  getCommentsByFormIdAndStatus(formId: string, status: string) {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/form/comments?f=' + formId + '&s=' + status, { headers: headers });
  }

  getSupportDetails() {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/form/support-details', { headers: headers });
  }


  download() {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/form/download-form?formId=IBMSEC-1927678443', { headers: headers });
  }

  uploadDocument(file: File, formId: string, userId: string, fileName: string, comment: string): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    const token = localStorage.getItem('token');
    formdata.append('file', file);


    const req = new HttpRequest('POST', AppConfig.APP_URL + '/document/upload?id=' + formId + '&u=' + userId + '&f=' + fileName + '&c=' + comment, formdata, {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      reportProgress: true,
      responseType: 'text',
    });

    return this.http.request(req);
  }

  getSystemSettingByValue(value: string) {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/setting/system-setting-by-value?v=' + value, { headers: headers });
  }

  getDocumentsByFormId(formId: string) {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/document/documentbyformid?f=' + formId, { headers: headers });
  }

  deleteDocumentById(id: string) {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.delete(AppConfig.APP_URL + '/document/delete-document?id=' + id, { headers: headers });
  }

  serviceCalculation(coe: string, selectedServiceWindow1: any, serviceScope: any,
    serviceWindow: any, servers: any, consoles: any) {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    headers.append('Authorization', token);
    return this.http.get(AppConfig.APP_URL + '/calc/service-calculation/' + coe + '/' + selectedServiceWindow1 + '/' + serviceScope + '/' + serviceWindow + '/' + servers + '/' + consoles, { headers: headers });
  }

}
