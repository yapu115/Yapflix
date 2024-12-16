import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  footerActive: boolean = false;
  @Output() showPostOptions = new EventEmitter<boolean>();

  stories = [
    {
      username: 'story1',
      image: '/imgs/tests/posts/2-Allen.jpg',
    },
    {
      username: 'story2',
      image: '/imgs/tests/posts/1-mark.jpg',
    },
  ];

  toggleFooter() {
    this.footerActive = !this.footerActive;
    this.showPostOptions.emit(this.footerActive);
  }
}
