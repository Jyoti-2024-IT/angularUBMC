import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/components/common/api';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-payment-information',
  templateUrl: './payment-information.component.html',
  styleUrls: ['./payment-information.component.scss']
})
export class PaymentInformationComponent implements OnInit {

  msgs: Message[] = [];
  activeIndex = 4;
  paymentList: any = [];
  tableData: any = [];
  amount: any;
  amountPay: any;
  draftno: any;
  dataList: any = [];
  dataList1: any = [];
  display = false;
  admitsLink: any;
  processbar = false;
  constructor(
    private registrationService: RegistrationService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Please Note :' });
    this.msgs.push({ severity: 'info', summary: '1. Please do not press F5, Refresh, Reload, Right-click or Backspace button while doing online payment.' });
    this.getPaymentDetails();
    this.tableData = [];
  }

  ngAfterViewInit() {
    (document.querySelector('.layout-wrapper .layout-content .layout-content-container') as HTMLElement).style.marginTop = '40px';
  }
  ngOnDestroy() {
    (document.querySelector('.layout-wrapper .layout-content .layout-content-container') as HTMLElement).style.marginTop = '10px';
  }

  getPaymentDetails() {
    // call auto login and take user to the Academic Info
    //this.autoLogin();
    let challan = localStorage.getItem('challan');
    if(challan == null){
      challan='-';
    }
    console.log(challan);
    this.registrationService.getPaymentDetails(localStorage.getItem('authToken'),challan).subscribe(
      data => {
        console.log(data)
        this.dataList = data;        
        if(this.dataList.status == 'timeup'){
          alert("Application Payment is closed.");
        }else{
          this.amount = this.dataList.amountPay;
          this.draftno = this.dataList.DraftNo;
        }
       
      }
      ,
      err => console.log(err),
      () => console.log('Request Completed')
    );
  }

  payment() {
    this.spinner.show();
    var typ = (<HTMLInputElement>document.getElementById('pamentType')).value;
    if(this.draftno!= undefined){
      this.registrationService.submitPayement(typ, this.draftno, localStorage.getItem('authToken')).subscribe(
        data => {
          this.dataList1 = data;
          //console.log(this.dataList1);
          this.spinner.hide();
          if(typ === 'Cash'){
            this.tableData = this.dataList1.challanLink;
            this.admitsLink = this.dataList1.admitsLink;
            if (this.admitsLink !== '') {
              this.spinner.hide();
              this.display = true;
            }
          }else{
            if(this.dataList1.easebuzzurl !== '-') {
              window.open(this.dataList1.easebuzzurl,'_self');
            } else {
              this.spinner.hide();
              alert("OOPS something wrong.");
            }
          }
        }
        ,
        err => console.log(err),
        () => console.log('Request Completed')
      );
    
    //this.display = true;
  }
  else{
    alert("Application Payment is closed.");
    this.spinner.hide();
  }
}
  openBranchList(){
    window.open('https://74.207.233.48:8443/HRCLADM_2018/resources/Reports/Federal_Banks_Kolkata.pdf', "_blank");
  }

  // autoLogin() {
  //   this.spinner.show();
  //   this.registrationService
  //     .loginByToken(localStorage.getItem('authToken'))
  //     .subscribe(
  //       data => {
  //         this.dataList = data;
  //         localStorage.setItem('authToken', this.dataList.authToken);
  //         localStorage.setItem(
  //           'userDetails',
  //           JSON.stringify(this.dataList.userDetails)
  //         );
  //         localStorage.setItem('step', this.dataList.step);
  //       },
  //       err => console.log(err),
  //       () => console.log('Request Completed')
  //     );
  // }
}
