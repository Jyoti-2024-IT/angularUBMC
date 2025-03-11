import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { RegistrationService } from '../../services/registration.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder,
	FormArray,
	FormControlDirective,
	FormControlName
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-academic-information',
	templateUrl: './academic-information.component.html',
	styleUrls: ['./academic-information.component.scss']
})
export class AcademicInformationComponent implements OnInit {
	msgs: Message[] = [];
	msgserror: Message[] = [];
	msgMarksEntry: Message[] = [];
	msgInstDetails: Message[] = [];
	alertMsg: Message[] = [];
	activeIndex = 1;

	cars: any[];
	cols: any[];

	marksEntryDialogDisplay: boolean;
	instDetailsDialogDisplay: boolean;

	academicForm: FormGroup;

	dataList: any;
	// isOtherInst: boolean = true;
	isOtherState: boolean = true;
	isOtherCity: boolean = true;
	otherOption: boolean = false;
	isPrevUniv: boolean = true;
	countryId: any;
	stateId: any;
	data: any;
	newRow: any;
	token: any;
	isCuRegCourseTypePrevColg: boolean = true;
	isError: boolean = false;
	showclose = false;
	enableOtherBoard = true;
	// regnoValidPattern = Validators.pattern(/^\d{3}+'-'+\d{4}+'-'+\d{4}+'-'+\d{2}$/);

	public boardList = [];
	public englishSubjects = [];
	public nonEnglishSubjects = [];

	public englishSubjectsHidden = [];
	public nonEnglishSubjectsHidden = [];

	public lastInstituteList = [];
	public allcountrylist = [];
	public stateList = [];
	public cityList = [];
	public instMediumList = [];
	public passingYearList = [];
	public prvcourseTypeList = [];
	public prevCollegeList = [];
	public prevstreamList = [];
	public patchList = [];
	public gradeList = [];
	public levelList = [];
	public passfailList = [];
	totalMarks: any;
	theoryFullMarks: any;
	practicalFullMarks: any;
	theoryPassMarks: any;
	practicalPassMarks: any;
	paperType: any;
	type: boolean = false;
	disablePracticalMarks: boolean = false;
	disablePassInst: boolean = true;
	passfail: any;
	disablesubmit = false;
	disablesubmit1 = false;

	onlyNumeric = "^[0-9]*$";
	boardid: any;
	recentYear = new Date().getFullYear();
	cityId: any;



	// @ViewChild('fullMarks') inputs : ElementRef;
	// @ViewChild('obtainmarks') inputmarks : ElementRef;

	constructor(
		private registrationService: RegistrationService,
		private fb: FormBuilder,
		private router: Router,
		private spinner: NgxSpinnerService
	) {
		// custom focus on form input
		// const originFormControlNgOnChanges = FormControlDirective.prototype.ngOnChanges;
		// FormControlDirective.prototype.ngOnChanges = function () {
		// 	this.form.nativeElement = this.valueAccessor._elementRef.nativeElement;
		// 	return originFormControlNgOnChanges.apply(this, arguments);
		// };

		// const originFormControlNameNgOnChanges = FormControlName.prototype.ngOnChanges;
		// FormControlName.prototype.ngOnChanges = function () {
		// 	const result = originFormControlNameNgOnChanges.apply(this, arguments);
		// 	this.control.nativeElement = this.valueAccessor._elementRef.nativeElement;
		// 	return result;
		// };
	}

	ngOnInit() {
		this.spinner.show();
		this.alertMsg = [];
		this.msgs = [];
		this.msgs.push({ severity: 'info', summary: 'Please Note :' });

		this.msgs.push({
			severity: 'info',
			detail:
				'1. Fail / Compartmental students are not allowed to apply as per North Bengal University norms.'
		});
		this.msgs.push({
			severity: 'info',
			detail:
				'2. Fill-up your marks as per your class XII Board marksheet in the marks entry option.'
		});

		this.msgs.push({
			severity: 'info',
			detail:
				'3. Once Board / Marks & Institute details are filled up, please click on Submit button to save and continue for course selection.'
		});

		this.msgMarksEntry = [];
		this.msgMarksEntry.push({ severity: 'info', summary: 'Please Note :' });
		this.msgMarksEntry.push({
			severity: 'info',
			detail: 'i. Please enter all Subjects Marks as per Class XII Board MarkSheet'
		});
		this.msgMarksEntry.push({
			severity: 'info',
			detail:
				'For Example : If you have Five Subjects then Marks of Five Subjects have to be Entered.'
		});
		this.msgMarksEntry.push({
			severity: 'info',
			detail:
				'ii.  Applicants having Class XII Board result as "Pass" but having failed subject(s) are required to put in their Pass subject marks only.'
		});
		this.msgMarksEntry.push({
			severity: 'info',
			detail: 'iii. English Marks must be Entered.'
		});
		// this.msgMarksEntry.push({
		// 	severity: 'info',
		// 	detail:
		// 		'iv. In case of WB Board, Subjects having both Theory and Practical, marks is to be entered separately in respective columns. '
		// });
		this.msgMarksEntry.push({
			severity: 'info',
			detail:
				'iv. Please do not Enter SUPW / SUPW & Community Services Marks / Grade.'
		});
		this.autoLogin();
		// this.msgInstDetails = [];
		// this.msgInstDetails.push({ severity: 'info', summary: 'Please Note :' });
		// this.msgInstDetails.push({
		// 	severity: 'info',
		// 	detail:
		// 		'i.  Sr. No. j to m is applicable for students who have cleared class XII board exam in or before year 2023.'
		// });
		// this.msgInstDetails.push({
		// 	severity: 'info',
		// 	detail:
		// 		'ii. Sr. No. 22 And 23 is applicable only for those students who are pre-registered under Calcutta University.'
		// });

		this.cars = [
			{
				vin: 'ee8a89d8',
				brand: 'Fiat',
				year: 1987,
				color: 'Maroon'
			}
		];

		this.cols = [
			{ field: 'vin', header: 'Serial No' },
			{ field: 'year', header: 'Board/University' },
			{ field: 'brand', header: 'Subjectwise Marks' },
			{ field: 'color', header: 'Institute Details' }
		];

		this.passfailList = [
			{
				'id': 1,
				'name': 'Pass'
			}, {
				'id': 2,
				'name': 'Fail'
			}, {
				'id': 3,
				'name': 'Compartmental'
			}
		];
		//alert(localStorage.getItem('meritlisted') );
		// if (localStorage.getItem('meritlisted') === "yes") {
		// 	this.disablesubmit1 = true;
		// }

		if (localStorage.getItem('confirmed') === "yes") {
			this.disablesubmit1 = true;
		}

		this.passfail = 0;
		this.registrationService
			.getAcademicList(localStorage.getItem('authToken'))
			.then(commonList => {
				// console.log(commonList);
				this.dataList = commonList;
				this.boardList = commonList.boardlist;
				// console.log(this.boardList);
				// this.englishSubjects = commonList.EngList;
				// this.nonEnglishSubjects = commonList.allpaperlist;
				this.lastInstituteList = this.dataList.LastInstListforXI;
				this.allcountrylist = this.dataList.allcountrylist;
				this.instMediumList = this.dataList.instMediumList;
				this.passingYearList = this.dataList.yearOfPassing;
				this.prvcourseTypeList = this.dataList.prvcourseTypeList;
				this.prevCollegeList = this.dataList.PrvInstListforGRD;
				this.gradeList = this.dataList.gradelist;
				this.levelList = this.dataList.levellist
				this.spinner.hide();
			});

		this.academicForm = this.fb.group({
			boardId: [null, Validators.required],
			otherBoardName: [''],
			regno: [''],
			lastschoolId: ['-1'],
			schoolCountryId: [null, Validators.required],
			stateId: [null, Validators.required],
			schoolcityId: [null, Validators.required],
			mediumofInstruction: [null, Validators.required],
			yearofPassing: [null, Validators.required],
			prevadmitted: [null],
			prevcrshdrid: [null],
			previnstid: [null],
			sciencebg: [null, Validators.required],
			lastschoolName: [null,Validators.required],
			otherSchoolState: [null],
			otherSchoolCity: [null],
			prevregno: [null],
			id: [null],
			parent_id: [null],
			degreeCourseId: ['2'],
			degreeId: ['2'],
			subjectDetailInfo: this.fb.array([]),
			uniqueNo: [''],
			wbIdNo: [''],
			cbseRollNo: [''],
			niosRollNo: ['']
		});
		if (localStorage.getItem('step') == '') {
			this.showclose = true;
		}

		// this.enableOtherInst(); //temp jd
	}

	patchForm() {
		this.token = JSON.parse(localStorage.getItem('userDetails'));
		this.token = '';
		this.token = JSON.parse(localStorage.getItem('userDetails'));
		//console.log(this.token.academicDetailInfo[0].subjectDetailInfo[0].fullMarks);
		//newly added condition
		if (this.token.academicDetailInfo[0] != undefined) {
			this.disablePassInst = false;
			this.passfail = 1;
			this.academicForm.patchValue(this.token.academicDetailInfo[0]);
			this.getStateCity(
				this.token.academicDetailInfo[0].schoolCountryId,
				this.token.academicDetailInfo[0].stateId, 
				this.token.academicDetailInfo[0].schoolcityId,
			)
			if (this.token.academicDetailInfo[0].boardId == -1) {
				this.enableOtherBoard = false;
			}
			if (this.token.academicDetailInfo[0].subjectDetailInfo[0].fullMarks != null) {
				this.paperType = 'Theory Practical';
				this.setMarks();
			}
			else if (this.token.academicDetailInfo[0].subjectDetailInfo[0].gradeid != null) {
				this.paperType = 'Grade Level';
				this.setGrade();
			}
		}

		this.academicForm.controls.lastschoolId.setValue('-1'); //temp jd
		// this.enableOtherInst();
		// this.enablePrevuniv();
		// this.enableCuRegCoursTypPrevClg();

	}
	setMarks() {
		this.spinner.show();
		let token = localStorage.getItem('authToken');
		let id = this.token.academicDetailInfo[0].boardId;
		this.registrationService.getPaperList(token, id).then(res => {
			this.englishSubjects = res.EngList;
			this.nonEnglishSubjects = res.allpaperlist;
			this.englishSubjectsHidden = res.EngList;
			this.nonEnglishSubjectsHidden = res.allpaperlist;
			this.spinner.hide();
		});
		let control = <FormArray>this.academicForm.controls.subjectDetailInfo;
		const controlArray = <FormArray>this.academicForm.get('subjectDetailInfo');
		this.token.academicDetailInfo[0].subjectDetailInfo.forEach((x, index) => {
			control.push(
				this.fb.group({
					paperName: x.paperName,
					fullMarks: x.fullMarks,
					obtainmarks: x.obtainmarks,
					id: x.id,
					parent_id: x.parent_id,
					theoryFullMarks: x.theoryFullMarks,
					practicalFullMarks: x.practicalFullMarks,
					theoryPassMarks: x.theoryPassMarks,
					practicalPassMarks: x.practicalPassMarks,
					theoryMarksobtained: x.theoryMarksobtained,
					practicalMarksobtained: x.practicalMarksobtained
				})
			);
			if (x.practicalMarksobtained == null) {
				controlArray.controls[index].get('practicalMarksobtained').disable();
			}
		});
	}

	setGrade() {
		let token = localStorage.getItem('authToken');
		let id = this.token.academicDetailInfo[0].boardId;
		this.registrationService.getPaperList(token, id).then(res => {
			this.englishSubjects = res.EngList;
			this.nonEnglishSubjects = res.allpaperlist;
		});
		let control = <FormArray>this.academicForm.controls.subjectDetailInfo;
		this.token.academicDetailInfo[0].subjectDetailInfo.forEach(x => {
			control.push(
				this.fb.group({
					id: x.id,
					parent_id: x.parent_id,
					paperName: x.paperName,
					gradeid: x.gradeid,
					levelid: x.levelid
				})
			);
		});
	}


	showMarksEntryDialog() {
		if (this.academicForm.value.boardId == null) {
			this.alertMsg = [];
			this.alertMsg.push({ severity: 'error', summary: 'Error Message', detail: 'Please select Board' });
			return false;
		}
		const arr = <FormArray>this.academicForm.controls['subjectDetailInfo'];
		//arr.controls = [];
		this.marksEntryDialogDisplay = true;
		if (arr.length < 4) {
			for (let i = 1; i <= 4; i++) {
				this.addMarks();
			}
		}
	}

	donemarksEntry() {
		const control = this.academicForm.value.subjectDetailInfo;
		const controlArray = <FormArray>this.academicForm.get('subjectDetailInfo');
		if (this.paperType === 'Theory Practical') {
			for (let i = 0; i < control.length; i++) {
				if (control[i].paperName == 0) {
					this.msgserror = [];
					this.msgserror.push({
						severity: 'error',
						summary: 'Please select subject at row no.' + (1 + i)
					});
					return false;
				}
				if (control[i].theoryFullMarks > 0 && control[i].theoryMarksobtained == '') {
					this.msgserror = [];
					this.msgserror.push({
						severity: 'error',
						summary: 'Please enter Marks Obtained at row no.' + (1 + i)
					});
					return false;
				}
				// if (control[i].practicalFullMarks > 0 && control[i].practicalMarksobtained == '') {
				// 	this.msgserror = [];
				// 	this.msgserror.push({
				// 		severity: 'error',
				// 		summary: 'Please enter Practical Marks Obtained at row no.' + (1 + i)
				// 	});
				// 	return false;
				// }

				// if (Number(control[i].practicalMarksobtained) > Number(control[i].practicalFullMarks)) {
				// 	controlArray.controls[i].get('practicalMarksobtained').setValue('');
				// 	this.msgserror = [];
				// 	this.msgserror.push({
				// 		severity: 'error',
				// 		summary: 'Please enter Valid Practical Marks Obtained at row no.' + (1 + i)
				// 	});
				// 	return false;
				// }

				if (Number(control[i].theoryMarksobtained) > Number(control[i].fullMarks)) {
					controlArray.controls[i].get('theoryMarksobtained').setValue('');
					this.msgserror = [];
					this.msgserror.push({
						severity: 'error',
						summary: 'Please enter Valid Marks Obtained at row no.' + (1 + i)
					});
					return false;
				}
			}
			var count = 0;
			for (let i = 0; i < control.length; i++) {
				if (Number(control[i].theoryMarksobtained) === Number(control[i].fullMarks)) {
					count++;
				}
			}
			if (Number(count) === 4) {
				this.msgserror.push({
					severity: 'error',
					summary: 'Total Full Marks and Total Marks Obtained should not be same. Please correct your mistake in your Marks Entry to proceed.'
				});
				//alert("Total Full Marks and Total Marks Obtained should not be same. Please correct your mistake in your Marks Entry to proceed.");
				return false;
			}
		}
		if (this.paperType === 'Grade Level') {
			for (let i = 0; i < control.length; i++) {
				if (control[i].paperName == 0) {
					this.msgserror = [];
					this.msgserror.push({
						severity: 'error',
						summary: 'Please select subject at row no.' + (1 + i)
					});
					return false;
				}

				if (control[i].gradeid == 0) {
					this.msgserror = [];
					this.msgserror.push({
						severity: 'error',
						summary: 'Please select Grade at row no.' + (1 + i)
					});
					return false;
				}
				// if (control[i].levelid == 0) {
				// 	this.msgserror = [];
				// 	this.msgserror.push({
				// 		severity: 'error',
				// 		summary: 'Please select Level at row no.' + (1 + i)
				// 	});
				// 	return false;
				// }
			}
		}
		//console.log(this.academicForm.value.subjectDetailInfo);
		this.marksEntryDialogDisplay = false;
	}

	checkRepeat(i, e) {
		const p = e.target.value;
		let marksdata = [];
		marksdata = this.academicForm.value.subjectDetailInfo;
		for (let n = 0; n < marksdata.length; n++) {
			if (n !== i) {
				if (marksdata[n].paperName == p) {
					e.target.value = 0;
					return false;
				}
			}
		}
	}

	addMarks() {
		const control = <FormArray>this.academicForm.controls['subjectDetailInfo'];
		let newMarksGroup: FormGroup = this.initItems();
		control.push(newMarksGroup);
	}
	initItems(): FormGroup {
		if (this.paperType === 'Theory Practical') {
			return this.fb.group({
				paperName: ['0', Validators.required],
				fullMarks: ['', Validators.required],
				obtainmarks: [null, Validators.required],
				id: [''],
				parent_id: ['0'],
				theoryFullMarks: [],
				practicalFullMarks: [],
				theoryPassMarks: [],
				practicalPassMarks: [],
				theoryMarksobtained: [''],
				practicalMarksobtained: ['']
			});
		}
		else if (this.paperType === 'Grade Level') {
			return this.fb.group({
				id: [''],
				parent_id: ['0'],
				paperName: ['0', Validators.required],
				gradeid: ['0', Validators.required],
				levelid: ['0', Validators.required],
			});
		}

		//this.englishSubjects[0].paperName.split("~!~")[4]
	}

	removeMarks(index, id) {
		const control = <FormArray>this.academicForm.controls['subjectDetailInfo'];
		control.removeAt(index);
		if (id != undefined) {
			this.registrationService.deleteRowByMarksId(id).subscribe(data => {
				alert('successfully deleted');
			});
		}
	}

	getStateCity(x, y, z) {
		this.countryId = x;
		this.stateId = y;
		this.cityId = z;
		if (x == 1) {
			this.otherOption = false;
		} else {
			this.otherOption = true;
		}
		this.registrationService.getStateCity(x, y, z).subscribe(data => {
			this.stateList = [];
			this.cityList = [];
			this.dataList = data;
			this.stateList = this.dataList.stateList;
			this.cityList = this.dataList.cityList;
		});
	}
	// enableOtherInst() {
	// 	// console.log("hi", this.academicForm.value.lastschoolId);
	// 	const lastschoolName = this.academicForm.get('lastschoolName');
	// 	if (this.academicForm.value.lastschoolId == null) {
	// 			// this.academicForm.controls.lastschoolId.setValue('-1');
	// 			this.isOtherInst = false;
	// 			lastschoolName.setValidators([Validators.required]);
	// 	     } 
	// 	// else {
	// 	// 	this.academicForm.controls.lastschoolName.setValue(null);
	// 	// 	this.isOtherInst = true;
	// 	// 	lastschoolName.clearValidators();
	// 	// }
	// 	lastschoolName.updateValueAndValidity();
	// }

	enableOtherState() {
		const otherSchoolState = this.academicForm.get('otherSchoolState');
		if (this.academicForm.value.stateId == '-1') {
			this.isOtherState = false;
			otherSchoolState.setValidators([Validators.required]);
		} else {
			this.academicForm.controls.otherSchoolState.setValue(null);
			this.isOtherState = true;
			otherSchoolState.clearValidators();
		}
		otherSchoolState.updateValueAndValidity();
	}

	enableOtherCity() {
		const otherSchoolCity = this.academicForm.get('otherSchoolCity');
		if (this.academicForm.value.schoolcityId == '-1') {
			this.isOtherCity = false;
			otherSchoolCity.setValidators([Validators.required]);
		} else {
			this.academicForm.controls.otherSchoolCity.setValue(null);
			this.isOtherCity = true;
			otherSchoolCity.clearValidators();
		}
		otherSchoolCity.updateValueAndValidity();
	}

	// enableCuRegCoursTypPrevClg() {
	// 	const prevregno = this.academicForm.get('prevregno');
	// 	const prevcrshdrid = this.academicForm.get('prevcrshdrid');
	// 	const previnstid = this.academicForm.get('previnstid');
	// 	if (this.academicForm.value.prevadmitted == 'YES') {
	// 		this.isCuRegCourseTypePrevColg = false;
	// 		prevregno.setValidators([Validators.required]);
	// 		prevcrshdrid.setValidators([Validators.required]);
	// 		previnstid.setValidators([Validators.required]);
	// 	} else {
	// 		this.isCuRegCourseTypePrevColg = true;
	// 		this.academicForm.controls.prevregno.setValue(null);
	// 		this.academicForm.controls.prevcrshdrid.setValue(null);
	// 		this.academicForm.controls.previnstid.setValue(null);
	// 		prevregno.clearValidators();
	// 		prevcrshdrid.clearValidators();
	// 		previnstid.clearValidators();
	// 	}
	// 	prevregno.updateValueAndValidity();
	// 	prevcrshdrid.updateValueAndValidity();
	// 	previnstid.updateValueAndValidity();
	// }

	showInstDetailsDialog() {
		if (this.academicForm.value.boardId == null) {
			this.alertMsg = [];
			this.alertMsg.push({ severity: 'error', summary: 'Error Message', detail: 'Please select Board' });
			return false;
		}
		if (this.academicForm.value.boardId == 2) {
			this.boardid = 2;
			// this.labelName = "UID";

			const uniqueNo = this.academicForm.get('uniqueNo');
			uniqueNo.setValidators([Validators.maxLength(7), Validators.minLength(7), Validators.pattern(this.onlyNumeric)]);
			uniqueNo.updateValueAndValidity();

			// console.log(this.academicForm.value.boardId);
		}
		if (this.academicForm.value.boardId == 3) {
			this.boardid = 3;

			const wbIdNo = this.academicForm.get('wbIdNo');
			wbIdNo.setValidators([Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.onlyNumeric)]);
			wbIdNo.updateValueAndValidity();
		}
		if (this.academicForm.value.boardId == 10) {
			this.boardid = 10;

			const cbseRollNo = this.academicForm.get('cbseRollNo');
			cbseRollNo.setValidators([ Validators.maxLength(8), Validators.minLength(8), Validators.pattern(this.onlyNumeric)]);
			cbseRollNo.updateValueAndValidity();
		}
		if (this.academicForm.value.boardId == 118) {
			this.boardid = 118;

			const niosRollNo = this.academicForm.get('niosRollNo');
			niosRollNo.setValidators([Validators.maxLength(12), Validators.minLength(12), Validators.pattern(this.onlyNumeric)]);
			niosRollNo.updateValueAndValidity();
		}
		// if (this.academicForm.value.boardId != 2||118||3||10 ) {
		// 	this.boardid = this.academicForm.value.boardId;
		// 	console.log(this.boardid + "  hiiiii");

		// 	const regno = this.academicForm.get('regno');
		// 	regno.setValidators([Validators.required, Validators.maxLength(12), Validators.minLength(12), Validators.pattern(this.onlyNumeric)]);
		// 	regno.updateValueAndValidity();
		// }
		this.instDetailsDialogDisplay = true;
		// this.enableOtherInst();
	}

	doneInstituteDetails() {
		// this.academicForm.controls.lastschoolId.setValue('-1'); //temp jd
		// console.log(this.academicForm.value);
		if (this.academicForm.valid) {
			this.instDetailsDialogDisplay = false;
			// console.log("valid")
		} else {
			// console.log("invalid")
			// let invalid = <FormControl[]>Object.keys(this.academicForm.controls).map(key => this.academicForm.controls[key]).filter(ctl => ctl.invalid);
			// if (invalid.length > 0) {
			// 	let invalidElem: any = invalid[0];
			// 	invalidElem.nativeElement.focus();
			// 	Object.keys(this.academicForm.controls).forEach(control => {
			// 		this.academicForm.controls[control].markAsDirty();
			// 	});
			// 	return false;
			// }
			Object.keys(this.academicForm.controls).forEach(control => {
				this.academicForm.controls[control].markAsDirty();
			});
		}
	}
	// enablePrevuniv() {
	// 	const prevadmitted = this.academicForm.get('prevadmitted');
	// 	if (this.academicForm.value.yearofPassing == this.recentYear || this.academicForm.value.yearofPassing == null) {
	// 		this.isPrevUniv = true;
	// 		this.academicForm.controls.prevadmitted.setValue(null);
	// 		this.enableCuRegCoursTypPrevClg();
	// 		prevadmitted.clearValidators();
	// 	} else {
	// 		prevadmitted.setValidators([Validators.required]);
	// 		this.isPrevUniv = false;
	// 	}
	// 	prevadmitted.updateValueAndValidity();
	// }
	saveAcademicdetails() {
		const control = this.academicForm.value.subjectDetailInfo;
		this.academicForm.controls.lastschoolId.setValue('-1');
		// console.log(this.academicForm.controls.lastschoolId)
		if (this.paperType === 'Theory Practical') {
			for (let i = 0; i < control.length; i++) {
				if (control[i].paperName == 0) {
					this.msgserror = [];
					this.msgserror.push({
						severity: 'error',
						summary: 'Please select subject at row no.' + (1 + i)
					});
					return false;
				}
				if (control[i].theoryFullMarks > 0 && control[i].theoryMarksobtained == '') {
					this.msgserror = [];
					this.msgserror.push({
						severity: 'error',
						summary: 'Please enter Theory Marks Obtained at row no.' + (1 + i)
					});
					return false;
				}
				if (control[i].practicalFullMarks > 0 && control[i].practicalMarksobtained == '') {
					this.msgserror = [];
					this.msgserror.push({
						severity: 'error',
						summary: 'Please enter Practical Marks Obtained at row no.' + (1 + i)
					});
					return false;
				}
				// if (control[i].practicalFullMarks == 0 && control[i].practicalMarksobtained == '') {
				// 	this.msgserror = [];
				// 	this.msgserror.push({
				// 		severity: 'error',
				// 		summary: 'Please enter Practical Marks Obtained at row no.' + (1 + i)
				// 	});
				// 	return false;
				// }
				if (Number(control[i].practicalMarksobtained) > Number(control[i].practicalFullMarks)) {
					this.msgserror = [];
					this.msgserror.push({
						severity: 'error',
						summary: 'Please enter Valid Practical Marks Obtained at row no.' + (1 + i)
					});
					return false;
				}

				if (Number(control[i].theoryMarksobtained) > Number(control[i].fullMarks)) {
					this.msgserror = [];
					this.msgserror.push({
						severity: 'error',
						summary: 'Please enter Valid Theory Marks Obtained at row no.' + (1 + i)
					});
					return false;
				}
			}
		}
		if (this.paperType === 'Grade Level') {
			for (let i = 0; i < control.length; i++) {
				if (control[i].paperName == 0) {
					this.msgserror = [];
					this.msgserror.push({
						severity: 'error',
						summary: 'Please select subject at row no.' + (1 + i)
					});
					return false;
				}

				if (control[i].gradeid == 0) {
					this.msgserror = [];
					this.msgserror.push({
						severity: 'error',
						summary: 'Please select Grade at row no.' + (1 + i)
					});
					return false;
				}
			}
		}
		if (this.academicForm.valid) {
			let token = localStorage.getItem('authToken');
			this.data = {
				academicDetailInfo: [this.academicForm.value]
			};
			const control = this.academicForm.value.subjectDetailInfo;
			if (control.length < 4) {
				this.alertMsg.push({
					severity: 'error',
					summary: 'Please complete Subjectwise Marks'
				});
				return false;
			}
			if (control.length == 4) {
				for (let i = 0; i < control.length; i++) {
					if (control[i].paperName == 0) {
						this.alertMsg.push({
							severity: 'error',
							summary:
								'Please select subject at row no.' +
								(1 + i) +
								' in Marks Details'
						});
						return false;
					}
				}
			}
			// if (this.academicForm.value.regno == null) {
			// 	this.alertMsg.push({
			// 		severity: 'error',
			// 		summary: 'Please complete Institute Details'
			// 	});
			// 	return false;
			// }

			this.spinner.show();

			this.registrationService
				.saveAcademicDetails(token, this.data)
				.subscribe(data => {
					this.spinner.hide();
					alert('Academic data saved.');
					if (localStorage.getItem('step') !== '') {
						this.router.navigate(['admission/course-information']);
					} else {
						this.router.navigate(['admission/course-information']);
					}

				});
		} else {
			const control = this.academicForm.value.subjectDetailInfo;
			if (control.length < 4) {
				this.alertMsg.push({
					severity: 'error',
					summary: 'Please complete Subjectwise Marks'
				});
				return false;
			}
			// if (this.academicForm.value.regno == null) {
			// 	this.alertMsg.push({
			// 		severity: 'error',
			// 		summary: 'Please complete Institute Details'
			// 	});
			// 	return false;
			// }
			alert("Please complete Institute Details")
			console.log('Form Not Submitted!');
			// console.log(this.academicForm);
			Object.keys(this.academicForm.controls).forEach(control => {
				this.academicForm.controls[control].markAsDirty();
			});
		}
	}
	autoLogin() {
		this.registrationService
			.loginByToken(localStorage.getItem('authToken'))
			.subscribe(
				data => {
					// console.log(data);
					this.dataList = data;
					localStorage.setItem('authToken', this.dataList.authToken);
					localStorage.setItem(
						'userDetails',
						JSON.stringify(this.dataList.userDetails)
					);
					localStorage.setItem('step', this.dataList.step);
					this.patchForm();
				},
				err => console.log(err),
				() => console.log('Request Completed')
			);
	}
	checkRegNo() {
		if (this.academicForm.controls.regno.dirty) {
			this.registrationService.checkregNumber(this.academicForm.value.regno).subscribe(data => {
				this.dataList = data;
				if (this.dataList.status == "success") {
					this.alertMsg.push({ severity: 'error', summary: 'Error Message', detail: "Registration Number Already Exists." });
					this.academicForm.controls.regno.setValue(null);
				}
			})
		}
	}

	closemarksEntry() {
		this.marksEntryDialogDisplay = false;
	}

	closeInstDtls() {
		this.instDetailsDialogDisplay = false;
		delete this.boardid;
	}

	getPaperList() {
		this.spinner.show();
		if (this.academicForm.value.boardId == -1) {
			this.enableOtherBoard = false;
			this.academicForm.get('otherBoardName').setValidators([Validators.required]);
		}
		else {
			this.enableOtherBoard = true;
			this.academicForm.get('otherBoardName').setValue('');
			this.academicForm.get('otherBoardName').clearValidators();
		}
		const arr = <FormArray>this.academicForm.controls['subjectDetailInfo'];
		arr.controls = [];
		let id = this.academicForm.value.boardId;
		let token = localStorage.getItem('authToken');
		this.theoryFullMarks = '';
		this.practicalFullMarks = '';
		this.theoryPassMarks = '';
		this.practicalPassMarks = '';
		// console.log(id);
		if (id != null) {
			this.registrationService.getPaperList(token, id).then(res => {
				this.spinner.hide();
				// console.log(res);
				this.englishSubjects = res.EngList;
				this.nonEnglishSubjects = res.allpaperlist;
				this.paperType = res.EngList[0].paperName.split("~!~")[1];

				this.englishSubjectsHidden = res.EngList;
				this.nonEnglishSubjectsHidden = res.allpaperlist;
				// this.theoryFullMarks = this.englishSubjects[0].paperName.split("~!~")[2];
				// this.practicalFullMarks = this.englishSubjects[0].paperName.split("~!~")[4];
				// this.theoryPassMarks = this.englishSubjects[0].paperName.split("~!~")[3];
				// this.practicalPassMarks = this.englishSubjects[0].paperName.split("~!~")[5];
			})
		} else {
			this.spinner.hide();
		}
	}
	calculateMarks(index) {
		const controlArray = <FormArray>this.academicForm.get('subjectDetailInfo');
		let marksdata = [];
		marksdata = this.academicForm.value.subjectDetailInfo;
		let pracmark = marksdata[index].practicalMarksobtained;
		let theroymark = Number(marksdata[index].theoryMarksobtained);
		if (pracmark == undefined) {
			pracmark = 0;
		}
		controlArray.controls[index].get('obtainmarks').setValue(theroymark + Number(pracmark));
	}

	getengpassmarks(index) {
		const control = this.academicForm.value.subjectDetailInfo;
		const controlArray = <FormArray>this.academicForm.get('subjectDetailInfo');
		controlArray.controls[index].get('theoryFullMarks').setValue('');
		controlArray.controls[index].get('practicalFullMarks').setValue('');
		controlArray.controls[index].get('theoryPassMarks').setValue('');
		controlArray.controls[index].get('practicalPassMarks').setValue('');
		controlArray.controls[index].get('fullMarks').setValue('');
		controlArray.controls[index].get('theoryMarksobtained').setValue('');
		controlArray.controls[index].get('practicalMarksobtained').setValue('');
		controlArray.controls[index].get('obtainmarks').setValue('');
		for (let i = 0; i < this.englishSubjectsHidden.length; i++) {
			control[index].practicalFullMarks = 0;
			if (control[index].paperName == this.englishSubjectsHidden[i].id) {
				controlArray.controls[index].get('theoryFullMarks').setValue(this.englishSubjectsHidden[i].paperName.split("~!~")[2]);
				controlArray.controls[index].get('practicalFullMarks').setValue(this.englishSubjectsHidden[i].paperName.split("~!~")[4]);
				controlArray.controls[index].get('theoryPassMarks').setValue(this.englishSubjectsHidden[i].paperName.split("~!~")[3]);
				controlArray.controls[index].get('practicalPassMarks').setValue(this.englishSubjectsHidden[i].paperName.split("~!~")[5]);
				controlArray.controls[index].get('fullMarks').setValue(Number(this.englishSubjectsHidden[i].paperName.split("~!~")[2]) + Number(this.englishSubjectsHidden[i].paperName.split("~!~")[4]));
				if (this.englishSubjectsHidden[i].paperName.split("~!~")[4] == 0) {
					controlArray.controls[index].get('practicalMarksobtained').disable();
				}
				else {
					controlArray.controls[index].get('practicalMarksobtained').enable();
				}
				break;
			}
		}
	}

	getallsubpassmarks(index) {
		const control = this.academicForm.value.subjectDetailInfo;
		const controlArray = <FormArray>this.academicForm.get('subjectDetailInfo');
		controlArray.controls[index].get('theoryFullMarks').setValue('');
		controlArray.controls[index].get('practicalFullMarks').setValue('');
		controlArray.controls[index].get('theoryPassMarks').setValue('');
		controlArray.controls[index].get('practicalPassMarks').setValue('');
		controlArray.controls[index].get('fullMarks').setValue('');
		controlArray.controls[index].get('theoryMarksobtained').setValue('');
		controlArray.controls[index].get('practicalMarksobtained').setValue('');
		controlArray.controls[index].get('obtainmarks').setValue('');
		for (let i = 0; i < this.nonEnglishSubjectsHidden.length; i++) {
			if (control[index].paperName == this.nonEnglishSubjectsHidden[i].id) {
				controlArray.controls[index].get('theoryFullMarks').setValue(this.nonEnglishSubjectsHidden[i].paperName.split("~!~")[2]);
				controlArray.controls[index].get('practicalFullMarks').setValue(this.nonEnglishSubjectsHidden[i].paperName.split("~!~")[4]);
				controlArray.controls[index].get('theoryPassMarks').setValue(this.nonEnglishSubjectsHidden[i].paperName.split("~!~")[3]);
				controlArray.controls[index].get('practicalPassMarks').setValue(this.nonEnglishSubjectsHidden[i].paperName.split("~!~")[5]);
				controlArray.controls[index].get('fullMarks').setValue(Number(this.nonEnglishSubjectsHidden[i].paperName.split("~!~")[2]) + Number(this.nonEnglishSubjectsHidden[i].paperName.split("~!~")[4]));
				if (this.nonEnglishSubjectsHidden[i].paperName.split("~!~")[4] == 0) {
					controlArray.controls[index].get('practicalMarksobtained').disable();
				}
				else {
					controlArray.controls[index].get('practicalMarksobtained').enable();
				}
				break;
			}
		}

	}

	// enableMarksInstEntry(e){
	// 	if(e.target.value==1){
	// 		this.disablePassInst = false;
	// 	}
	// 	else{
	// 		this.disablePassInst = true;
	// 	}
	// }

	//avoidSpace on board roll no
	avoidSpace(event) {
		let k = event.keyCode;
		if (k == 32) return false;
	}

	goToDashboard() {
		this.router.navigate(['candidate/dashboard']);
	}



}
