import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BreadcrumbService {

  private itemsSource = new Subject<MenuItem[]>();

  itemsHandler = this.itemsSource.asObservable();

  setItems(items: MenuItem[]) {
      this.itemsSource.next(items);
  }

}
