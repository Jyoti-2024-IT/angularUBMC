import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { RegistrationService } from '../../services/registration.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Coursedata } from '../../data/coursedata.model';

@Component({
  selector: 'app-course-application',
  templateUrl: './course-application.component.html',
  styleUrls: ['./course-application.component.scss'],
  providers: [ConfirmationService]
})
export class CourseApplicationComponent implements OnInit {
  msgs: Message[] = [];
  msgsResponse: Message[] = [];
  cols: any[];
  showclose: boolean = false;
  disablesubmit: boolean = false;
  dataList: any = [];
  tableData: Coursedata[];
  amount: any;
  displayCourseNonEligible: boolean = false;
  nonEligiblemsg: any;
  selectedPreference: any;
  preferenceOptions: any[] = [];
  quantityOptions: any[] = [];
  courses: any[] = [];
  preferenceData: any[] = [];
  duplicateCourseSelection: any[] = [];

  constructor(
    private registrationService: RegistrationService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) { }


  private studentDetails = JSON.parse(localStorage.getItem('userDetails'));

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
    this.msgsResponse = [];
    this.autoLogin();
    this.getEligibleCourseList();
    // this.cols = [
    //   { field: 'srl', header: 'Srl.' },
    //   { field: 'coursenm', header: 'Course / Session Opted For' },
    //   { field: 'amount', header: 'Total Application Fees to Pay	(Rs.)' }
    // ];

    this.preferenceOptions = [
      { id: 1, name: 'First Preference' },
      { id: 2, name: 'Second Preference' },
      { id: 3, name: 'Third Preference' }
    ];

    // if (localStorage.getItem('step') == '') {
    // 	this.showclose = true;
    // }

    // if (localStorage.getItem('meritlisted') === "yes") {
    // 	this.disablesubmit = true;
    // }

    this.preferenceData = [
      { selectedPreference: null, selectedCourse: null },
      { selectedPreference: null, selectedCourse: null },
      { selectedPreference: null, selectedCourse: null }
    ];

  }

  autoLogin() {
    this.registrationService
      .loginByToken(localStorage.getItem('authToken'))
      .subscribe(
        data => {
          console.log(data);
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

  getEligibleCourseList() {
    this.registrationService
      .getEligibleCourseListApi(this.studentDetails.authToken)
      .subscribe(data => {
        console.log(data);
        this.dataList = data;
        if (this.dataList.status == 'success') {
          this.tableData = this.dataList.CoursesList;
          console.log(this.tableData);

          this.amount = this.dataList.amount;
          this.spinner.hide();
          // if (this.tableData.length === 0) {
          //   this.displayCourseNonEligible = true;
          //   this.nonEligiblemsg = this.dataList.msgcr;
          //   this.confirmationService.confirm({
          //   	message: this.dataList.msgcr,
          //   	header: 'Confirmation',
          //   	icon: 'fa fa-question-circle',
          //   	accept: () => {
          //   		this.router.navigate(['admission/academic-information']);
          //   	},
          //   	reject: () => {
          //   		this.router.navigate(['']);
          //   	}
          //   });
          // }
        }
      });
  }
  // acceptcourse() {
  // 	this.displayCourseNonEligible = false;
  // 	this.router.navigate(['admission/academic-information']);
  // }
  // rejectcourse() {
  // 	this.displayCourseNonEligible = false;
  // 	this.router.navigate(['']);
  // }

  onSelectionChange(row, index) {
    // console.log(`Row ${index + 1} selection changed: Preference - ${row.selectedPreference.id}, Course - ${row.selectedCourse.courseid}`);
  }
  onCourseSelectionChange(row, index) {
    const selectedCourse = row.selectedCourse;
    const courseExists = this.duplicateCourseSelection.some(course => course.courseid === selectedCourse.courseid);
    if (courseExists) { 
      this.cdr.detectChanges();
      row.selectedCourse = null;
      this.preferenceData[index].selectedCourse = null;
      alert('This course has already been selected! Please choose a different course.');
    } else {
      this.duplicateCourseSelection.push(selectedCourse);
    }
  }

  submit() {
    console.log('Submitted Data:', this.preferenceData);
    const allSelected = this.preferenceData.every(row => row.selectedPreference && row.selectedCourse);
    if (allSelected) {
      console.log('Submitted Data:', this.preferenceData);
    } else {
      alert('Please select a preference and course for all rows.');
    }

  }



}
