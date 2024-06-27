import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../service/sidebar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  selectedButton: string = '';

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.selectedButton$.subscribe(button => {
      this.selectedButton = button;
    });
  }

}
