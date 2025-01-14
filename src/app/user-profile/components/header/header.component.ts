import { Component, input, Input } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() user!: {
    id: string;
    avatar: string;
    username: string;
    posts: number;
    followers: number;
    following: number;
  };

  @Input() followers!: {
    id: string;
    username: string;
    avatar: string;
  }[];

  @Input() following!: {
    id: string;
    username: string;
    avatar: string;
  }[];

  @Input() postsCount!: number;

  showModal = false;
  previewImage: string | null = null;
  selectedFile: File | null = null;

  constructor(
    protected userProfileService: UserProfileService,
    protected userService: UserService
  ) {}

  onAvatarClick() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.previewImage = reader.result as string;
          this.showModal = true;
        };
        reader.readAsDataURL(file);
      }
    };
  }

  confirmAvatarChange() {
    if (this.selectedFile) {
      const avatarData = new FormData();

      avatarData.append('avatar', this.selectedFile);
      avatarData.append('userId', this.user.id);

      this.uploadAvatar(this.selectedFile);
      this.userProfileService.updateUserAvatar(avatarData).subscribe({
        next: (avatarInfo: any) => {
          console.log(avatarInfo.avatar);
          this.user.avatar = avatarInfo.avatar;
          localStorage.setItem('savedAvatar', avatarInfo.avatar);
        },

        error: (err) => {
          console.log(err);
        },
      });
    }
    this.closeModal();
  }

  cancelAvatarChange() {
    this.previewImage = null;
    this.selectedFile = null;
    this.closeModal();
  }

  closeModal(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.showModal = false;
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  uploadAvatar(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.user.avatar = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
