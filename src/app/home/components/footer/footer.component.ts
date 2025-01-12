import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { StoriesService } from '../../services/stories.service';
import { UserService } from '../../../services/user.service';
import { LoadingService } from '../../../services/loading.service';

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
  user: any;

  storyFile: any;

  stories: any = [];

  currentStory: any;
  currentStoryIndex: number = 0;

  constructor(
    protected storiesService: StoriesService,
    protected userService: UserService,
    protected loadingService: LoadingService
  ) {
    this.user = this.userService.getUser();

    this.storiesService.getAllStories().subscribe({
      next: (storiesResult: any) => {
        this.stories = storiesResult;

        this.stories.sort((a: any, b: any) => {
          if (a.username === this.user.username) return -1;
          if (b.username === this.user.username) return 1;
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
      this.storyFile = file;
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
      postData.append('userId', this.user.id);
      postData.append('type', 'image');
      postData.append('media', this.storyFile);

      this.loadingService.loading = true;
      this.storiesService.postStory(postData).subscribe({
        next: (response: any) => {
          if (!this.stories[0]) {
            this.stories[0] = {
              stories: [],
              userAvatar: this.user.avatar,
              userId: this.user.id,
              username: this.user.username,
            };
          }
          this.stories[0].stories.unshift(response);
          this.loadingService.loading = false;

          console.log(response);
        },

        error: (err) => {
          this.loadingService.loading = false;

          console.log(err);
        },
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
    } else {
      this.closeStoryViewer();
      this.hideFooter = false;
    }
  }
}
