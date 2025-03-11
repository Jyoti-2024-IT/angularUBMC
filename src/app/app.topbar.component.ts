import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

  public userDetails: any;
  public currentStep: any;
  public showHome = false;

  constructor(private router: Router, public app: AppComponent) {}

  ngOnInit() {
    this.userDetails = localStorage.getItem('userDetails');
    this.currentStep = localStorage.getItem('step');
    if (this.currentStep === '') {
      this.showHome = true;
    } else {
      this.showHome = false;
    }
    if (this.userDetails) {
      this.userDetails = JSON.parse(this.userDetails);
    } else {
      this.userDetails = {
        'firstName': 'Guest'
      };
    }
  }

  logout() {
    localStorage.clear();
    window.location.href = '#';
  }

  // goToHome() {
  //   this.currentStep = localStorage.getItem('step');
  //   if (this.currentStep == '') {
  //     // alert("sdsds");
  //     // window.location.href = '/';
  //     // this.showHome = true;
  //     this.router.navigateByUrl('candidate/dashboard');
  //   }
  // }

  goToHome() {
        this.router.navigateByUrl('candidate/dashboard');
  }


}
