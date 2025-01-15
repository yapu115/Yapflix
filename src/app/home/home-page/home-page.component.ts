import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostsComponent } from '../components/posts/posts.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FontAwesomeModule, PostsComponent, FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  showPostOptions: boolean = false;

  onPostOptions(showPostOptions: boolean) {
    this.showPostOptions = showPostOptions;
  }
}
