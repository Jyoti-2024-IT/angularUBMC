import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admissionfeespaymentconfirm',
  templateUrl: './admissionfeespaymentconfirm.component.html',
  styleUrls: ['./admissionfeespaymentconfirm.component.scss']
})
export class AdmissionfeespaymentconfirmComponent implements OnInit {
  paymentstatus: any;
  paymnttype:any;
	showtext: any;
	showtext1: any;
	display = false;
	displayunsuccessfull = false;
	cdid: any;
	dataList: any = [];
	dataList1: any = [];
	public userDetails: any;
	paymentList: any = [];
	tableData: any = [];
	amount: any;
	amountPay: any;
	draftno: any;
	admitsLink: any ='';
	processbar = false;
	showchallanlink = false;
  constructor(private route: ActivatedRoute, private spinner: NgxSpinnerService, private router: Router, private registrationService: RegistrationService) { }

  ngOnInit() {
		this.userDetails = localStorage.getItem('userDetails');
		this.cdid = localStorage.getItem('cdid');
		this.route.paramMap.subscribe(
			params => {
        this.paymentstatus = +params.get('msg');
        this.paymnttype = +params.get('type');
				console.log(this.paymentstatus);
				if (this.paymentstatus == 0) {
					this.displayunsuccessfull = true;
					this.showtext = " Online Payment Transaction has been cancelled. Click on Go to Dashboard below and try again.";
				}
				if (this.paymentstatus == 1) {
					this.registrationService.getPaymentStatusadm(this.cdid,this.paymnttype).subscribe(
						data => {
							this.dataList1 = data;
							console.log(this.dataList1);
							this.spinner.hide();
							if (this.dataList1.status === 'success') {
								this.showtext = "Online Payment Transaction Successful.";
								//this.tableData = this.dataList1.challanLink;
								this.admitsLink = this.dataList1.webLink;
								this.showchallanlink=  true;
								if (this.admitsLink !== '') {
									this.spinner.hide();
									this.display = true;
								}
							} else {
								this.admitsLink= '';
                				//this.showtext = "Online Payment Transaction Failed.";
								this.spinner.hide();
							}
						}
						,
						err => console.log(err),
						() => console.log('Request Completed')
					);
				}
			}
		)
	}

	gotoDashBoard(){
		this.router.navigate(['candidate/dashboard']);
	}

}
