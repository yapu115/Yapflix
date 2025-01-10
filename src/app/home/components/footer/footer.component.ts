import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { StoriesService } from '../../services/stories.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  @Output() showPostOptions = new EventEmitter<boolean>();
  footerActive: boolean = false;
  hideFooter: boolean = false;
  previewImage: string | null = null;
  userId: any;
  username: string | undefined;

  files: File[] = [];
  storyFile: any;

  stories: any = [];

  currentStory: any;
  currentStoryIndex: number = 0;

  constructor(
    protected storiesService: StoriesService,
    protected userService: UserService
  ) {
    this.userId = userService.getUserId();
    this.username = userService.getUsername();

    this.storiesService.getAllStories().subscribe({
      next: (storiesResult: any) => {
        this.stories = storiesResult;

        this.stories.sort((a: any, b: any) => {
          if (a.username === this.username) return -1;
          if (b.username === this.username) return 1;
          return 0;
        });
        console.log(this.stories);
      },

      error: (err) => {
        console.log(err.error);
      },
    });
  }

  toggleFooter() {
    this.footerActive = !this.footerActive;
    this.showPostOptions.emit(this.footerActive);
  }

  showStory(story: any) {
    console.log(story);
    this.currentStory = story;
    this.currentStoryIndex = 0;
    this.hideFooter = true;
  }

  triggerFileInput() {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLElement;
    fileInput.click();
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.files.push(file);
      const reader = new FileReader();

      reader.onload = () => {
        this.previewImage = reader.result as string;
        this.hideFooter = true;
      };

      reader.readAsDataURL(file);
    }
  }

  closeModal(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.cancelUpload();
    }
  }

  uploadStory() {
    const postData = new FormData();

    if (this.previewImage) {
      postData.append('userId', this.userId);
      postData.append('type', 'image');
      this.files.forEach((file) => {
        postData.append('media', file);
      });

      console.log(postData.get('media'));

      this.storiesService.postStory(postData).subscribe({
        next: (response: any) => {
          console.log(response);
        },

        error: (err) => {
          console.log(err);
        },
      });

      this.stories.push({
        image: this.previewImage,
        username: 'Me',
      });
      this.previewImage = null;
      this.hideFooter = false;
    }
  }

  cancelUpload() {
    this.previewImage = null;
    this.hideFooter = false;
  }

  closeStoryViewer() {
    this.currentStory = null;
    this.currentStoryIndex = 0;
  }

  nextStory() {
    if (
      this.currentStory &&
      this.currentStoryIndex < this.currentStory.stories.length - 1
    ) {
      this.currentStoryIndex++;
    } else {
      this.closeStoryViewer();
      this.hideFooter = false;
    }
  }

  previousStory() {
    if (this.currentStory && this.currentStoryIndex > 0) {
      this.currentStoryIndex--;
    }
  }
}
