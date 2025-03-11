import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Common } from '../domains/common';
import { GeneralInformationResponse } from '../domains/GeneralInformationResponse';

@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient) { }

// private baseUrl = 'https://170.187.156.216:8443/HRCLADM_2022_THK/';
  // private baseUrl = 'https://23.239.17.27:8443/HRCLADM_2018_SSC/'; //SSC MAIN "https://23.239.17.27/Admission/" -prod
  //private baseUrl = 'http://173.230.138.18:8080/HRCLADM_2018_SSC/';

  //private baseUrl = 'http://45.79.201.92:8080/HRCLADM_2018_SSC/' //SSC DEMO "http://45.79.201.92/Admission/" -prod
  // private baseUrl = 'http://45.79.217.254:8080/HRCLADM_2018_SSC/'; //"http://45.79.217.254/Admission/" -prod
  // private baseUrl = 'http://45.33.96.252:8080/HRCLADM_2022_THK/'; //"http://45.33.96.252/Admission/" -prod
  // private baseUrl = 'http://143.42.129.243:8080/HRCLADM_2023_UBMC/';  //"http://143.42.129.243/Admission/" -prod
  private baseUrl = 'https://ubmcollege.in:8443/HRCLADM_2023_UBMC/';       //"https://ubmcollege.in/Admission/" -prod
  // private baseUrl = 'http://45.33.96.252:8080/HRCLADM_2023_UBMC/'; //"http://45.33.96.252/Admission/" -prod

  /** GET religionList,categoryList,mothertongueList from the server */
  getCommonList() {
    return this.http.get(this.baseUrl + 'reg-common-api').toPromise().then(res => <Common>res);
  }

  /** POST Login Information to the server */
  studentLogin(data) {
    // console.log(data);
    return this.http
      .post(this.baseUrl + 'student-login', data)
      .toPromise()
      .then(res => <GeneralInformationResponse>res);
  }

  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    return token ? true : false;
  }

  /** POST General Information to the server */
  registerUser(data) {
    // console.log(data);
    return this.http
      .post(this.baseUrl + 'reg-submit', data)
      .toPromise()
      .then(res => <GeneralInformationResponse>res);
  }

  registerUserUpdate(token,data) {
    // console.log(token,data);
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http
      .post(this.baseUrl + 'reg-update', data, httpOptions)
      .toPromise()
      .then(res => <any>res);
  }

  /** GET ** from the server */
  getAcademicList(token) {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http
      .get(this.baseUrl + 'academic-common-api', httpOptions)
      .toPromise()
      .then(res => <Common>res);
  }
  getStateCity(c, s, city) {
    return this.http.get(this.baseUrl + 'getStateCity/' + c + '/' + s + '/' + city);
  }

  saveAcademicDetails(token, dt) {
    // console.log("myData", dt)
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http.post(this.baseUrl + 'submitAcademicInfo', dt, httpOptions);
  }
  deleteRowByMarksId(id) {
    return this.http.delete(this.baseUrl + 'deleteMarksById/' + id + '');
  }
  loginByToken(token) {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http.get(this.baseUrl + 'loginby-token', httpOptions);
  }

  getEligibleCourseListApi(token) {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http.get(this.baseUrl + 'eligible-courses-list', httpOptions);
  }

  saveCourseSelectionApi(token, dt) {
    console.log(dt);
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http.post(this.baseUrl + 'submit-courses', dt, httpOptions);
  }

  getAdditionalList(token) {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http.get(this.baseUrl + 'additional-common-api', httpOptions);
  }
  saveAdditionalDetailsApi(token, data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http.post(
      this.baseUrl + 'additional-submit',
      data,
      httpOptions
    );
  }
  deleteRowBySports(index) {
    return this.http.delete(this.baseUrl + 'deleteSportById/' + index + '');
  }

  getPaymentDetails(token, challan) {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http.get(this.baseUrl + 'get-PayAmount-Challan/' + challan + '', httpOptions);
  }
  submitPayement(payType, chln, token) {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http.get(
      this.baseUrl +
      'updatePaymentDetails?chllno=' +
      chln +
      '&aptype=' +
      payType,
      httpOptions
    );
  }

  getPaymentStatus(id, status) {
    return this.http.get(this.baseUrl + 'getpaymentdetails/' + id + '/' + status);
  }

  /** GET Course Wise Application Status from the server */
  getCourseWiseApplicationStatus(token) {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http
      .get(this.baseUrl + 'Course-Wise-Application-Status', httpOptions)
      .toPromise()
      .then(res => <any>res);
  }

  checkregNumber(r) {
    return this.http.get(this.baseUrl + 'checkRegNo/' + r + '');
  }

  /** GET Common dat of Dashboard from the server */
  getDashboardCommon(token) {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http
      .get(this.baseUrl + 'dashboard-common-api', httpOptions)
      .toPromise()
      .then(res => <any>res);
  }

  /** Print form or challan */
  printFormChallan(token, type, challanId) {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http
      .get(this.baseUrl + 'duplicate-print?type=' + type + '&challan=' + challanId, httpOptions)
      .toPromise()
      .then(res => <any>res);
  }
  /** get Otp for Forgot password */
  getOTP(data) {
    // console.log(data);
    return this.http
      .get(this.baseUrl + 'forget-pass-otp-generate?moblno=' + data.moblno + '&dob=' + data.dob)
      .toPromise()
      .then((res => <any>res));
  }
  /** get Forgot password */
  getPassword(fid, otp) {
    const httpOptions = {
      headers: new HttpHeaders({ 'F-Id': fid })
    };
    return this.http
      .get(this.baseUrl + 'get-forget-password?otp=' + otp, httpOptions)
      .toPromise()
      .then((res => <any>res));
  }

  getSubjectForSelection(token, courseId) {
    // console.log(courseId, token)
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http
      .get(this.baseUrl + 'Course-Wise-Subject-Selection-List?courseId=' + courseId, httpOptions)
      .toPromise()
      .then(res => <any>res);
  }
  saveSubjectSelection(token, data, admStatusId) {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http
    .post(this.baseUrl + 'Submit-Course-Wise-Subject-Selection/' + admStatusId, data, httpOptions)
    .toPromise()
    .then(res => <any>res);

  }

  getSelectedSubject(token, admStatusId) {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http
      .get(this.baseUrl + 'get-selected-subject/' + admStatusId, httpOptions)
      .toPromise()
      .then(res => <any>res);
  }

  getPaperList(token, id) {
    // console.log(id);
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http
      .get(this.baseUrl + 'get-paper-by-boardid/' + id, httpOptions)
      .toPromise()
      .then(res => <any>res);
  }

  changePass(data) {
    // console.log(data);
    return this.http
      .post(this.baseUrl + 'change-password', data)
      .toPromise()
      .then(res => <any>res);
  }

  /** Print form or challan */
  getChallanOrForm(token, id, challanno) {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http
      .get(this.baseUrl + 'duplicate-print?type=' + id + '&challan=' + challanno, httpOptions)
      .toPromise()
      .then(res => <any>res);
  }

  confirmofinterest(token, confirmvalue, cid) {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http
      .get(this.baseUrl + 'confirm-of-interest?confirmvalue=' + confirmvalue + '&cid=' + cid, httpOptions)
      .toPromise()
      .then(res => <any>res);
  }

  getAdmissionFess(token,cdid){
    // console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http
      .get(this.baseUrl + 'get-admission-fees?cdid=' + cdid, httpOptions)
      .toPromise()
      .then(res => <any>res);
  }

  submitAdmissionPayment(token,cdid,payType){
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http.get(
      this.baseUrl +
      'updateAdmissionPayment?cdid=' + cdid + '&aptype=' + payType,httpOptions);
  }

  getPaymentStatusadm(cdid, type) {
    return this.http.get(this.baseUrl + 'getpaymentdetailsadm/' + cdid + '/' + type);
  }

  getcoursechallan(challan) {
    return this.http.get(this.baseUrl + 'get-course-challan/' + challan + '');
  }

  getadmchallan(token, cdid) {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http
      .get(this.baseUrl + 'getadmfeeschallan/' + cdid, httpOptions)
      .toPromise()
      .then(res => <any>res);
  }

  getadmForm(token, cdid) {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-Auth-Token': token })
    };
    return this.http
      .get(this.baseUrl + 'getadmform/' + cdid, httpOptions)
      .toPromise()
      .then(res => <any>res);
  }

  getregistrationvrfotp(regemail, regmobno) {
    return this.http
      .get(this.baseUrl + 'getregistrationvrfotp?regemail=' + regemail +'&regmobno='+ regmobno)
      .toPromise()
      .then(res => <any>res);
  }

  stPhotoUploadService(file: File, flg: string, pid: string): Promise<any> {
    console.log(file, flg, pid);
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<any>(`${this.baseUrl}doc-upload/${flg}/${pid}`, formData, {
        headers: {
        }
      })
      .toPromise();
  }
  

// photoupload(data, flg, pid) {
//   // console.log(data,flg,pid)
//   return this.http.post(this.baseUrl + 'doc-upload/' + flg + '/' + pid, data)
//     .toPromise()
//     .then(res => res);
// }



}
