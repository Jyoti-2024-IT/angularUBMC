import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { RegistrationService } from '../../services/registration.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Coursedata } from '../../data/coursedata.model';

@Component({
	selector: 'app-course-information',
	templateUrl: './course-information.component.html',
	styleUrls: ['./course-information.component.scss'],
	providers: [ConfirmationService]
})
export class CourseInformationComponent implements OnInit {
	msgs: Message[] = [];
	msgsResponse: Message[] = [];
	responsemsg: Message[] = [];
	activeIndex = 2;
	name: string;
	selectedData: any;
	dataList: any = [];
	tableData: Coursedata[];
	totalAmount: any;
	amount: any;
	coursedata: Coursedata = new Coursedata();
	selectedCourse: Coursedata;
	courseDetailInfo: any[];
	checked = false;
	data: any = [];
	displayConfirmDialog: boolean = false;
	selectedDataToShow = [];
	displayCourseNonEligible = false;
	nonEligiblemsg: any;
	showclose = false;
	cols: any[];
	disablesubmit = false;
	courseOptions: any[];
	preferenceDisabled: boolean = true;
	selCheckboxIds: number[] = [];
	coursepreferenceData = [];
	coursepreference: any;

	constructor(
		private registrationService: RegistrationService,
		private confirmationService: ConfirmationService,
		private router: Router,
		private spinner: NgxSpinnerService
	) { }
	private token = JSON.parse(localStorage.getItem('userDetails'));
	ngOnInit() {
		this.spinner.show();
		this.msgs = [];
		this.msgs.push({ severity: 'info', summary: 'Please Note :' });
		this.msgs.push({
			severity: 'detail',
			summary:
				'i. Course / Session selected here can not be Removed once Saved.'
		});
		this.msgs.push({
			severity: 'detail',
			summary: 'ii. Multiple courses / Session can be added later on using the same login details.'
		});
		// this.msgs.push({
		// 	severity: 'detail',
		// 	summary:
		// 		'iii. Application will be valid for merit list only after payment of Application Fees.'
		// });
		this.msgsResponse = [];
		this.responsemsg = [];
		this.autoLogin();
		this.getEligibleCourseList();
		this.courseDetailInfo = [];
		this.cols = [
			{ field: 'srl', header: 'Srl.' },
			{ field: 'coursenm', header: 'Course / Session Opted For' },
			{ field: 'amount', header: 'Total Application Fees to Pay	(Rs.)' }
		];

		this.courseOptions = [
			{ id: 1, name: 'First Preference' },
			{ id: 2, name: 'Second Preference' },
			{ id: 3, name: 'Third Preference' }
		];
		if (localStorage.getItem('step') == '') {
			this.showclose = true;
		}

		if (localStorage.getItem('meritlisted') === "yes") {
			this.disablesubmit = true;
		}
	}
	getEligibleCourseList() {
		this.registrationService
			.getEligibleCourseListApi(this.token.authToken)
			.subscribe(data => {
				// console.log(data);
				this.dataList = data;
				this.tableData = this.dataList.CoursesList;
				this.amount = this.dataList.amount;
				this.spinner.hide();
				if (this.dataList.CoursesList.length === 0) {
					this.displayCourseNonEligible = true;
					this.nonEligiblemsg = this.dataList.msgcr;
					// this.confirmationService.confirm({
					// 	message: this.dataList.msgcr,
					// 	header: 'Confirmation',
					// 	icon: 'fa fa-question-circle',
					// 	accept: () => {
					// 		this.router.navigate(['admission/academic-information']);
					// 	},
					// 	reject: () => {
					// 		this.router.navigate(['']);
					// 	}
					// });
				}
			});
	}

	acceptcourse() {
		this.displayCourseNonEligible = false;
		this.router.navigate(['admission/academic-information']);
	}
	rejectcourse() {
		this.displayCourseNonEligible = false;
		this.router.navigate(['']);
	}

	calculateAmount(isChecked: boolean, selectRow: any) {
		// console.log(isChecked, selectRow.courseid, this.tableData);
		this.activePreferenceBox(isChecked, selectRow);
		let courses = [...this.tableData];
		for (let i = 0; i < courses.length; i++) {
			// console.log(this.selCheckboxIds, courses);
			if (courses[i].selchxbx) {
				if (this.selCheckboxIds.indexOf(courses[i].courseid) === -1) {
					if (this.selCheckboxIds.length >= 3) {
						alert('You can only select up to 3 courses.');
						courses[i].selchxbx = false;
						courses[i].preferenceDisabled = true;
						return;
					}
					this.selCheckboxIds.push(courses[i].courseid);
				}
			} else {
				const index = this.selCheckboxIds.indexOf(courses[i].courseid);
				if (index !== -1) {
					this.selCheckboxIds.splice(index, 1);
				}
			}
		}


		this.selectedData = {
			courseDetailsInfo: courses
		};
		let n = 0;
		for (let i = 0; i < this.selectedData.courseDetailsInfo.length; i++) {
			if (this.selectedData.courseDetailsInfo[i].selchxbx) {
				n++;
			}
		}
		this.totalAmount = this.amount;
	}

	onPreferenceChange(e) {
		if (!this.coursepreferenceData.some(pref => pref.id === e.coursepreference.id)) {
			this.coursepreferenceData.push({
				id: e.coursepreference.id,
				courseid: e.courseid
			});
		}
	}

	public updateCourseData(selectedData: any) {
		selectedData.courseDetailsInfo.forEach((course: any) => {
			if (course.coursepreference) {
				course.coursepreference = course.coursepreference.id;
			}
		});
		return selectedData;
	}

	// saveCourseSelection() {
	// 	const courses = [...this.tableData];
	// 	this.selectedData = {
	// 		courseDetailsInfo: courses
	// 	};
	// 	let n = 0;
	// 	for (let i = 0; i < this.selectedData.courseDetailsInfo.length; i++) {
	// 		if (this.selectedData.courseDetailsInfo[i].selchxbx) {
	// 			n++;
	// 		}
	// 	}
	// 	if (n === 0) {
	// 		alert('Please select atleast one Course.');
	// 		return false;
	// 	} else {
	// 		this.confirmationService.confirm({
	// 			message:
	// 				'Course / session  selected can not be reversed once submitted. Click <b>`Yes`</b> to continue or <b>`No`</b> to go back to Course selection.',
	// 			header: 'Confirmation',
	// 			icon: 'fa fa-question-circle',
	// 			accept: () => {
	// 				this.registrationService
	// 					.saveCourseSelectionApi(this.token.authToken, this.selectedData)
	// 					.subscribe(data => {
	// 						console.log('data', data);
	// 						this.dataList = data;
	// 						if (this.dataList.status === 'success') {
	// 							this.msgsResponse.push({
	// 								severity: 'success',
	// 								summary: 'Success Message',
	// 								detail: this.dataList.msg
	// 							});
	// 						}
	// 						alert('Course details saved.');
	// 						if(localStorage.getItem('step')!==''){
	// 							this.router.navigate(['admission/additional-information']);
	// 						}
	// 					});
	// 			},
	// 			reject: () => {
	// 				this.msgsResponse = [
	// 					{
	// 						severity: 'error',
	// 						summary: 'Rejected',
	// 						detail: 'You have rejected'
	// 					}
	// 				];
	// 			}
	// 		});
	// 	}
	// }
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
				},
				err => console.log(err),
				() => console.log('Request Completed')
			);
	}

	saveCourseSelection = function () {
		var seenPreferences = [];
		var courses = this.tableData.slice();
		this.selectedData = {
			courseDetailsInfo: courses
		};
		var n = 0;

		// First pass to count selected rows
		for (let i = 0; i < this.selectedData.courseDetailsInfo.length; i++) {
			if (this.selectedData.courseDetailsInfo[i].selchxbx === true) {
				n++; // Count selected rows
			}
		}

		// Second pass to validate preferences
		for (let i = 0; i < this.selectedData.courseDetailsInfo.length; i++) {
			// If checkbox is selected, we perform the validations
			if (this.selectedData.courseDetailsInfo[i].selchxbx === true) {

				// Check if course preference is null
				if (this.selectedData.courseDetailsInfo[i].coursepreference == null) {
					alert('Please select Course Preference for ' + this.selectedData.courseDetailsInfo[i].coursenm + '.');
					return false;
				}

				// Check if two rows are selected and the preference is not 1 or 2
				if (n === 2 && this.selectedData.courseDetailsInfo[i].coursepreference.id !== 1 && this.selectedData.courseDetailsInfo[i].coursepreference.id !== 2) {
					alert('If two courses are selected, only the first and second preferences for the courses are allowed.');
					return false; // Exit if invalid preference
				}

				// Check if only one row is selected and the preference is not 1
				else if (n === 1 && this.selectedData.courseDetailsInfo[i].coursepreference.id !== 1) {
					alert('If one course is selected, only the first preference for the course is allowed.');
					return false; // Exit if invalid preference
				}

				// Check for duplicate course preferences
				if (seenPreferences.includes(this.selectedData.courseDetailsInfo[i].coursepreference.id)) {
					alert('Duplicate Course Preference detected for ' + this.selectedData.courseDetailsInfo[i].coursenm + '.');
					return false; // Exit if duplicate is found
				}

				// Add the course preference ID to the 'seenPreferences' array
				seenPreferences.push(this.selectedData.courseDetailsInfo[i].coursepreference.id);
			}
		}

		for (let i = 0; i < this.selectedData.courseDetailsInfo.length; i++) {
			if (this.selectedData.courseDetailsInfo[i].selchxbx) {
				this.selectedDataToShow.push(this.selectedData.courseDetailsInfo[i]);
			}
		}
		if (n === 0) {
			alert('Please select atleast one Course.');
			return false;
		}
		else {
			this.displayConfirmDialog = true;
			this.updateRowGroupMetaData();
			// this.confirmationService.confirm({
			// 	message:
			// 		'Course / session  selected can not be reversed once submitted. Click <b>`Yes`</b> to continue or <b>`No`</b> to go back to Course selection.',
			// 	header: 'Course Selection Confirmation',
			// 	icon: 'fa fa-question-circle',
			// 	accept: () => {
			// 		this.registrationService
			// 			.saveCourseSelectionApi(this.token.authToken, this.selectedData)
			// 			.subscribe(data => {
			// 				console.log('data', data);
			// 				this.dataList = data;
			// 				if (this.dataList.status === 'success') {
			// 					this.msgsResponse.push({
			// 						severity: 'success',
			// 						summary: 'Success Message',
			// 						detail: this.dataList.msg
			// 					});
			// 				}
			// 				alert('Course details saved.');
			// 				if (localStorage.getItem('step') !== '') {
			// 					this.router.navigate(['admission/additional-information']);
			// 				}
			// 			});
			// 	},
			// 	reject: () => {
			// 		this.msgsResponse = [
			// 			{
			// 				severity: 'error',
			// 				summary: 'Rejected',
			// 				detail: 'You have rejected'
			// 			}
			// 		];
			// 	}
			// });
		}
	};
	updateRowGroupMetaData = function () {
		this.rowGroupMetadata = {};
		if (this.selectedDataToShow) {
			for (var i = 0; i < this.selectedDataToShow.length; i++) {
				var rowData = this.selectedDataToShow[i];
				var selchxbx = rowData.selchxbx;
				if (i == 0) {
					this.rowGroupMetadata[selchxbx] = { index: 0, size: 1 };
				}
				else {
					var previousRowData = this.selectedDataToShow[i - 1];
					var previousRowGroup = previousRowData.selchxbx;
					if (selchxbx === previousRowGroup)
						this.rowGroupMetadata[selchxbx].size++;
					else
						this.rowGroupMetadata[selchxbx] = { index: i, size: 1 };
				}
			}
		}
	};

	accept = function () {
		this.spinner.show();
		this.updateCourseData(this.selectedData);
		this.selectedData = this.selectedData.courseDetailsInfo.map(({ preferenceDisabled, ...rest }) => rest);   // remove preferenceDisabled field
		console.log("submit payload", this.selectedData);
		this.registrationService
			.saveCourseSelectionApi(this.token.authToken, this.selectedData).subscribe(data => {
				// console.log(data);
				this.spinner.hide();
				this.dataList = data;
				if (this.dataList.status === 'success') {
					this.displayConfirmDialog = false;
					this.msgsResponse.push({
						severity: 'success',
						summary: 'Success Message',
						detail: this.dataList.msg
					});
				}
				alert('Course details saved.');
				if (localStorage.getItem('step') !== '') {
					this.router.navigate(['admission/additional-information']);
				}
				else {
					this.router.navigate(['candidate/dashboard']);
				}
			});

	};
	reject = function () {
		this.displayConfirmDialog = false;
		this.selectedDataToShow = [];
		// this.msgsResponse = [
		// 	{
		// 		severity: 'error',
		// 		summary: 'Rejected',
		// 		detail: 'You have rejected'
		// 	}
		// ];
	};

	activePreferenceBox(isChecked: boolean, selectRow: any) {
		this.tableData.forEach(row => {
			if (row.courseid === selectRow.courseid) {
				row.preferenceDisabled = isChecked ? false : true;
			}
			if (isChecked === false) {
				selectRow.coursepreference = null;
			}
		});
	}

	goToDashboard() {
		this.router.navigate(['candidate/dashboard']);
	}
}
