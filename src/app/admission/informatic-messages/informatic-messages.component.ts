import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-informatic-messages',
  templateUrl: './informatic-messages.component.html',
  styleUrls: ['./informatic-messages.component.scss']
})
export class InformaticMessagesComponent implements OnInit {

  @Input() informaticMessages: string;

  constructor() { }

  ngOnInit() {
  }

}
