import { PaymentComponent } from './admission/payment/payment.component';
import { PaymentDetailsComponent } from './admission/payment-details/payment-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DeclarationComponent } from './declaration/declaration.component';
import { AdmissionComponent } from './admission/admission.component';
import { GeneralInformationComponent } from './admission/general-information/general-information.component';
import { AcademicInformationComponent } from './admission/academic-information/academic-information.component';
import { AuthGuard } from './auth-guard.guard';
import { AdditionalInformationComponent } from './admission/additional-information/additional-information.component';
import { CourseInformationComponent } from './admission/course-information/course-information.component';
import { PaymentInformationComponent } from './admission/payment-information/payment-information.component';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidateDashboardComponent } from './candidate/dashboard/dashboard.component';
import { PrintFormChallanComponent } from './candidate/print-form-challan/print-form-challan.component';
import { OnlinepaymentComponent } from './candidate/onlinepayment/onlinepayment.component';
import { AdmissionfeespaymentComponent } from './candidate/admissionfeespayment/admissionfeespayment.component';
import { AdmissionfeespaymentconfirmComponent } from './candidate/admissionfeespaymentconfirm/admissionfeespaymentconfirm.component';
import { CourseApplicationComponent } from './admission/course-application/course-application.component'


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'declaration', component: DeclarationComponent },
  {
    path: 'admission',
    component: AdmissionComponent,
    children: [
      { path: 'general-information', component: GeneralInformationComponent },
      { path: 'academic-information', component: AcademicInformationComponent, canActivate: [AuthGuard] },
      { path: 'additional-information', component: AdditionalInformationComponent, canActivate: [AuthGuard] },
      { path: 'course-information', component: CourseInformationComponent, canActivate: [AuthGuard] },
      { path: 'course-application', component: CourseApplicationComponent, canActivate: [AuthGuard] },
      { path: 'payment-information', component: PaymentInformationComponent, canActivate: [AuthGuard] },
      { path: 'payment-details/:msg', component: PaymentDetailsComponent, canActivate: [AuthGuard] },
      { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'candidate',
    component: CandidateComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: CandidateDashboardComponent, canActivate: [AuthGuard] },
      { path: 'print-form-challan', component: PrintFormChallanComponent },
      { path: 'onlinepayment', component: OnlinepaymentComponent,canActivate: [AuthGuard] },
      { path: 'admissionfeespayment', component: AdmissionfeespaymentComponent,canActivate: [AuthGuard] },
      { path: 'admissionfeesconfirm/:msg/:type', component: AdmissionfeespaymentconfirmComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
