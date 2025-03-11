import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public msgbilldesk:any;
  @ViewChild('form') form: ElementRef;
  constructor( private router: Router,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.msgbilldesk = localStorage.getItem('msgbilldesk');
    setTimeout(() => {
      this.pay()
    }, 5000);
    //this.spinner.hide();
    //this.pay();  
    //this.router.navigate(['/getpayment']);

  }
  pay(){
    this.form.nativeElement.submit();
  }

}
