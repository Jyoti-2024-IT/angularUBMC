import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';

import { AccordionModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BreadcrumbModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { CarouselModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { ChipsModule } from 'primeng/primeng';
import { CodeHighlighterModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/primeng';
import { ColorPickerModule } from 'primeng/primeng';
import { SharedModule } from 'primeng/primeng';
import { ContextMenuModule } from 'primeng/primeng';
import { DataGridModule } from 'primeng/primeng';
import { DataListModule } from 'primeng/primeng';
import { DataScrollerModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { DragDropModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { FieldsetModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { GalleriaModule } from 'primeng/primeng';
import { GMapModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { LightboxModule } from 'primeng/primeng';
import { ListboxModule } from 'primeng/primeng';
import { MegaMenuModule } from 'primeng/primeng';
import { MenuModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { MessageModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { OrderListModule } from 'primeng/primeng';
import { OrganizationChartModule } from 'primeng/primeng';
import { OverlayPanelModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { PanelMenuModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { PickListModule } from 'primeng/primeng';
import { ProgressBarModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { RatingModule } from 'primeng/primeng';
import { ScheduleModule } from 'primeng/primeng';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/primeng';
import { SlideMenuModule } from 'primeng/primeng';
import { SliderModule } from 'primeng/primeng';
import { SpinnerModule } from 'primeng/primeng';
import { SplitButtonModule } from 'primeng/primeng';
import { StepsModule } from 'primeng/primeng';
import { TabMenuModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/primeng';
import { TerminalModule } from 'primeng/primeng';
import { TieredMenuModule } from 'primeng/primeng';
import { ToggleButtonModule } from 'primeng/primeng';
import { ToolbarModule } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { TreeModule } from 'primeng/primeng';
import { TreeTableModule } from 'primeng/primeng';

import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { AppFooterComponent } from './app.footer.component';
import { LoginComponent } from './login/login.component';
import { DeclarationComponent } from './declaration/declaration.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdmissionComponent } from './admission/admission.component';
import { InformaticMessagesComponent } from './admission/informatic-messages/informatic-messages.component';
import { AdmissionStepsComponent } from './admission/admission-steps/admission-steps.component';
import { GeneralInformationComponent } from './admission/general-information/general-information.component';
import { AcademicInformationComponent } from './admission/academic-information/academic-information.component';

import { RegistrationService } from './services/registration.service';
import { BreadcrumbService } from './services/breadcrumb.service';
import { AuthGuard } from './auth-guard.guard';
import { AdditionalInformationComponent } from './admission/additional-information/additional-information.component';
import { CourseInformationComponent } from './admission/course-information/course-information.component';
import { PaymentInformationComponent } from './admission/payment-information/payment-information.component';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidateDashboardComponent } from './candidate/dashboard/dashboard.component';
import { PrintFormChallanComponent } from './candidate/print-form-challan/print-form-challan.component';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { InputRestrictionDirective } from './input-restriction.directive';
import { DateMakerDirective } from './date-maker.directive';
import { PaymentDetailsComponent } from './admission/payment-details/payment-details.component';
import { PaymentComponent } from './admission/payment/payment.component';
import { OnlinepaymentComponent } from './candidate/onlinepayment/onlinepayment.component';
import { AdmissionfeespaymentComponent } from './candidate/admissionfeespayment/admissionfeespayment.component';
import { AdmissionfeespaymentconfirmComponent } from './candidate/admissionfeespaymentconfirm/admissionfeespaymentconfirm.component';
import { CourseApplicationComponent } from './admission/course-application/course-application.component';


@NgModule({
  declarations: [
    AppComponent,
    AppTopBarComponent,
    AppBreadcrumbComponent,
    AppFooterComponent,
    LoginComponent,
    DeclarationComponent,
    AdmissionComponent,
    InformaticMessagesComponent,
    AdmissionStepsComponent,
    GeneralInformationComponent,
    AcademicInformationComponent,
    AdditionalInformationComponent,
    CourseInformationComponent,
    PaymentInformationComponent,
    CandidateComponent,
    CandidateDashboardComponent,
    PrintFormChallanComponent,
    InputRestrictionDirective,
    DateMakerDirective,
    PaymentDetailsComponent,
    PaymentComponent,
    OnlinepaymentComponent,
    AdmissionfeespaymentComponent,
    AdmissionfeespaymentconfirmComponent,
    CourseApplicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    AccordionModule,
    AutoCompleteModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CarouselModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    ColorPickerModule,
    SharedModule,
    ContextMenuModule,
    DataGridModule,
    DataListModule,
    DataScrollerModule,
    DataTableModule,
    DialogModule,
    DragDropModule,
    DropdownModule,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    GalleriaModule,
    GMapModule,
    GrowlModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessagesModule,
    MessageModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    ScheduleModule,
    ScrollPanelModule,
    SelectButtonModule,
    SlideMenuModule,
    SliderModule,
    SpinnerModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    NgxSpinnerModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    RegistrationService,
    BreadcrumbService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
