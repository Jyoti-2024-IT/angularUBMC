import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-admissionfeespayment',
  templateUrl: './admissionfeespayment.component.html',
  styleUrls: ['./admissionfeespayment.component.scss']
})
export class AdmissionfeespaymentComponent implements OnInit {
  cdid :any;
  amount:any;
  datalist:any;
  admitsLink:any;
  display = false;
  dataList1: any = [];
  constructor(private router: Router,private spinner: NgxSpinnerService, private registrationService: RegistrationService,) { }

  ngOnInit() {
    this.cdid = localStorage.getItem("cdid");
    this.getAdmissionFees();
  }

  getAdmissionFees(){
		this.spinner.show();
		this.registrationService.getAdmissionFess(localStorage.getItem('authToken'),this.cdid)
		.then(res => {
			// console.log(res);
			this.spinner.hide();
			if (res.status === 'success') {
        this.amount = res.totamt;
			}
		});
  }


  goToDashboard(){
		this.router.navigate(['candidate/dashboard']);
  }

  payment() {
    this.spinner.show();
    this.registrationService.submitAdmissionPayment(localStorage.getItem('authToken'),this.cdid,(<HTMLInputElement>document.getElementById('pamentType')).value).subscribe(
      data => {
        console.log(data);
        this.datalist = data;
        this.spinner.hide();
        if(this.datalist.status === 'success'){
          //window.open(this.dataList1.payurl,'mywin','left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
          //alert(this.dataList1.msg);
          // localStorage.setItem('msgbilldesk', this.datalist.msg);
          // this.router.navigate(['admission/payment']);
          //window.open(this.datalist.payurl,"_self");
          if(this.datalist.easebuzzurl !== '-') {
            // alert(this.datalist.easebuzzurl);
            window.open(this.datalist.easebuzzurl,'_self');
          }
        }else if(this.datalist.status === 'failure'){  //add by a
          alert(this.datalist.msg);
        }

        this.spinner.hide();
      }
      ,
      err => console.log(err),
      () => console.log('Request Completed')
    );
    //this.display = true;
  }

}
