import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  loginForm: FormGroup;

  usernameError: boolean = false;
  passwordError: boolean = false;
  loginError: boolean = false;

  usernameMessage: string = '';
  passwordMessage: string = '';
  loginMessage: string = '';

  images: string[] = [
    'imgs/sign-up/blade-runner.jpg',
    'imgs/sign-up/tennet.jpg',
    'imgs/sign-up/rogue-one.jpg',
    'imgs/sign-up/harry-potter.jpg',
  ];
  currentImage: number = 0;

  constructor(
    protected auth: AuthService,
    protected userService: UserService,
    protected router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9_]+$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(
          '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$'
        ),
      ]),
    });
  }

  ngOnInit(): void {
    setInterval(() => {
      this.currentImage = (this.currentImage + 1) % this.images.length;
    }, 4000);
  }

  onSignIn() {
    this.usernameError = false;
    this.passwordError = false;
    this.loginError = false;

    if (this.validateData())
      this.auth.signIn(this.loginForm.value).subscribe({
        next: (response: any) => {
          console.log('User logged successfully:', response);
          this.userService.updateUser(response.user);

          this.loginForm.get('username')?.setValue('');
          this.loginForm.get('password')?.setValue('');
          this.router.navigateByUrl('/home');
        },

        error: (err) => {
          console.log(err);
          switch (err.error) {
            case 'User not found':
              this.usernameError = true;
              this.usernameMessage = err.error;
              break;
            case 'Invalid password':
              this.passwordError = true;
              this.passwordMessage = err.error;
              break;
            default:
              this.loginError = true;
              this.loginMessage = 'There was an error, try again please.';
          }
        },
      });
  }

  validateData() {
    let validatedFields = true;

    const usernameControl = this.loginForm.controls['username'];
    const passwordControl = this.loginForm.controls['password'];

    if (usernameControl.errors !== null) {
      validatedFields = false;
      this.usernameError = true;
      if (usernameControl.errors!['required']) {
        this.usernameMessage = 'You must enter a username';
      } else if (
        usernameControl.errors!['minlength'] ||
        usernameControl.errors!['maxlength']
      ) {
        this.usernameMessage =
          'The username must be between 3 and 20 characters long';
      } else if (usernameControl.errors!['pattern']) {
        this.usernameMessage =
          'Only letters, numbers and underscores for the username';
      }
    }

    if (passwordControl.errors !== null) {
      validatedFields = false;
      this.passwordError = true;
      if (passwordControl.errors!['required']) {
        this.passwordMessage = 'You must enter a password';
      } else if (
        passwordControl.errors!['minlength'] ||
        passwordControl.errors!['maxlength']
      ) {
        this.passwordMessage =
          'The password must be between 3 and 20 characters long';
      } else if (passwordControl.errors!['pattern']) {
        this.passwordMessage =
          'The password must have at least 1 uppercase, 1 number and 1 special character';
      }
    }

    return validatedFields;
  }
}
