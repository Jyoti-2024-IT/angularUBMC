import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-additional-information',
  templateUrl: './additional-information.component.html',
  styleUrls: ['./additional-information.component.scss'],
  providers: [MessageService]
})
export class AdditionalInformationComponent implements OnInit {
  msgs: Message[] = [];
  activeIndex = 3;

  public additionalForm: any;

  public bloodgrpList = [];
  public nationalityList = [];
  public boardList = [];
  public religionList = [];
  public genericList = [];
  public curricularList = [];
  public guardianList = [];
  public phList = [];
  public maleTitleList = [];
  public femaleTitleList = [];
  public familyIncomeList = [];
  public admsportsList = [];
  public awardlevelList = [];
  public minorityList = [];
  dataList: any;
  sportsEntry = false;
  isFather = false;
  isMother = false;
  ismlabel = true;
  isflabel = true;
  enablePhType: boolean = true;
  showclose = false;
  public disabledField: boolean = false;
  countryId: any;
  stateId: any;
  public allcountrylist = [];
  isOtherState: boolean = true;
  isOtherCity: boolean = true;
  otherOption: boolean = false;
  public stateList = [];
  public cityList = [];
  public maritialStatus = [];
  public occupationList = [];
  public districtList = [];
  public stateListPer = [];
  public cityListPer = [];
  public districtListPer = [];
  public relationtoapplicantList = [];
  isOtherStatePerm: boolean = true;
  isOtherCityPerm: boolean = true;
  otherOptionPerm: boolean = false;

  disablesubmit = false;
  emailRegEx: any;
  public covVacList = [];
  // income: boolean = false;
  monthlyfamilyIncome: any;
  income: any;

  // for minority
  typeMinority: boolean = true;
  //  for adress
  cityId: any;
  isOtherDistrictPerm: boolean = true;
  isOtherDistrictPrsnt: boolean = true;
  alphaNumeric: any;

  imageUrl: string | ArrayBuffer | null = null;

  // new added for photo upload
  input = new FormData();
  width: number;
  height: number;
  showhtwidth = false;

  constructor(
    private registrationService: RegistrationService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private messageService: MessageService
  ) { }
  private token = JSON.parse(localStorage.getItem('userDetails'));
  ngOnInit() {
    // this.income = localStorage.getItem('monthlyIncome');
    // console.log(this.income + " hjhjhkjk");
    //   this.additionalForm.patchValue({
    //     monthlyfamilyIncome: this.income
    //   });

    this.emailRegEx = '^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    this.alphaNumeric = "^[a-zA-Z0-9]$";
    if (localStorage.getItem('meritlisted') === "yes") {
      this.disablesubmit = true;
    }
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Please Note :' });
    this.msgs.push({ severity: 'info', summary: 'i. Sr. No. 18 cannot be same as Mobile Number given in Step 1.' });
    this.msgs.push({ severity: 'info', summary: "ii. In case of Physically challenged being 'Yes', relevant documents will have to be submitted at the time of admission, if Selected." });
    // this.msgs.push({ severity: 'info', summary: "iii. Correct Email id & Phone no should be provided at the time of filling up the form. Email id & Phone no will be verified. All the communication will be sent to the registered phone no and email id. College will not be responsible for non-receive of any important information due to incorrect email id or phone no." });
    this.autoLogin();
    this.additionalForm = new FormGroup({
      emergencyContactNo: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      bloodGroup: new FormControl(null, Validators.required),
      nationalityId: new FormControl(null, Validators.required),
      religionId: new FormControl(null, Validators.required),
      handicapped: new FormControl(null, Validators.required),
      handicaptype: new FormControl(null),
      adhaarcardno: new FormControl('', [Validators.required, this.aadhaarValidator()]),
      // sParent: new FormControl(null, Validators.required),

      // fTitle: new FormControl(null, Validators.required),
      fatherName: new FormControl('', Validators.required),
      famOccupationId: new FormControl(null, Validators.required),
      fatherContactno: new FormControl('', [Validators.required, Validators.minLength(10)]),
      fatherEmail: new FormControl('', Validators.pattern(this.emailRegEx)),

      // mTitle: new FormControl(null, Validators.required),
      motherName: new FormControl('', Validators.required),
      motherOccupationId: new FormControl(null, Validators.required),
      motherContactNo: new FormControl('', Validators.minLength(10)),
      motherEmail: new FormControl('', Validators.pattern(this.emailRegEx)),

      familyIncome: new FormControl(null, Validators.required),
      monthlyfamilyIncome: new FormControl('', Validators.required),
      // sportsQuota: new FormControl(null, Validators.required),
      mailingAddress: new FormControl('', Validators.required),
      newcountryId: new FormControl(null, Validators.required),
      newcityId: new FormControl(null, Validators.required),
      othernewCity: new FormControl(null),
      newstateId: new FormControl(null, Validators.required),
      othernewState: new FormControl(null),
      newresipinno: new FormControl('', Validators.required),

      parmanentAddress: new FormControl('', Validators.required),
      countryId: new FormControl(null, Validators.required),
      cityId: new FormControl(null, Validators.required),
      resiStateId: new FormControl(null, Validators.required),
      otherState: new FormControl(null),
      otherCity: new FormControl(null),
      resiPinNo: new FormControl('', Validators.required),

      //==========new fields===========================//
      maritialStatus: new FormControl(null, Validators.required),
      isMinority: new FormControl(null, Validators.required),
      minorityid: new FormControl(null),
      // firstGenerationLerner: new FormControl(null, Validators.required),

      localGuardianname: new FormControl(''),
      relationToGuardian: new FormControl(null),
      // localguardianAddress: new FormControl('', Validators.required),
      localguardianoccupation: new FormControl(null),
      localguardianphoneNo: new FormControl('', [Validators.minLength(10)]),

      // vaccine: new FormControl(null, Validators.required),

      //==========new fields===========================//
      sportsDetails: this.fb.array([]),

      // new entry for address

      resiDistrictId: new FormControl(null, Validators.required),
      otherresiDistrict: new FormControl(''),
      newDistrictId: new FormControl(null, Validators.required),
      othernewDistrict: new FormControl(''),
      postOfficeper: new FormControl('', Validators.required),
      policeStationper: new FormControl('', Validators.required),
      postOfficeprsnt: new FormControl('', Validators.required),
      policeStationprsnt: new FormControl('', Validators.required),
      studentpanno: new FormControl(null),
    });
    this.getAdditionalLists();
    this.additionalForm.get('handicaptype').disable();
    this.additionalForm.get('minorityid').disable();
    if (localStorage.getItem('step') == '') {
      this.showclose = true;
    }
  }
  // ngAfterViewInit() {
  //   (document.querySelector('.layout-wrapper .layout-content .layout-content-container') as HTMLElement).style.marginTop = '-50px';
  // }

  // ngOnDestroy() {
  //   (document.querySelector('.layout-wrapper .layout-content .layout-content-container') as HTMLElement).style.marginTop = '10px';
  // }

  getAdditionalLists() {
    this.registrationService
      .getAdditionalList(this.token.authToken)
      .subscribe(data => {
        this.dataList = data;
        // console.log(this.dataList)
        this.bloodgrpList = this.dataList.bloodgroupList;
        this.nationalityList = this.dataList.nationalityList;
        this.religionList = this.dataList.religionList;
        this.admsportsList = this.dataList.admsportsList;
        this.awardlevelList = this.dataList.awardlevelList;
        this.allcountrylist = this.dataList.allcountrylist;
        this.occupationList = this.dataList.occupationList;
        this.minorityList = this.dataList.minorityList;
        this.districtList = this.dataList.districtList;
        this.relationtoapplicantList = this.dataList.relationtoapplicantList;
        this.maritialStatus = [
          { id: 'Single', name: 'Single' },
          { id: 'Married', name: 'Married' },
          { id: 'Divorced', name: 'Divorced' },
          { id: 'Widow', name: 'Widow' },
          { id: 'Preferred not to Say', name: 'Preferred not to Say' }
        ]
        this.genericList = [
          { id: 'No', name: 'No' },
          { id: 'Yes', name: 'yes' },
        ];
        this.curricularList = [
          { id: 'None', name: 'None' },
          { id: 'Music', name: 'Music' },
          { id: 'Sports', name: 'Sports' },
          { id: 'Others', name: 'Others' }
        ];
        this.guardianList = [
          { id: 'Father', name: 'Father' },
          { id: 'Mother', name: 'Mother' },
          { id: 'Other', name: 'Other' }
        ];
        this.phList = [
          { id: 'Visually Handicapped', name: 'Visually Handicapped' },
          { id: 'Orthopaedically Handicapped', name: 'Orthopaedically Handicapped' },
          { id: 'Hearing Impairment', name: 'Hearing Impairment' }
        ];

        this.maleTitleList = [
          { id: 'Mr.', name: 'Mr.' },
          { id: 'Dr.', name: 'Dr.' },
          { id: 'Prof.', name: 'Prof.' },
          { id: 'Late', name: 'Late' }
        ];
        this.femaleTitleList = [
          { id: 'Mrs.', name: 'Mrs.' },
          { id: 'Dr.', name: 'Dr.' },
          { id: 'Prof.', name: 'Prof.' },
          { id: 'Late', name: 'Late' }
        ];
        this.familyIncomeList = [
          { id: 'Upto 1.2 Lac', name: 'Upto 1.2 Lac.' },
          { id: '1.2 Lac to 5 Lacs', name: '1.2 Lac to 5 Lacs' },
          { id: '5 Lacs and above', name: '5 Lacs and above' }
        ];

        this.covVacList = [
          { id: '1st Dose', name: '1st Dose' },
          { id: '2nd Dose', name: '2nd Dose' },
          { id: '3rd Dose', name: '3rd Dose' },
          { id: 'No', name: 'No' }
        ];

        this.spinner.hide();
      });
  }

  patchForm() {
    this.token = '';
    this.token = JSON.parse(localStorage.getItem('userDetails'));
    this.additionalForm.patchValue(this.token);
    // console.log(this.token.id);
    this.additionalForm.controls.monthlyfamilyIncome.setValue(this.token.familyIncome / 12);
    // this.showSportsEntryEdit();

    this.getStateCity(this.token.newcountryId, this.token.newstateId, this.token.newcityId);
    this.getStateCityPermanent(this.token.countryId, this.token.resiStateId, this.token.cityId);

    this.setSports();
    this.isSingleParent();
    this.enableHanidcapType();

    if (this.token.newstateId == -1) {
      this.enableOtherState();
    }
    if (this.token.newcityId == -1) {
      this.enableOtherCity();
    }
    if (this.token.resiStateId == -1) {
      this.enableOtherStatePermanent();
    }
    if (this.token.cityId == -1) {
      this.enableOtherCityPermanent();
    }
    if (this.token.resiDistrictId == -1) {
      this.enableOtherDistrictPermanent();
    }
    if (this.token.newDistrictId == -1) {
      this.enableOtherDistrictPresent();
    }
  }

  setSports() {
    const control = <FormArray>this.additionalForm.controls.sportsDetails;
    this.token.sportsDetails.forEach(x => {
      control.push(
        this.fb.group({
          sportsid: x.sportsid,
          levelid: x.levelid,
          id: x.id,
          parent_id: x.parent_id
        })
      );
    });
  }

  saveAdditionalDetails() {
    // this.income = this.additionalForm.value.monthlyfamilyIncome;
    // console.log(this.income + "ghgjghghg");
    // localStorage.setItem('monthlyIncome',this.income);
    // console.log(monthlyIncome);
    const control = this.additionalForm.value.sportsDetails;
    const sportsQuota = this.additionalForm.value.sportsQuota;
    if (sportsQuota == 'Yes' && control.length == 0) {
      alert('Please add atleast one sports details');
      return false;
    }
    for (let i = 0; i < control.length; i++) {
      // alert(control[i].sportsid);
      if (control[i].sportsid == null) {
        alert('Please select sports at row no.' + (1 + i));
        return false;
      }
      if (control[i].levelid == null) {
        alert('Please select level at row no.' + (1 + i));
        return false;
      }
    }
    // console.log(this.additionalForm.value);
    if (this.additionalForm.valid) {
      // console.log(this.additionalForm.value);
      this.spinner.show();
      this.registrationService
        .saveAdditionalDetailsApi(
          this.token.authToken,
          this.additionalForm.value
        )
        .subscribe(data => {
          this.dataList = data;
          if (this.dataList.status === 'success') {
            this.spinner.hide();
            alert('Additional data saved');
            // if (localStorage.getItem('step') !== '') {
            //   this.router.navigate(['admission/payment-information']);
            // }
            // else {
            this.router.navigate(['candidate/dashboard']);
            // }
          }
        });
    } else {
      console.log('Form Not Submitted!');
      // console.log(this.additionalForm);
      Object.keys(this.additionalForm.controls).forEach(ctrl => {
        this.additionalForm.controls[ctrl].markAsDirty();
      });
    }
  }

  autoLogin() {
    this.spinner.show();
    this.registrationService
      .loginByToken(localStorage.getItem('authToken'))
      .subscribe(
        data => {
          this.dataList = data;
          localStorage.setItem('authToken', this.dataList.authToken);
          localStorage.setItem(
            'userDetails',
            JSON.stringify(this.dataList.userDetails)
          );
          localStorage.setItem('step', this.dataList.step);
          if (this.dataList.userDetails && this.dataList.userDetails.bloodGroup !== null) {
            if (this.additionalForm && this.additionalForm.controls['bloodGroup']) {
              this.additionalForm.controls['bloodGroup'].setValue(this.dataList.userDetails.bloodGroup);
              this.additionalForm.controls['bloodGroup'].updateValueAndValidity();
            }
          }
        },
        err => console.log(err),
        () => this.spinner.hide()
      );
  }


  checkContactNo() {
    if (this.additionalForm.value.emergencyContactNo === this.token.studentPersonalContactNo) {
      alert('Alternate Mobile Number cannot be same as Student Mobile No.');
      this.additionalForm.controls.emergencyContactNo.setValue(null);
    }
  }

  addSports() {
    const control = <FormArray>this.additionalForm.controls['sportsDetails'];
    const newMarksGroup: FormGroup = this.initItems();
    control.push(newMarksGroup);
  }
  initItems(): FormGroup {
    return this.fb.group({
      sportsid: [null, Validators.required],
      levelid: [null, Validators.required],
      id: [''],
      parent_id: ['0']
    });
  }

  // showSportsEntry() {
  //   const arr = <FormArray>this.additionalForm.controls['sportsDetails'];
  //   if (this.additionalForm.value.sportsQuota === 'Yes') {
  //     this.sportsEntry = true;
  //     if (arr.length < 1) {
  //       for (let i = 1; i <= 1; i++) {
  //         this.addSports();
  //       }
  //     }

  //   } else {
  //     this.sportsEntry = false;
  //     const control = <FormArray>this.additionalForm.controls['sportsDetails'];
  //     for (let i = control.length; i >= 0; i--) {
  //       control.removeAt(i);
  //     }
  //   }
  // }

  // showSportsEntryEdit() {
  //   const arr = <FormArray>this.additionalForm.controls['sportsDetails'];
  //   if (this.additionalForm.value.sportsQuota === 'Yes') {
  //     this.sportsEntry = true;
  //   } else {
  //     this.sportsEntry = false;
  //     const control = <FormArray>this.additionalForm.controls['sportsDetails'];
  //     for (let i = control.length; i >= 0; i--) {
  //       control.removeAt(i);
  //     }
  //   }
  // }

  // removeSports(id, index) {
  //   const control = <FormArray>this.additionalForm.controls['sportsDetails'];
  //   control.removeAt(index);
  //   if (id != '') {
  //     this.registrationService.deleteRowBySports(id).subscribe(data => {
  //       this.dataList = data;
  //       this.msgs.push({
  //         severity: 'success',
  //         summary: 'Success Message',
  //         detail: 'Selected Row Successfully Deleted'
  //       });
  //     });
  //   }
  // }

  isSingleParent() {
    const motherName = this.additionalForm.get('motherName');
    const mTitle = this.additionalForm.get('mTitle');
    const motherOccupationId = this.additionalForm.get('motherOccupationId');
    const motherContactNo = this.additionalForm.get('motherContactNo');
    const motherEmail = this.additionalForm.get('motherEmail');

    const fatherName = this.additionalForm.get('fatherName');
    const fTitle = this.additionalForm.get('fTitle');
    const famOccupationId = this.additionalForm.get('famOccupationId');
    const fatherContactno = this.additionalForm.get('fatherContactno');
    const fatherEmail = this.additionalForm.get('fatherEmail');

    if (this.additionalForm.value.sParent === 'Yes') {
      if (this.additionalForm.value.fTitle != null) {
        this.isMother = true;
        this.ismlabel = false;
        this.additionalForm.controls.motherName.setValue('');
        this.additionalForm.controls.mTitle.setValue(null);
        this.additionalForm.controls.motherOccupationId.setValue(null);
        this.additionalForm.controls.motherContactNo.setValue('');
        this.additionalForm.controls.motherEmail.setValue('');
        mTitle.clearValidators();
        motherName.clearValidators();
        motherOccupationId.clearValidators();
        motherContactNo.clearValidators();
        motherEmail.clearValidators();
      } else {
        this.ismlabel = true;
        this.isMother = false;
        mTitle.setValidators([Validators.required]);
        motherName.setValidators([Validators.required]);
        motherOccupationId.setValidators([Validators.required]);
        motherContactNo.setValidators(Validators.minLength(10));
        motherEmail.setValidators(Validators.pattern(this.emailRegEx));
      }
      if (this.additionalForm.value.mTitle != null) {
        this.isFather = true;
        this.isflabel = false;
        this.additionalForm.controls.fatherName.setValue('');
        this.additionalForm.controls.fTitle.setValue(null);
        this.additionalForm.controls.famOccupationId.setValue(null);
        this.additionalForm.controls.fatherContactno.setValue('');
        this.additionalForm.controls.fatherEmail.setValue('');
        fTitle.clearValidators();
        fatherName.clearValidators();
        famOccupationId.clearValidators();
        fatherContactno.clearValidators();
        fatherEmail.clearValidators();
      } else {
        this.isFather = false;
        this.isflabel = true;
        fTitle.setValidators([Validators.required]);
        fatherName.setValidators([Validators.required]);
        famOccupationId.setValidators([Validators.required]);
        fatherContactno.setValidators([Validators.required, Validators.minLength(10)]);
        fatherEmail.setValidators(Validators.pattern(this.emailRegEx));
      }
    }
    mTitle.updateValueAndValidity();
    motherName.updateValueAndValidity();
    motherOccupationId.updateValueAndValidity();
    motherContactNo.updateValueAndValidity();
    motherEmail.updateValueAndValidity();

    fTitle.updateValueAndValidity();
    fatherName.updateValueAndValidity();
    famOccupationId.updateValueAndValidity();
    fatherContactno.updateValueAndValidity();
    fatherEmail.updateValueAndValidity();
  }

  singleParent() {
    this.isMother = false;
    this.ismlabel = true;
    this.isflabel = true;
    this.additionalForm.controls.motherName.setValue('');
    this.additionalForm.controls.mTitle.setValue(null);
    this.isFather = false;
    this.additionalForm.controls.fatherName.setValue('');
    this.additionalForm.controls.fTitle.setValue(null);
  }
  avoidNumber(event) {
    if (event.keyCode >= 48 && event.keyCode <= 57) return false;
  }

  enableHanidcapType() {
    const handicaptype = this.additionalForm.get('handicaptype');
    if (this.additionalForm.value.handicapped === 'Yes') {
      this.additionalForm.get('handicaptype').enable();
      handicaptype.setValidators([Validators.required]);
      this.enablePhType = false;
    } else {
      this.additionalForm.controls.handicaptype.setValue(null);
      this.additionalForm.get('handicaptype').disable();
      handicaptype.clearValidators();
      this.enablePhType = true;
    }
    handicaptype.updateValueAndValidity();
  }
  goToDashboard() {
    this.router.navigate(['candidate/dashboard']);
  }

  getStateCity(x, y, z) {
    this.countryId = x;
    this.stateId = y;
    this.cityId = z;
    // console.log(this.countryId, this.stateId, this.cityId);
    if (x == null) {
      this.additionalForm.get('othernewState').setValue('');
      this.additionalForm.get('othernewCity').setValue('');
      this.additionalForm.get('othernewDistrict').setValue('');
      this.additionalForm.get('newstateId').setValue(null);
      this.additionalForm.get('newcityId').setValue(null);
      this.additionalForm.get('newDistrictId').setValue(null);
    }
    if (x == 1) {
      this.otherOption = false;
    } else {
      this.otherOption = true;
    }
    this.registrationService.getStateCity(x, y, z).subscribe(data => {
      // console.log(data);
      this.stateList = [];
      this.cityList = [];
      this.districtList = [];
      this.dataList = data;
      this.stateList = this.dataList.stateList;
      this.cityList = this.dataList.cityList;
      this.districtList = this.dataList.districtList;
    });
  }
  enableOtherState() {
    const othernewState = this.additionalForm.get('othernewState');
    if (this.additionalForm.value.newstateId == '-1') {
      this.isOtherState = false;
      othernewState.setValidators([Validators.required]);
    } else {
      this.additionalForm.controls.othernewState.setValue(null);
      this.isOtherState = true;
      othernewState.clearValidators();
    }
    othernewState.updateValueAndValidity();
  }

  enableOtherCity() {
    const othernewCity = this.additionalForm.get('othernewCity');
    if (this.additionalForm.value.newcityId == '-1') {
      this.isOtherCity = false;
      othernewCity.setValidators([Validators.required]);
    } else {
      this.additionalForm.controls.othernewCity.setValue(null);
      this.isOtherCity = true;
      othernewCity.clearValidators();
    }
    othernewCity.updateValueAndValidity();
  }

  getStateCityPermanent(x, y, z) {
    this.countryId = x;
    this.stateId = y;
    this.cityId = z;
    if (x == null) {
      this.additionalForm.get('otherState').setValue('');
      this.additionalForm.get('otherCity').setValue('');
      this.additionalForm.get('otherresiDistrict').setValue('');
      this.additionalForm.get('resiStateId').setValue(null);
      this.additionalForm.get('cityId').setValue(null);
      this.additionalForm.get('resiDistrictId').setValue(null);
    }
    if (x == 1) {
      this.otherOptionPerm = false;
    } else {
      this.otherOptionPerm = true;
    }
    this.registrationService.getStateCity(x, y, z).subscribe(data => {
      // console.log(data);
      this.dataList = data;
      this.stateListPer = this.dataList.stateList;
      this.cityListPer = this.dataList.cityList;
      this.districtListPer = this.dataList.districtList;
    });
  }
  enableOtherStatePermanent() {
    const otherState = this.additionalForm.get('otherState');
    if (this.additionalForm.value.resiStateId == '-1') {
      this.isOtherStatePerm = false;
      otherState.setValidators([Validators.required]);
    } else {
      this.additionalForm.controls.otherState.setValue(null);
      this.isOtherStatePerm = true;
      otherState.clearValidators();
    }
    otherState.updateValueAndValidity();
  }

  enableOtherCityPermanent() {
    const otherCity = this.additionalForm.get('otherCity');
    if (this.additionalForm.value.cityId == '-1') {
      this.isOtherCityPerm = false;
      otherCity.setValidators([Validators.required]);
    } else {
      this.additionalForm.controls.otherCity.setValue(null);
      this.isOtherCityPerm = true;
      otherCity.clearValidators();
    }
    otherCity.updateValueAndValidity();
  }

  changeStatus(value: boolean) {
    if (value) {
      this.stateList = this.stateListPer;
      this.cityList = this.cityListPer;
      this.districtList = this.districtListPer;

      this.additionalForm.controls.mailingAddress.setValue(this.additionalForm.value.parmanentAddress);
      this.additionalForm.controls.newcountryId.setValue(this.additionalForm.value.countryId);
      this.additionalForm.controls.newstateId.setValue(this.additionalForm.value.resiStateId);
      this.additionalForm.controls.newcityId.setValue(this.additionalForm.value.cityId);
      this.additionalForm.controls.othernewState.setValue(this.additionalForm.value.otherState);
      this.additionalForm.controls.othernewCity.setValue(this.additionalForm.value.otherCity);
      this.additionalForm.controls.newresipinno.setValue(this.additionalForm.value.resiPinNo);
      this.additionalForm.controls.newDistrictId.setValue(this.additionalForm.value.resiDistrictId);
      this.additionalForm.controls.postOfficeprsnt.setValue(this.additionalForm.value.postOfficeper);
      this.additionalForm.controls.policeStationprsnt.setValue(this.additionalForm.value.policeStationper);
      if (this.additionalForm.value.otherState != '') {
        this.enableOtherState();
      }
      if (this.additionalForm.value.otherCity != '') {
        this.enableOtherCity();
      }
      if (this.additionalForm.value.otherresiDistrict != '') {
        this.enableOtherDistrictPresent();
      }
    }
    else {
      this.additionalForm.controls.mailingAddress.setValue('');
      this.additionalForm.controls.newcountryId.setValue(null);
      this.additionalForm.controls.newstateId.setValue(null);
      this.additionalForm.controls.newcityId.setValue(null);
      this.additionalForm.controls.othernewState.setValue('');
      this.additionalForm.controls.othernewCity.setValue('');
      this.additionalForm.controls.newresipinno.setValue('');
      this.additionalForm.controls.newDistrictId.setValue(null);
      this.additionalForm.controls.othernewDistrict.setValue('');
      this.additionalForm.controls.postOfficeprsnt.setValue('');
      this.additionalForm.controls.policeStationprsnt.setValue('');
    }
  }

  onchangesetparentstogrdn(value: string) {
    //console.log(value);
    if (value === "Father") {
      this.additionalForm.controls.localGuardianname.setValue(this.additionalForm.value.fatherName);
      this.additionalForm.controls.localguardianoccupation.setValue(this.additionalForm.value.famOccupationId);
      this.additionalForm.controls.localguardianphoneNo.setValue(this.additionalForm.value.fatherContactno);
      this.additionalForm.controls.localguardianAddress.setValue(this.additionalForm.value.mailingAddress);
    }
    else if (value === "Mother") {
      this.additionalForm.controls.localGuardianname.setValue(this.additionalForm.value.motherName);
      this.additionalForm.controls.localguardianoccupation.setValue(this.additionalForm.value.motherOccupationId);
      this.additionalForm.controls.localguardianphoneNo.setValue(this.additionalForm.value.motherContactNo);
      this.additionalForm.controls.localguardianAddress.setValue(this.additionalForm.value.mailingAddress);
    }
    else if (value === "Other") {
      this.additionalForm.controls.localGuardianname.setValue('');
      this.additionalForm.controls.localguardianoccupation.setValue(null);
      this.additionalForm.controls.localguardianphoneNo.setValue('');
      this.additionalForm.controls.localguardianAddress.setValue('');
    }
  }

  // add by JD
  multiplyIncome(e: any) {
    this.additionalForm.get('familyIncome').clearValidators();
    this.additionalForm.controls.familyIncome.setValue(e.target.value * 12);
  }

  checkMinorityType() {
    const minorityType = this.additionalForm.get('isMinority');
    if (this.additionalForm.value.isMinority == "Yes") {
      this.additionalForm.get('minorityid').enable();
      minorityType.setValidators([Validators.required]);
      this.typeMinority = false;

    } else {
      this.additionalForm.controls.minorityid.setValue(null);
      this.additionalForm.get('minorityid').disable();
      minorityType.clearValidators();
      this.typeMinority = true;
    }
    minorityType.updateValueAndValidity();
  }

  enableOtherDistrictPermanent() {
    const otherresiDistrict = this.additionalForm.get('otherresiDistrict');
    if (this.additionalForm.value.resiDistrictId == '-1') {
      this.isOtherDistrictPerm = false;
      otherresiDistrict.setValidators([Validators.required]);
    } else {
      this.additionalForm.controls.otherresiDistrict.setValue(null);
      this.isOtherDistrictPerm = true;
      otherresiDistrict.clearValidators();
    }
    otherresiDistrict.updateValueAndValidity();
  }

  enableOtherDistrictPresent() {
    const othernewDistrict = this.additionalForm.get('othernewDistrict');
    if (this.additionalForm.value.newDistrictId == '-1') {
      this.isOtherDistrictPrsnt = false;
      othernewDistrict.setValidators([Validators.required]);
    } else {
      this.additionalForm.controls.othernewDistrict.setValue(null);
      this.isOtherDistrictPrsnt = true;
      othernewDistrict.clearValidators();
    }
    othernewDistrict.updateValueAndValidity();
  }


  aadhaarValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const aadhaarPattern = /^\d{4}\s?\d{4}\s?\d{4}$/;

      return aadhaarPattern.test(control.value) ? null : { 'invalidAadhaar': true };
    };
  }

  onFileSelected(event, flg): void {
    try {
      const file = event.files[0];
      const MAX_FILE_SIZE = 2000000;
      if (file.size > MAX_FILE_SIZE) {
        alert('File size should not be more than 2 MB');
        return;
      }
      this.registrationService.stPhotoUploadService(file, flg, this.token.id).then(res => {
        console.log(res);
      }).catch(error => {
        console.error('Error uploading photo:', error);
      });
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }



}
