import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-onlinepayment',
	templateUrl: './onlinepayment.component.html',
	styleUrls: ['./onlinepayment.component.scss']
})
export class OnlinepaymentComponent implements OnInit {
	public challanList = [];
	public challanNo: any;
	msgs: Message[] = [];
	amountPay: any;
	coursename: any;
	dataList: any = [];
	dataList1: any = []

	constructor(
		private registrationService: RegistrationService,
		private fb: FormBuilder,
		private router: Router,
		private spinner: NgxSpinnerService,
	) { }

	ngOnInit() {
		this.challanList = JSON.parse(localStorage.getItem("challanList"));
	}

	getamntcourse(chlnno) {
		if (chlnno != undefined) {
			this.spinner.show();
			this.registrationService.getcoursechallan(chlnno).subscribe(
				data => {
					console.log(data);
					this.spinner.hide();
					this.dataList = data;
					this.amountPay = this.dataList.amt;
					this.coursename = this.dataList.coursename;
				}
				,
				err => console.log(err),
				() => console.log('Request Completed')
			);
		}
		else {
			this.amountPay = "";
			this.coursename = "";
		}

	}

	payment(chlnno) {
		if (chlnno != undefined) {
			this.spinner.show();
			this.registrationService.submitPayement('Online Payment', chlnno, localStorage.getItem('authToken')).subscribe(
				data => {
					this.dataList1 = data;
					console.log(this.dataList1);
					this.spinner.hide();
					if (this.dataList1.status === 'success') {
						window.open(this.dataList1.payurl, "_self");
					}
				}
				,
				err => console.log(err),
				() => console.log('Request Completed')
			);
		}
		else {
			alert("Please select Challan");
			this.amountPay = "";
			this.coursename = "";
			return false;
		}
	}

}
