import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDateMaker]'
})
export class DateMakerDirective {

  constructor() { }
  @HostListener('input', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let length = Number(input.value.length);
    console.log(length);
    if (length == 2 || length == 5) {
      input.value = input.value + "/";
    }
  }
  
}
