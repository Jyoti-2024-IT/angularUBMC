import { Component, Renderer2, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { Message } from 'primeng/components/common/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ConfirmationService]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  forgotpassForm: FormGroup;
  msgs: Message[] = [];
  msgsForgotPass: Message[] = [];
  forgotPassDisplay: boolean=false;
  minDateOfBirth: Date;
  maxDateOfBirth: Date;
  dateOfBirth: Date;
  maxDateOfBirthYear: number;
  minDateOfBirthYear: number;
  otpsuccessmsg:boolean=false;
  fid:any;
  otp:any;
  otpValidation:boolean=false;
  value: any;
  storedDate: any;
  dateMask: any;

  constructor(private renderer: Renderer2, private registrationService: RegistrationService,
     private router: Router,private confirmationService: ConfirmationService) {
    this.renderer.addClass(document.body, 'login-body');

  }
  ngOnInit() {
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
    localStorage.setItem('meritlisted','');
    localStorage.setItem('authToken','');
    localStorage.setItem('userDetails', '');
    localStorage.setItem('step', '');
    localStorage.setItem('msgbilldesk', '');
    this.loginForm = new FormGroup({
      codenumber: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.forgotpassForm = new FormGroup({
      moblno: new FormControl('', [Validators.required, Validators.minLength(10)]),
      dob: new FormControl('', Validators.required)
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.registrationService.studentLogin(data).then(res => {
        // console.log(res);
        if (res.status === 'success') {
          localStorage.setItem('authToken', res.authToken);
          localStorage.setItem('userDetails', JSON.stringify(res.userDetails));
          localStorage.setItem('step', res.step);
          if (res.step) {
            this.router.navigateByUrl('admission/' + res.step + '-information');
          } else {
            this.router.navigateByUrl('candidate/dashboard');
          }
        } else {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Wrong UserId or password' });
        }
      });
    } else {
      console.log('Form Not Submitted!');
      // console.log(this.loginForm);
      Object.keys(this.loginForm.controls).forEach(control => {
        this.loginForm.controls[control].markAsDirty();
      });
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login-body');
  }

  showPopupForgotPass(){
    this.forgotPassDisplay = true;
  }

  getOtp(){
    if (this.forgotpassForm.valid) {
      const data = this.forgotpassForm.value;
      const d = new Date(Date.parse(this.forgotpassForm.value.dob));
			if (this.value === undefined) {
				this.storedDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
			} else {
				this.storedDate = this.value;
			}
      data.dob = this.storedDate;
      // console.log(data);
      this.confirmationService.confirm({
        message: "You will receive OTP in your Registered Mobile Number. Press 'Yes' to continue.",
        header: 'Confirmation',
        //icon: 'fa fa-question-circle',
        accept: () => {
          this.registrationService.getOTP(data).then(res => {
            // console.log(res);
            if (res.status === 'success') {
             this.otpsuccessmsg=true;
             this.fid=res.id;
            } else {
              alert(res.msg);
              // this.msgsForgotPass = [];
              // this.msgsForgotPass.push({ severity: 'error', summary: res.msg });
              this.forgotpassForm.reset();
            }
          });
        },
        reject: () => {
          this.otpsuccessmsg=false;
          this.forgotPassDisplay=false;
          this.forgotpassForm.reset();
        }
      });
    }
    else {
      console.log('Form Not Submitted!');
      // console.log(this.forgotpassForm);
      Object.keys(this.forgotpassForm.controls).forEach(control => {
        this.forgotpassForm.controls[control].markAsDirty();
      });
    }
  }

  getPass(fid,otp){
    if(otp === undefined){
      this.otpValidation = true;
    }else{
      this.otpValidation = false;
      this.registrationService.getPassword(fid,otp).then(res => {
        // console.log(res);
        if (res.status === 'success') {
         alert(res.msg);
         this.otp='';
         this.fid='';
         this.forgotpassForm.reset();
         this.forgotPassDisplay=false;
         this.otpsuccessmsg=false;
        } else {
          alert(res.msg);
          // this.msgsForgotPass = [];
          // this.msgsForgotPass.push({ severity: 'error', summary: res.msg });
          // this.forgotpassForm.reset();
        }
      });
    }
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
			this.storedDate = this.value;
			// const dt = this.stringToDate(event.path[0].value);
			// if (this.isValidDate(dt)) {
			//     this.value = dt;
			// }
		}
	}

	onBlurDate(): void {
		// console.log(this.value);
		const d = new Date(Date.parse(this.forgotpassForm.value.dob));
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


}
