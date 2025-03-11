import { Component, OnInit, Input, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Router } from '@angular/router';

@Component({
	selector: 'app-admission-steps',
	templateUrl: './admission-steps.component.html',
	styleUrls: ['./admission-steps.component.scss']
})
export class AdmissionStepsComponent implements OnInit {

	@Input() activeIndex: number;

	stepsItems: any;
	currentStep: number;

	constructor(private router: Router, private renderer: Renderer2) { }

	ngOnInit() {
		const step = localStorage.getItem('step');
		console.log(step);
		switch (step) {
			case 'general':
				this.currentStep = 0;
				break;
			case 'academic':
				this.currentStep = 1;
				break;
			case 'course':
				this.currentStep = 2;
				break;
			case 'additional':
				this.currentStep = 3;
				break;
			case 'payment':
				this.currentStep = 4;
				break;
			case '':
				this.currentStep = 5;
				break;
			default:
				this.currentStep = 0;
		}

		this.stepsItems = [
			{
				label: 'General Information',
				stepNumber: 0,
				routerLink: '/admission/general-information'
			},
			{
				label: 'Academic Information',
				stepNumber: 1,
				routerLink: '/admission/academic-information'
			},
			{
				label: 'Course Application',
				stepNumber: 2,
				routerLink: '/admission/course-information'
			},
			{
				label: 'Additional Information',
				stepNumber: 3,
				routerLink: '/admission/additional-information'
			},
			{
				label: 'Payment',
				stepNumber: 4,
				routerLink: '/admission/payment-information'
			}
		];

	}

}
