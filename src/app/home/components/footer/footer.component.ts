import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  footerActive: boolean = false;

  stories = [
    {
      username: 'story1',
      image: '/imgs/tests/posts/2-Allen.jpg',
    },
    {
      username: 'story2',
      image: '/imgs/tests/posts/1-mark.jpg',
    },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
    // {
    //   username: 'story2',
    //   image: 'https://via.placeholder.com/60',
    // },
  ];
  toggleFooter() {
    this.footerActive = !this.footerActive;
  }

  // @HostListener('window:scroll', [])
  // onScroll() {
  //   console.log('aa');
  //   const scrollY = window.scrollY || document.documentElement.scrollTop;
  //   this.footerActive = scrollY > 200; // Muestra el footer cuando el usuario baja
  // }
}
