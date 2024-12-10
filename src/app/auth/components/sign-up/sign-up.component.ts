import { Component, OnInit } from '@angular/core';
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
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  registerForm: FormGroup;

  usernameError: boolean = false;
  mailError: boolean = false;
  passwordError: boolean = false;
  registerError: boolean = false;

  usernameMessage: string = '';
  mailMessage: string = '';
  passwordMessage: string = '';
  registerMessage: string = '';

  constructor(
    protected auth: AuthService,
    protected userService: UserService,
    protected router: Router
  ) {
    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9_]+$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
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

  onSignUp() {
    this.usernameError = false;
    this.mailError = false;
    this.passwordError = false;
    this.registerError = false;

    if (this.validateData())
      this.auth.signUp(this.registerForm.value).subscribe({
        next: (response: any) => {
          console.log('User registered successfully:', response);
          this.userService.updateUser(response);

          this.registerForm.get('username')?.setValue('');
          this.registerForm.get('email')?.setValue('');
          this.registerForm.get('password')?.setValue('');
          this.router.navigateByUrl('/home');
        },

        error: (err) => {
          switch (err.error) {
            case 'Username already exists':
              this.registerError = true;
              this.registerMessage = 'This username already exists';
              break;
            case 'Email already in use':
              this.mailError = true;
              this.mailMessage = 'This Email is alredy in use';
              break;
            default:
              this.registerError = true;
              this.registerMessage = 'There was an error, try again please.';
          }
        },
      });
  }

  validateData() {
    let validatedFields = true;

    const usernameControl = this.registerForm.controls['username'];
    const mailControl = this.registerForm.controls['email'];
    const passwordControl = this.registerForm.controls['password'];

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

    if (mailControl.errors !== null) {
      validatedFields = false;
      this.mailError = true;
      if (mailControl.errors!['required']) {
        this.mailMessage = 'You must enter an Email';
      } else if (mailControl.errors!['email']) {
        this.mailMessage = 'You must enter a valid Email';
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
