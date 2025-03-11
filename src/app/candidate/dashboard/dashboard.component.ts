import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { ValidateConfirmPassword } from '../../validators/confirmPassword.validator';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, FormControlDirective, FormControlName } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@Component({
	selector: 'app-candidate-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	providers: [ConfirmationService]
})
export class CandidateDashboardComponent implements OnInit {
	msgs: Message[] = [];

	appStatusList: any[];
	admStatusList: any[];
	cols: any[];
	colsAdm: any[];
	display = false;
	subjectSelectionDisplay = false;
	duplicateChallanList = [];
	selectedChallan: any;
	showInvalid: Boolean = false;
	appPaymentStatus = false;
	subjectTypeList: any = [];
	subjectList = [];
	dataList: any;
	defaultList: any = [];
	subjectSelectionForm: FormGroup;
	allsubjects = [];
	data: any;
	msgSubjectSelection: Message[] = [];
	errorMsgs: Message[] = [];
	admStatusId: any;
	selectedSubjectList: any;
	listLength: any;
	rowGroupMetadata: any;
	displayChangePass: boolean = false;
	changepassForm: FormGroup;
	token: any;
	show: boolean;
	cnfshow: boolean;
	oldshow: boolean;
	showAdmStatus = false;
	displayConfirmDialog = false;
	coursedetailsid: any;

	
	genSubSelectBttnDisable: boolean = false;
	docStatusAprvdBttnDisable: boolean = false;
	addonSubmitBttnDisable: boolean = false;

	constructor(private fb: FormBuilder, private confirmationService: ConfirmationService, private registrationService: RegistrationService, private router: Router, private spinner: NgxSpinnerService) { }

	ngOnInit() {
		this.spinner.show();

		// Add by a
		this.msgs = [];
		this.msgs.push({ severity: 'info', summary: 'Please Note :' });
		this.msgs.push({ severity: 'info', detail: '1.  The Rank column in the dashboard represents the position of the student (in order of merit) who have expressed their interest.' });
		// End Add by A

		this.msgSubjectSelection = [];
		this.msgSubjectSelection.push({ severity: 'info', summary: 'Please Note (Applicable only for Under Graduation courses):' });
		this.msgSubjectSelection.push({
			severity: 'info',
			detail: "i.  In case you are merited for multiple courses / sessions, click on the checkbox of desired course you want to opt for and click on 'Submit' button."
		});
		this.msgSubjectSelection.push({
			severity: 'info',
			detail: 'ii. Course Selection cannot be changed or edited once you click on "Submit" button.'
		});
		this.cols = [
			{ field: 'coursenm', header: 'Course Name' },
			{ field: 'appno', header: 'Application Number' },
			// { field: 'paymentdt', header: 'Payment Date' },
			// { field: 'payment', header: 'Payment' },
			// { field: 'confirmation', header: 'Confirmation Of Interest' },
			{ field: 'minorElectiveSelection', header: 'Minor Elective Selection' },
			{ field: 'meritlistStatus', header: 'Merit List Status' },
			{ field: 'provrank', header: 'Rank' }
		];

		this.colsAdm = [
			{ field: 'coursenm', header: 'Course Name' },
			{ field: 'appno', header: 'Application Number' },
			// { field: 'payment', header: 'Payment' },
			// { field: 'feespaydt', header: 'Admission Payment Date' },
			{ field: 'admissionform', header: 'Admission Form' }
		];

		this.admstatus();

		// this.registrationService.getCourseWiseApplicationStatus(localStorage.getItem('authToken'))
		// 	.then(data => {
		// 		console.log(data);
		// 		this.spinner.hide();
		// 		this.appStatusList = data.appSatusList;
		// 		this.admStatusList = data.admSatusList;
		// 		if (this.admStatusList != undefined) {
		// 			this.showAdmStatus = true;
		// 		}
		// 		this.updateRowGroupMetaData();
		// 	});

		this.registrationService.getDashboardCommon(localStorage.getItem('authToken'))
			.then(data => {
				// console.log(data);
				this.duplicateChallanList = data.paymentChllnList;
			});

		this.subjectSelectionForm = this.fb.group({
			subjectDetailInfo: this.fb.array([])
		});
		this.token = JSON.parse(localStorage.getItem('userDetails'));
	}

	admstatus() {
		this.registrationService.getCourseWiseApplicationStatus(localStorage.getItem('authToken'))
			.then(data => {
				// console.log(data);
				this.spinner.hide();
				this.appStatusList = data.appSatusList;
				// console.log(this.appStatusList)
				this.admStatusList = data.admSatusList;
				if (this.admStatusList != undefined) {
					this.showAdmStatus = true;
				}
				this.updateRowGroupMetaData();
				//------------if meritlisted==yes  student will not update any information
				for (let i = 0; i < this.appStatusList.length; i++) {
					if (this.appStatusList[i].meritlist == 'Yes') {
						localStorage.setItem('meritlisted', 'yes');
						break;
					}
				}
				for (let i = 0; i < this.appStatusList.length; i++) {
					if (this.appStatusList[i].confirmed == 'yes') {
						localStorage.setItem('confirmed', 'yes');
						break;
					}
				}
			});
	}

	showPrintFormChallanDialog() {
		this.display = true;
	}

	printFormChallan(type) {
		let challanId = null;
		if (type === 'challan') {
			if (this.selectedChallan) {
				challanId = this.selectedChallan.name1;
			} else {
				this.showInvalid = true;
				return;
			}
		}
		this.spinner.show();
		this.registrationService
			.printFormChallan(localStorage.getItem('authToken'), type, challanId)
			.then(data => {
				this.display = false;
				// console.log(data.pdfLink);
				window.open(data.pdfLink);
				this.spinner.hide();
			});

	}

	payAdmissionFees(c) {
		localStorage.setItem("cdid", c);
		this.router.navigate(['candidate/admissionfeespayment']);
	}

	payApplicationFees(c) {
		//alert(this.listLength);
		localStorage.setItem("challan", c);
		this.router.navigate(['admission/payment-information']);
		//this.router.navigate(['candidate/admissionfeespayment']);
	}

	updateRowGroupMetaData() {
		this.rowGroupMetadata = {};
		if (this.appStatusList) {
			for (let i = 0; i < this.appStatusList.length; i++) {
				let rowData = this.appStatusList[i];
				let challan = rowData.challan;
				if (i == 0) {
					this.rowGroupMetadata[challan] = { index: 0, size: 1 };
				}
				else {
					let previousRowData = this.appStatusList[i - 1];
					let previousRowGroup = previousRowData.challan;
					if (challan === previousRowGroup)
						this.rowGroupMetadata[challan].size++;
					else
						this.rowGroupMetadata[challan] = { index: i, size: 1 };
				}
			}
		}
	}

	showChangePassDialog() {
		this.displayChangePass = true;
		this.changepassForm = this.fb.group({
			id: [this.token.id, Validators.required],
			dtls: [null, Validators.required],
			password: [null, Validators.required],
			chkpass: new FormControl('', [ValidateConfirmPassword]),
		});
	}

	password() {
		this.show = !this.show;
	}

	cnfpassword() {
		this.cnfshow = !this.cnfshow;
	}

	oldPassword() {
		this.oldshow = !this.oldshow;
	}

	changePass() {
		if (this.changepassForm.valid) {
			console.log('Form Submitted!');
			// console.log(this.changepassForm.value);
			const data = this.changepassForm.value;
			this.registrationService.changePass(data).then(res => {
				// console.log(res);
				if (res.status === 'success') {
					alert(res.msg);
					this.changepassForm.get("dtls").setValue('');
					this.changepassForm.get("password").setValue('');
					this.changepassForm.get("chkpass").setValue('');
				}
				else if (res.status === 'failure') {
					alert(res.msg);
				}
			});
		} else {
			console.log('Form Not Submitted!');
			// console.log(this.changepassForm);
			Object.keys(this.changepassForm.controls).forEach(control => {
				this.changepassForm.controls[control].markAsDirty();
			});
		}
	}

	getChallanOrForm(challanno) {
		//alert(challanno);
		this.spinner.show();
		this.registrationService.getChallanOrForm(this.token.authToken, this.token.id, challanno).then(res => {
			// console.log(res);
			this.spinner.hide();
			if (res.status === 'success') {
				window.open(res.pdfLink, "_blank");
			}
			// else if (res.status === 'failure') {
			// 	alert(res.msg);
			// }
		});
	}
	openProcessPdf() {
		window.open('https://74.207.233.48:8080/HRCLADM_2018/resources/Reports/Application_procedure.pdf', "_blank");
	}

	redirectToTest() {
		this.confirmationService.confirm({
			message: "You will be logged out and redriected to Online Test Portal.",
			header: 'Confirmation',
			icon: 'fa fa-question-circle',
			accept: () => {
				localStorage.clear();
				window.open('http://45.79.217.254/Onlinetest/#/', "_self");
			},
			reject: () => {

			}
		});


	}

	cnfofInterest(cdid) {
		this.displayConfirmDialog = true;
		this.coursedetailsid = cdid;
	}

	accept = function () {
		this.spinner.show();
		this.displayConfirmDialog = false;
		let confirmvalue = 1;
		this.registrationService.confirmofinterest(localStorage.getItem('authToken'), confirmvalue, this.coursedetailsid)
			.then(data => {
				// console.log(data);
				alert('Confirmation Recorded. ');
				this.admstatus();
				this.spinner.hide();
			});
		this.spinner.hide();
	};
	reject = function () {
		this.spinner.show();
		this.displayConfirmDialog = false;
		let confirmvalue = 0;
		this.registrationService.confirmofinterest(localStorage.getItem('authToken'), confirmvalue, this.coursedetailsid)
			.then(data => {
				// console.log(data);
				alert('Confirmation Removed. ');
				this.admstatus();
				this.spinner.hide();
			});
		this.spinner.hide();

	};

	getAdmChallan(cdid) {
		//alert(challanno);
		this.spinner.show();
		this.registrationService.getadmchallan(this.token.authToken, cdid).then(res => {
			// console.log(res);
			this.spinner.hide();
			if (res.status === 'success') {
				window.open(res.webLink, "_blank");
			}
			// else if (res.status === 'failure') {
			// 	alert(res.msg);
			// }
		});
	}

	printAdmissionForm(cdid) {
		this.spinner.show();
		this.registrationService.getadmForm(this.token.authToken, cdid).then(res => {
			// console.log(res);
			this.spinner.hide();
			if (res.status === 'success') {
				window.open(res.pdfLink, "_blank");
			}
			// else if (res.status === 'failure') {
			// 	alert(res.msg);
			// }
		});
	}

	selectSubject(id, courseid,subselectionstatus,docstatus) {
		// console.log(id, courseid)
		this.spinner.show();
		if (subselectionstatus == 'yes') {
			this.genSubSelectBttnDisable = true;
		  }
		  else {
			this.genSubSelectBttnDisable = false;
		  }
	
		// console.warn(docstatus);
		this.docStatusAprvdBttnDisable = false;
		this.addonSubmitBttnDisable = false;
		if (docstatus === "Approved") {
		  this.docStatusAprvdBttnDisable = true;
		  this.addonSubmitBttnDisable = true;
		}
	
		this.subjectTypeList = [];
		this.admStatusId = id;
		this.registrationService.getSelectedSubject(localStorage.getItem('authToken'), this.admStatusId).then(res => {
		//   console.log(res);
		  this.selectedSubjectList = res;
		  this.listLength = this.selectedSubjectList.subjectList;
		  this.admstatus();
		});
		this.registrationService.getSubjectForSelection(localStorage.getItem('authToken'), courseid).then(data => {
		//   console.log(data);
		  this.dataList = data;
		  this.removeMarks();
		  let control = <FormArray>this.subjectSelectionForm.controls.subjectDetailInfo;
		  this.allsubjects = [];
		  if (this.dataList.status === 'success') {
			this.subjectSelectionDisplay = true;
			if (this.listLength.length > 0) {
			  this.dataList.data.forEach((x, i) => {
				let subjects = [];
				x.dropList.forEach((item, index) => {
				  subjects.push({
					id: item.id,
					name: item.name
				  });
				})
				this.allsubjects.push({ a: subjects });
				control.push(
				  this.fb.group({
					subjectTypeId: x.id,
					sujectType: x.name,
					subjectId: this.listLength[i].subjectId,
					subSelId: this.listLength[i].subSelId
				  })
				);
			  });
			  this.spinner.hide();
			}
			else {
			  this.dataList.data.forEach((x, i) => {
				let subjects = [];
				x.dropList.forEach((item, index) => {
				  subjects.push({
					id: item.id,
					name: item.name
				  });
				})
				this.allsubjects.push({ a: subjects });
				control.push(
				  this.fb.group({
					subjectTypeId: x.id,
					sujectType: x.name,
					subjectId: 0
				  })
				);
			  });
			  this.spinner.hide();
			}
			this.admstatus();
		  }
		  else {
			this.subjectSelectionDisplay = false;
			alert(this.dataList.msg);
			this.admstatus();
			this.spinner.hide();
		  }
	
		});
	
	  }

	  removeMarks() {
		const control = <FormArray>this.subjectSelectionForm.controls['subjectDetailInfo'];
		for (let i = control.length; i >= 0; i--) {
		  control.removeAt(i);
		}
	  }

	  addSubject() {
		const control = <FormArray>this.subjectSelectionForm.controls['subjectDetailInfo'];
		let newsubjectGroup: FormGroup = this.initItems();
		control.push(newsubjectGroup);
	  }

	  initItems(): FormGroup {
		return this.fb.group({
		  subjectTypeId: [''],
		  sujectType: ['', Validators.required],
		  subjectId: new FormControl,
		  subSelId: new FormControl
		});
	  }

	  checkRepeat(i, e) {
		const p = e.target.value;
		let subjectdata = [];
		subjectdata = this.subjectSelectionForm.value.subjectDetailInfo;
		for (let n = 0; n < subjectdata.length; n++) {
		  if (n !== i) {
			if (subjectdata[n].subjectId == p) {
			  e.target.value = 0;
			  subjectdata[i].subjectId = 0;
			  return false;
			}
		  }
		}
	  }

	  savesubjectSelection() {
		this.data = this.subjectSelectionForm.value;
		this.spinner.show();
		const control = this.subjectSelectionForm.value.subjectDetailInfo;
		for (let i = 0; i < control.length; i++) {
		  if (control[i].subjectId == 0 || control[i].subjectId == null) {
			this.errorMsgs = [];
			this.errorMsgs.push({
			  severity: 'error',
			  detail: 'Please select subject at row no.' + (1 + i)
			});
			this.spinner.hide();
			return false;
		  }
		  else {
			this.errorMsgs = [];
		  }
		}
		this.registrationService.saveSubjectSelection(localStorage.getItem('authToken'), this.data, this.admStatusId).then(res => {
		  this.spinner.hide();
		  alert(res.msg);
		  this.admstatus();
		  if (res.status == "success")
			this.subjectSelectionDisplay = false;
		  else
			this.subjectSelectionDisplay = true;
		}, err => {
		  this.spinner.hide();
		});
	  }

}
