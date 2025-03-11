import { Component, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.scss']
})
export class DeclarationComponent implements OnDestroy {

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'declaration-body');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'declaration-body');
  }

}
