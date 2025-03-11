import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuItem, FieldsetModule } from 'primeng/primeng';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { ValidateConfirmPassword } from '../../validators/confirmPassword.validator';
import { NgxSpinnerService } from 'ngx-spinner';
import "rxjs/add/observable/interval";
import { tap, map, takeWhile } from "rxjs/operators";
import { getMaxListeners } from 'process';
import { timer } from "rxjs/observable/timer";
import { Pipe, PipeTransform } from "@angular/core";
import { Subscription } from 'rxjs';


@Component({
	selector: 'app-general-information',
	templateUrl: './general-information.component.html',
	styleUrls: ['./general-information.component.scss'],
})
export class GeneralInformationComponent implements OnDestroy, OnInit {

	public slNo: number;

	activeIndex = 0;

	registrationMessageDisplay: boolean;
	registrationResponseMessage: string;

	msgs: Message[] = [];

	minDateOfBirth: Date;
	maxDateOfBirth: Date;
	dateOfBirth: Date;
	maxDateOfBirthYear: number;
	minDateOfBirthYear: number;
	motherTongueId: any;
	registrationForm: FormGroup;
	public mothertongueList = [];
	public categoryList = [];
	public religionList = [];
	public communityList = [];
	public genderList = [];
	public loginIdSelection = [];
	public applicationTo = [];
	public genericList = [];
	show: boolean;
	cnfshow: boolean;
	dateMask: any;
	value: any;
	storedDate: any;
	private token: any;
	public disabledField: boolean = false;
	countryId: any;
	stateId: any;
	public allcountrylist = [];
	isOtherState: boolean = true;
	isOtherCity: boolean = true;
	otherOption: boolean = false;
	public stateList = [];
	public cityList = [];
	public maleTitleList = [];
	public femaleTitleList = [];
	public familyIncomeList = [];
	dataList: any;
	isFather = false;
	isMother = false;
	ismlabel = true;
	isflabel = true;
	showClose = false;
	emailRegEx: any;

	getOTPbutton = true;
	displayOTPbox = false;
	otpForm: FormGroup;
	onlyIntegerRegEx = '^[0-9]*$';
	otpValue = '0';
	fieldReadonly = false;
	timeout;
	count = 0;

	//add by JD //
	castPopup: boolean;
	displayModal: boolean;
	noCertificate: boolean;
	displayModal1: boolean;
	selectState: boolean;
	displayModal2: boolean;
	setGeneralCaste: boolean;
	displayModal3: boolean;
	//end by JD //

	constructor(private renderer: Renderer2, private spinner: NgxSpinnerService, private registrationService: RegistrationService, private router: Router) {
		this.renderer.addClass(document.body, 'general-information-body');
	}

	ngOnDestroy() {
		this.renderer.removeClass(document.body, 'general-information-body');
	}
	//private token = JSON.parse(localStorage.getItem('userDetails'));
	ngOnInit() {
		this.emailRegEx = '^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
		this.show = false;
		this.cnfshow = false;
		this.slNo = 0;
		this.msgs = [];
		this.msgs.push({ severity: 'info', summary: 'Please Note :' });
		this.msgs.push({ severity: 'info', detail: '1. All fields marked (*) are mandatory.' });
		this.msgs.push({ severity: 'info', detail: '2. After Submission, you will receive an SMS with information regarding your Application.' });
		this.msgs.push({ severity: 'info', summary: "3. Correct Email id & Phone no should be provided at the time of filling up the form. Email id & Phone no will be verified. All the communications will be sent to the registered phone no and email id only. College will not be responsible for non-receipt of any important information due to incorrect email id or phone no." });

		/** Date of Birth Selector Configuration Start **/

		const TODAY = new Date();
		const MONTH = TODAY.getMonth();
		const YEAR = TODAY.getFullYear();

		this.maxDateOfBirthYear = YEAR - 14;
		this.minDateOfBirthYear = YEAR - 30;

		this.minDateOfBirth = new Date();
		this.minDateOfBirth.setMonth(MONTH);
		this.minDateOfBirth.setFullYear(this.minDateOfBirthYear);

		this.maxDateOfBirth = new Date();
		this.maxDateOfBirth.setMonth(MONTH);
		this.maxDateOfBirth.setFullYear(this.maxDateOfBirthYear);

		this.dateOfBirth = this.maxDateOfBirth;

		/** Date of Birth Selector Configuration End **/

		this.registrationService.getCommonList().then(commonList => {
			// this.mothertongueList = commonList.mothertongueList;
			// console.log(commonList);
			this.categoryList = commonList.categoryList;
			this.allcountrylist = commonList.allcountrylist;
			this.religionList = commonList.religionList;
		});

		this.communityList = [
			{
				'id': 'Yes',
				'name': 'Yes'
			}, {
				'id': 'No',
				'name': 'No'
			}
		];

		this.genderList = [
			{
				'id': 1,
				'name': 'Female'
			}, {
				'id': 2,
				'name': 'Male'
			}, {
				'id': 3,
				'name': 'Transgender'
			}

		];

		this.loginIdSelection = [
			{
				'id': 'email',
				'name': 'Email'
			}, {
				'id': 'mobno',
				'name': 'Mobile No'
			}
		];

		this.applicationTo = [
			{
				'id': 'ug',
				'name': 'Under Graduate'
			}
			// , {
			//   'id': 'pgma',
			//   'name': 'Post Graduation (M.A)'
			// }, {
			//   'id': 'pgmcom',
			//   'name': 'Post Graduation (M.Com)'
			// }
		];

		this.genericList = [
			{ id: 'Yes', name: 'Yes' },
			{ id: 'No', name: 'No' }
		];
		//   this.maleTitleList = [
		// 	{ id: 'Mr.', name: 'Mr.' },
		// 	{ id: 'Dr.', name: 'Dr.' },
		// 	{ id: 'Prof.', name: 'Prof.' },
		// 	{ id: 'Late', name: 'Late' }
		//   ];
		//   this.femaleTitleList = [
		// 	{ id: 'Mrs.', name: 'Mrs.' },
		// 	{ id: 'Dr.', name: 'Dr.' },
		// 	{ id: 'Prof.', name: 'Prof.' },
		// 	{ id: 'Late', name: 'Late' }
		//   ];
		//   this.familyIncomeList = [
		// 	{ id: 'Upto 1.2 Lac', name: 'Upto 1.2 Lac.' },
		// 	{ id: '1.2 Lac to 5 Lacs', name: '1.2 Lac to 5 Lacs' },
		// 	{ id: '5 Lacs and above', name: '5 Lacs and above' }
		//   ];

		this.otpForm = new FormGroup({
			otpfield: new FormControl('', [Validators.required, Validators.pattern(this.onlyIntegerRegEx)]),
		});

		this.registrationForm = new FormGroup({
			firstName: new FormControl('', Validators.required),
			middleName: new FormControl(),
			lastName: new FormControl('', Validators.required),
			email: new FormControl('', [
				Validators.required,
				Validators.pattern(this.emailRegEx)]),
			// Validators.pattern('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')

			dateOfBirth: new FormControl('', Validators.required),
			// categoryId: new FormControl(null, Validators.required),
			// community: new FormControl(null, Validators.required),
			sexId: new FormControl(null, Validators.required),
			studentPersonalContactNo: new FormControl('', [Validators.required, Validators.minLength(10)]),
			loginid: new FormControl('', Validators.required),
			password: new FormControl('', [Validators.required]),
			chkpass: new FormControl('', [ValidateConfirmPassword]),
			applevel: new FormControl('ug', Validators.required),
			// residentOfBengal: new FormControl(null,Validators.required)
			// motherTongueId: new FormControl('', Validators.required),

			// logintp: new FormControl('', Validators.required),

			//religionId: new FormControl(null, Validators.required),
			// mailingAddress: new FormControl('', Validators.required),
			// newcountryId: new FormControl(null, Validators.required),
			// newcityId: new FormControl(null, Validators.required),
			// othernewCity: new FormControl(null),
			// newstateId: new FormControl(null, Validators.required),
			// othernewState: new FormControl(null),
			// newresipinno: new FormControl('', Validators.required),
			// emergencyContactNo: new FormControl('', Validators.required),
			// sParent: new FormControl(null, Validators.required),
			// fTitle: new FormControl(null, Validators.required),
			// fatherName: new FormControl('', Validators.required),
			// mTitle: new FormControl(null, Validators.required),
			// motherName: new FormControl('', Validators.required),
			// familyIncome: new FormControl(null, Validators.required),
			// sportsQuota: new FormControl(null, Validators.required),

		});
		if (localStorage.getItem('userDetails') != "") {
			this.disabledField = true;
			this.getOTPbutton = false;
			this.patchForm();
		}

	}

	setLoginType() {
		(this.registrationForm.controls['loginid'])
			.setValue((this.registrationForm.controls['studentPersonalContactNo']).value, { onlySelf: true });
		// if ((this.registrationForm.controls['logintp']).value.id === 'email') {
		//   (this.registrationForm.controls['loginid'])
		//   .setValue((this.registrationForm.controls['email']).value, { onlySelf: true });
		// } else {
		//   (this.registrationForm.controls['loginid'])
		//   .setValue((this.registrationForm.controls['studentPersonalContactNo']).value, { onlySelf: true });
		// }
	}

	onSubmit() {
		// console.log(this.registrationForm.value)
		if (this.registrationForm.valid) {
			this.spinner.show();
			console.log('Form Submitted!');
			const data = this.registrationForm.value;
			// data.categoryId = this.registrationForm.value.categoryId;
			// data.community = this.registrationForm.value.community;
			// data.residentOfBengal = this.registrationForm.value.residentOfBengal;
			data.sexId = this.registrationForm.value.sexId;
			data.applevel = this.registrationForm.value.applevel;
			const d = new Date(Date.parse(this.registrationForm.value.dateOfBirth));
			if (this.value === undefined) {
				this.storedDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
			} else {
				this.storedDate = this.value;
			}
			data.dateOfBirth = this.storedDate;
			// console.log(data);
			// console.log("gen-info", this.registrationForm.value);
			// data.motherTongueId = this.registrationForm.value.motherTongueId.id;
			//data.religionId = this.registrationForm.value.religionId;
			// data.logintp = this.registrationForm.value.logintp.id;
			// console.log(localStorage.getItem('authToken'));
			if (this.disabledField) {
				this.registrationForm.get('email').enable();
				this.registrationForm.get('sexId').enable();
				this.registrationForm.get('applevel').enable();
				this.registrationForm.get('studentPersonalContactNo').enable();
				this.registrationForm.get('firstName').enable();
				this.registrationForm.get('middleName').enable();
				this.registrationForm.get('lastName').enable();
				this.registrationForm.get('dateOfBirth').enable();
				data.email = this.registrationForm.controls['email'].value;
				data.sexId = this.registrationForm.controls['sexId'].value;
				data.applevel = this.registrationForm.controls['applevel'].value;
				data.studentPersonalContactNo = this.registrationForm.controls['studentPersonalContactNo'].value;
				data.dateOfBirth = data.day + '/' + data.month + '/' + data.year;
				data.firstName = this.registrationForm.controls['firstName'].value;
				data.middleName = this.registrationForm.controls['middleName'].value;
				data.lastName = this.registrationForm.controls['lastName'].value;
				this.registrationService.registerUserUpdate(localStorage.getItem('authToken'), data).then(res => {
					console.log(res);
					if (res.status === 'success') {
						this.spinner.hide();
						this.registrationResponseMessage = res.msg;
						// console.log("hii", this.registrationResponseMessage);
						this.registrationMessageDisplay = true;
						// this.router.navigateByUrl('admission/academic-information');
						console.log(JSON.stringify(res.user));
						localStorage.setItem('userDetails', JSON.stringify(res.user));
						if (localStorage.getItem('step') == '')
							this.router.navigateByUrl('candidate/dashboard');
							// console.log(localStorage.getItem('step'))
							// if (localStorage.getItem('step') !== '') {
							// 	this.router.navigate(['admission/academic-information']);
							//   }
							//   else {
							// 	this.router.navigate(['candidate/dashboard']);
							//   }
					}
					else {
						alert(res.msg);
						console.log("not valid")
					}
				}, error => {
					alert('Something went wrong. Please try again')
					this.spinner.hide();
				});
			}
			else {
				this.registrationService.registerUser(data).then(res => {
					// console.log(res);
					if (res.status === 'success') {
						this.spinner.hide();
						localStorage.setItem('authToken', res.authToken);
						if (res.userDetails) {
							localStorage.setItem('userDetails', JSON.stringify(res.userDetails));
						}
						localStorage.setItem('step', res.step);
						this.registrationResponseMessage = res.msg;
						// console.log(res)
						// console.log(this.registrationResponseMessage);
						this.registrationMessageDisplay = true;
					}
					else if (res.status === 'failure') {
						this.spinner.hide();
						this.registrationResponseMessage = res.msg;
						this.registrationMessageDisplay = true;
						// this.router.navigateByUrl('');

						this.disabledField = false;
						this.fieldReadonly = false;

						return false;
					}

				});
			}
		} else {
			console.log('Form Not Submitted!');
			// console.log(this.registrationForm);
			Object.keys(this.registrationForm.controls).forEach(control => {
				this.registrationForm.controls[control].markAsDirty();
			});
		}
	}

	// updateGeneralInfo() {
	// 	console.log(this.registrationForm.value)
	// 	if (this.registrationForm.valid) {
	// 		this.spinner.show();
	// 		console.log('Form Submitted!');
	// 		const data = this.registrationForm.value;
	// 		// data.categoryId = this.registrationForm.value.categoryId;
	// 		// data.community = this.registrationForm.value.community;
	// 		// data.residentOfBengal = this.registrationForm.value.residentOfBengal;
	// 		data.sexId = this.registrationForm.value.sexId;
	// 		data.applevel = this.registrationForm.value.applevel;
	// 		// data.dateOfBirth = data.day + '/' + data.month + '/' + data.year;
	// 		// const d = new Date(Date.parse(this.registrationForm.value.dateOfBirth));
	// 		// if (this.value === undefined) {
	// 		// 	this.storedDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
	// 		// } else {
	// 		// 	this.storedDate = this.value;
	// 		// }
	// 		// data.dateOfBirth = this.storedDate;
	// 		console.log(data.dateOfBirth);

	// 		this.registrationService.registerUserUpdate(data).then(res => {
	// 			console.log(res);
	// 			if (res.status === 'success') {
	// 				this.spinner.hide();
	// 				// localStorage.setItem('authToken', res.authToken);
	// 				// if (res.userDetails) {
	// 				// 	localStorage.setItem('userDetails', JSON.stringify(res.userDetails));
	// 				// }
	// 				// localStorage.setItem('step', res.step);
	// 				this.registrationResponseMessage = res.msg;
	// 				// console.log("hii", this.registrationResponseMessage);
	// 				this.registrationMessageDisplay = true;
	// 				this.router.navigateByUrl('admission/academic-information');
	// 				localStorage.setItem('userDetails', JSON.stringify(res.userDetails));
	// 				if (localStorage.getItem('step') == '')
	// 					this.router.navigateByUrl('candidate/dashboard');
	// 			}
	// 			else {
	// 				alert(res.msg);
	// 				console.log("not valid")
	// 				// this.registrationForm.get('categoryId').disable();
	// 				// this.registrationForm.get('sexId').disable();
	// 				// this.registrationForm.get('applevel').disable();
	// 				// this.registrationForm.get('studentPersonalContactNo').disable();
	// 			}
	// 		}, error => {
	// 			alert('Something went wrong. Please try again')
	// 			this.spinner.hide();
	// 			// else if (res.status === 'failure') {
	// 			// 	this.spinner.hide();
	// 			// 	this.registrationResponseMessage = res.msg;
	// 			// 	this.registrationMessageDisplay = true;
	// 			// 	// this.router.navigateByUrl('');

	// 			// 	this.disabledField = false;
	// 			// 	this.fieldReadonly = false;

	// 			// 	return false;
	// 			// }

	// 		});
	// 	}
	// }

	registrationMessageClose() {
		// call auto login and take user to the Academic Info
		this.registrationMessageDisplay = false;
		if (localStorage.getItem('authToken')) {
			this.router.navigateByUrl('admission/academic-information');
			// alert("Thank You...");
		}
	}

	password() {
		this.show = !this.show;
	}

	cnfpassword() {
		this.cnfshow = !this.cnfshow;
	}

	onInputDate(event): void {
		let cursorPosition = event.target.selectionEnd;
		if (event.inputType === 'deleteContentBackward' && (cursorPosition === 2 || cursorPosition === 5)) {
			event.target.value = event.target.value.substring(0, cursorPosition - 1) + event.target.value.substring(cursorPosition);
			cursorPosition--;
		}
		if (event.inputType === 'insertText' && (event.target.value.length > 10)) {
			event.target.value = event.target.value.substring(0, event.target.value.length - 1);
		}

		this.dateMask = event.target.value.toString();
		this.dateMask = this.dateMask.replace(/\D/g, '');

		let mask = '';
		for (let i = 0; i < this.dateMask.length; i++) {
			mask += this.dateMask[i];
			if (i === 1 || i === 3) {
				mask += '/';
				if (cursorPosition === 2 || cursorPosition === 5) { cursorPosition++; }
			}
		}
		event.target.value = mask.toString();
		event.target.selectionStart = cursorPosition;
		event.target.selectionEnd = cursorPosition;

		if (event.target.value.length === 10) {
			//console.log(event.target.value);
			this.value = event.target.value;
			// console.log(this.value);
			this.storedDate = this.value;
			// const dt = this.stringToDate(event.path[0].value);
			// if (this.isValidDate(dt)) {
			//     this.value = dt;
			// }
		}
	}

	onBlurDate(): void {
		const d = new Date(Date.parse(this.registrationForm.value.dateOfBirth));
		if (this.value == undefined) {
			this.storedDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
			// console.log(this.storedDate);
		} else {
			this.storedDate = this.value;
			// console.log(this.storedDate);
		}
		// if (!!this.value && !this.isValidDate(this.value)) {
		//     this.value = null;
		// }
	}

	// onInputDate(event): void {
	// 	let cursorPosition = event.target.selectionEnd;

	// 	if (event.inputType === 'deleteContentBackward' && (cursorPosition === 2 || cursorPosition === 5)) {
	// 		event.target.value = event.target.value.substring(0, cursorPosition - 1) + event.target.value.substring(cursorPosition);
	// 		cursorPosition--;
	// 	}
	// 	if (event.inputType === 'insertText' && (event.target.value.length > 10)) {
	// 		event.target.value = event.target.value.substring(0, event.target.value.length - 1);
	// 	}

	// 	this.dateMask = event.target.value.toString();
	// 	this.dateMask = this.dateMask.replace(/\D/g, '');

	// 	let mask = '';
	// 	for (let i = 0; i < this.dateMask.length; i++) {
	// 		mask += this.dateMask[i];
	// 		if (i === 1 || i === 3) {
	// 			mask += '/';
	// 			if (cursorPosition === 2 || cursorPosition === 5) { cursorPosition++; }
	// 		}
	// 	}
	// 	event.target.value = mask.toString();
	// 	event.target.selectionStart = cursorPosition;
	// 	event.target.selectionEnd = cursorPosition;

	// 	if (event.target.value.length === 10) {
	// 		this.value = event.target.value;
	// 		this.storedDate = this.value;
	// 	}
	// }

	// onBlurDate(): void {
	// 	console.log(this.value);
	// 	const d = new Date(Date.parse(this.registrationForm.value.dateOfBirth));
	// 	if (this.value == undefined) {
	// 		this.storedDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
	// 		console.log(this.storedDate);
	// 	} else {
	// 		this.storedDate = this.value;
	// 		console.log(this.storedDate);
	// 	}

	// }


	// autoLogin() {
	// 	this.spinner.show();
	// 	this.registrationService
	// 	  .loginByToken(localStorage.getItem('authToken'))
	// 	  .subscribe(
	// 		data => {
	// 		  this.dataList = data;
	// 		  localStorage.setItem('authToken', this.dataList.authToken);
	// 		  localStorage.setItem(
	// 			'userDetails',
	// 			JSON.stringify(this.dataList.userDetails)
	// 		  );
	// 		  localStorage.setItem('step', this.dataList.step);
	// 		  if (this.dataList.userDetails.bloodGroup != null) {
	// 			this.patchForm();
	// 		  }
	// 		},
	// 		err => console.log(err),
	// 		() => console.log('Request Completed')
	// 	  );
	//   }

	patchForm() {
		this.spinner.show();
		this.token = '';
		this.token = JSON.parse(localStorage.getItem('userDetails'));
		// console.log(this.token);
		this.registrationForm.patchValue(this.token);
		const d = new Date(Date.parse(this.token.dateOfBirth));
		this.registrationForm.get('dateOfBirth').setValue(d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear());
		this.registrationForm.get('loginid').setValue(this.token.studentPersonalContactNo);
		this.registrationForm.get('password').setValue(this.token.dtls);
		this.registrationForm.get('chkpass').setValue(this.token.dtls);
		// this.registrationForm.get('categoryId').disable();
		// this.registrationForm.get('community').disable();
		// this.registrationForm.get('sexId').disable();
		// this.registrationForm.get('applevel').disable();
		// this.registrationForm.get('dateOfBirth').disable();
		// this.registrationForm.get('residentOfBengal').disable();

		// this.registrationForm.get('newcountryId').disable();
		// this.registrationForm.get('newstateId').disable();
		// this.registrationForm.get('sportsQuota').disable();
		// this.registrationForm.get('familyIncome').disable();
		// this.registrationForm.get('religionId').disable();
		// this.registrationForm.get('sParent').disable();
		// this.registrationForm.get('newcityId').disable();
		// this.registrationForm.get('mTitle').disable();

		//this.isSingleParent();
		//this.getStateCity(this.token.newcountryId,this.token.newstateId);
		this.spinner.hide();
	}

	// getStateCity(x, y) {
	// 	this.countryId = x;
	// 	this.stateId = y;
	// 	if (x == 1) {
	// 		this.otherOption = false;
	// 	} else {
	// 		this.otherOption = true;
	// 	}
	// 	this.registrationService.getStateCity(x, y).subscribe(data => {
	// 		this.stateList = [];
	// 		this.cityList = [];
	// 		this.dataList = data;
	// 		this.stateList = this.dataList.stateList;
	// 		this.cityList = this.dataList.cityList;
	// 	});
	// }
	// enableOtherState() {
	// 	const othernewState = this.registrationForm.get('othernewState');
	// 	if (this.registrationForm.value.newstateId == '-1') {
	// 		this.isOtherState = false;
	// 		othernewState.setValidators([Validators.required]);
	// 	} else {
	// 		this.registrationForm.controls.othernewState.setValue(null);
	// 		this.isOtherState = true;
	// 		othernewState.clearValidators();
	// 	}
	// 	othernewState.updateValueAndValidity();
	// }

	// enableOtherCity() {
	// 	const othernewCity = this.registrationForm.get('othernewCity');
	// 	if (this.registrationForm.value.newcityId == '-1') {
	// 		this.isOtherCity = false;
	// 		othernewCity.setValidators([Validators.required]);
	// 	} else {
	// 		this.registrationForm.controls.othernewCity.setValue(null);
	// 		this.isOtherCity = true;
	// 		othernewCity.clearValidators();
	// 	}
	// 	othernewCity.updateValueAndValidity();
	// }

	// checkContactNo() {
	// 	if (this.registrationForm.value.emergencyContactNo ===  this.registrationForm.value.studentPersonalContactNo) {
	// 	  alert('Alternate Mobile Number cannot be same as Student Mobile No.');
	// 	  this.registrationForm.controls.emergencyContactNo.setValue(null);
	// 	}
	//   }
	//   singleParent() {
	// 	this.isMother = false;
	// 	this.ismlabel = true;
	// 	this.isflabel = true;
	// 	this.registrationForm.controls.motherName.setValue('');
	// 	this.registrationForm.controls.mTitle.setValue(null);
	// 	this.isFather = false;
	// 	this.registrationForm.controls.fatherName.setValue('');
	// 	this.registrationForm.controls.fTitle.setValue(null);
	//   }

	//   isSingleParent() {
	// 	const motherName = this.registrationForm.get('motherName');
	// 	const mTitle = this.registrationForm.get('mTitle');
	// 	const fatherName = this.registrationForm.get('fatherName');
	// 	const fTitle = this.registrationForm.get('fTitle');
	// 	if (this.registrationForm.value.sParent === 'Yes') {
	// 	  if (this.registrationForm.value.fTitle != null) {
	// 		this.isMother = true;
	// 		this.ismlabel= false;
	// 		this.registrationForm.controls.motherName.setValue('');
	// 		this.registrationForm.controls.mTitle.setValue(null);
	// 		mTitle.clearValidators();
	// 		motherName.clearValidators();
	// 	  } else {
	// 		this.ismlabel= true;
	// 		this.isMother = false;
	// 		mTitle.setValidators([Validators.required]);
	// 		motherName.setValidators([Validators.required]);
	// 	  }
	// 	  if (this.registrationForm.value.mTitle != null) {
	// 		this.isFather = true;
	// 		this.isflabel = false;
	// 		this.registrationForm.controls.fatherName.setValue('');
	// 		this.registrationForm.controls.fTitle.setValue(null);
	// 		fTitle.clearValidators();
	// 		fatherName.clearValidators();
	// 	  } else {
	// 		this.isFather = false;
	// 		this.isflabel = true;
	// 		fTitle.setValidators([Validators.required]);
	// 		fatherName.setValidators([Validators.required]);
	// 	  }
	// 	}
	// 	mTitle.updateValueAndValidity();
	// 	motherName.updateValueAndValidity();
	// 	fTitle.updateValueAndValidity();
	// 	fatherName.updateValueAndValidity();
	//   }


	//avoidSpace on email roll no
	avoidSpace(event) {
		let k = event.keyCode;
		if (k == 32) return false;
	}

	avoidNumber(event) {
		if (event.keyCode >= 48 && event.keyCode <= 57) return false;
	}

	goToDashboard() {
		this.router.navigate(['candidate/dashboard']);
	}


	showOTPDialog() {
		if (this.registrationForm.valid) {
			this.spinner.show();
			this.displayOTPbox = true;

			const email = this.registrationForm.get('email').value;
			const studentPersonalContactNo = this.registrationForm.get('studentPersonalContactNo').value;

			this.registrationService.getregistrationvrfotp(email, studentPersonalContactNo).then(res => {
				console.log(res);
				this.spinner.hide();
				if (res.status === "success") {
					this.otpValue = res.regotp;
					this.timerCounter();
				} else {
					alert("Please Try Again Later");
				}
			});

		} else {
			alert("Please Properly Fillup General Information");
		}
	}

	// closeOtpBox(){
	//       this.displayOTPbox = false;
	//       this.count = 0;
	// }

	onOtpSubmit() {
		if (this.otpForm.valid) {
			if (this.otpForm.value.otpfield === this.otpValue) {
				//  alert("otp matched");
				///this.fieldReadonly = true;
				this.disabledField = false;
				this.getOTPbutton = false;
				this.displayOTPbox = false;
				//  console.log(this.otpForm.value.otpfield,this.otpValue)
			} else {
				// console.log(this.otpForm.value.otpfield,this.otpValue)
				//this.fieldReadonly = false;
				alert("OTP Does Not Match! Try Again");
				this.disabledField = true;
				this.getOTPbutton = true;
				this.displayOTPbox = false;
				this.otpForm.get('otpfield').setValue(null);
				this.registrationForm.get('studentPersonalContactNo').enable();
				this.registrationForm.get('email').enable();
			}
		} else {
			Object.keys(this.otpForm.controls).forEach(ctrl => {
				this.otpForm.controls[ctrl].markAsDirty();
			});
		}
	}

	timerCounter() {
		// this.count = 5;
		setTimeout(() => {
			//   if (this.count > 0) {
			// this.count -= 1;
			//  } else {
			//     clearInterval(this.timeout);
			//     this.displayOTPbox = false;
			//     this.otpForm.disable();
			//     this.count = 0;
			//  }
			this.displayOTPbox = false;
		}, 900000);
	}

	//--------add by JD --------//

	onCategorySelected(castId: number) {
		if (castId > 1) {
			this.castPopup = true;
			this.displayModal = true;
		}
	}

	yesBtn() {
		this.castPopup = false;
		this.displayModal = false;
		this.selectState = true;
		this.displayModal2 = true;

	}

	noBtn() {
		this.castPopup = false;
		this.displayModal = false;
		this.noCertificate = true;
		this.displayModal1 = true;

	}

	genCaste() {
		this.noCertificate = false;
		this.displayModal1 = false;
		this.registrationForm.patchValue({
			categoryId: 1
		});
	}

	myState() {
		this.selectState = false;
		this.displayModal2 = false;
	}

	otherState() {
		this.selectState = false;
		this.displayModal2 = false;
		this.setGeneralCaste = true;
		this.displayModal3 = true;
	}

	okBtn() {
		this.setGeneralCaste = false;
		this.displayModal3 = false;
		this.registrationForm.patchValue({
			categoryId: 1
		});
	}
	//----------end by JD ----------//


}
