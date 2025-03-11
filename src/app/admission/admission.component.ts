import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss']
})
export class AdmissionComponent implements OnInit {

  constructor(public app: AppComponent) {}

  ngOnInit() {
    this.app.onLayoutClick();
  }

}
