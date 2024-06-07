import { AfterViewInit, Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements AfterViewInit {

  @ViewChild('btn') closeBtn!: ElementRef;
  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('searchBtn') searchBtn!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.listen(this.closeBtn.nativeElement, 'click', () => {
      this.toggleSidebar();
    });

    this.renderer.listen(this.searchBtn.nativeElement, 'click', () => {
      this.toggleSidebar();
    });
  }

  toggleSidebar(): void {
    if (this.sidebar.nativeElement.classList.contains('open')) {
      this.renderer.removeClass(this.sidebar.nativeElement, 'open');
      this.renderer.addClass(this.sidebar.nativeElement, 'closed');
    } else {
      this.renderer.removeClass(this.sidebar.nativeElement, 'closed');
      this.renderer.addClass(this.sidebar.nativeElement, 'open');
    }
    this.menuBtnChange();
  }

  menuBtnChange(): void {
    if (this.sidebar.nativeElement.classList.contains('open')) {
      this.renderer.removeClass(this.closeBtn.nativeElement, 'bx-menu');
      this.renderer.addClass(this.closeBtn.nativeElement, 'bx-menu-alt-right');
    } else {
      this.renderer.removeClass(this.closeBtn.nativeElement, 'bx-menu-alt-right');
      this.renderer.addClass(this.closeBtn.nativeElement, 'bx-menu');
    }
  }
}
