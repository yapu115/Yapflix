import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostsComponent } from '../components/posts/posts.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FontAwesomeModule, PostsComponent, FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
