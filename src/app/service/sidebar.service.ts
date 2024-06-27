import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  private selectedButtonSource = new BehaviorSubject<string>('');
  selectedButton$ = this.selectedButtonSource.asObservable();

  selectButton(button: string) {
    this.selectedButtonSource.next(button);
  }
}
