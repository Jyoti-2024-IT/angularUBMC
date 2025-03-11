import { Component, OnInit } from '@angular/core';
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
  courseOptions: any[];
  showclose: boolean = false;
  disablesubmit: boolean = false;
  dataList: any = [];
  tableData: Coursedata[];
  amount: any;
  displayCourseNonEligible: boolean = false;
  nonEligiblemsg: any;

  constructor(
    private registrationService: RegistrationService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private spinner: NgxSpinnerService
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
    // if (localStorage.getItem('step') == '') {
    // 	this.showclose = true;
    // }

    // if (localStorage.getItem('meritlisted') === "yes") {
    // 	this.disablesubmit = true;
    // }
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


}
