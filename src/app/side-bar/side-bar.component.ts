import { AfterViewInit, Component, ElementRef, ViewChild, Renderer2, Output, EventEmitter, OnInit } from '@angular/core';
import { SidebarService } from '../service/sidebar.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements AfterViewInit, OnInit {
  @ViewChild('btn') closeBtn!: ElementRef;
  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('searchBtn') searchBtn!: ElementRef;

  @Output() sidebarToggled = new EventEmitter<boolean>();

  isOpen = true;
  role!: string;

  username!: string;
  fullName!: string;

  constructor(private renderer: Renderer2, 
    private sidebarService: SidebarService, 
    private router: Router,
    private authService: AuthService) {
      this.authService.isLoggedIn().then(loggedIn => {
        if (loggedIn) {
          this.username = this.authService.getUsername();
          this.fullName = this.authService.getFullname();
          this.role = this.authService.getUserRole();
        } else {
          this.authService.login();
        }
      });
    }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.renderer.listen(this.closeBtn.nativeElement, 'click', () => {
      this.toggleSidebar();
    });

    this.renderer.listen(this.searchBtn.nativeElement, 'click', () => {
      this.toggleSidebar();
    });
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.renderer.removeClass(this.sidebar.nativeElement, 'closed');
      this.renderer.addClass(this.sidebar.nativeElement, 'open');
    } else {
      this.renderer.removeClass(this.sidebar.nativeElement, 'open');
      this.renderer.addClass(this.sidebar.nativeElement, 'closed');
    }
    this.menuBtnChange();
    this.sidebarToggled.emit(this.isOpen);
  }

  menuBtnChange(): void {
    if (this.isOpen) {
      this.renderer.removeClass(this.closeBtn.nativeElement, 'bx-menu');
      this.renderer.addClass(this.closeBtn.nativeElement, 'bx-menu-alt-right');
    } else {
      this.renderer.removeClass(this.closeBtn.nativeElement, 'bx-menu-alt-right');
      this.renderer.addClass(this.closeBtn.nativeElement, 'bx-menu');
    }
  }

  onButtonClick(button: string, route: string, event: Event) {
    event.preventDefault();
    this.sidebarService.selectButton(button);
    this.router.navigate([route]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
