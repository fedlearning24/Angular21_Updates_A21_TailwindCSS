import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { email, Field, form, maxLength, minLength, required } from '@angular/forms/signals';

interface ILoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-root',
  imports: [Field, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isActive = signal<boolean>(false);

  isVisible = signal<boolean>(true);

  headingStyles = signal({
    'border':'1px solid black',
    'font-weight':'bold'
  })

   loginModel = signal<ILoginData>({
    email: '',
    password: ''
  })

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required.' });
    email(schemaPath.email, { message: 'Enter a valid email address.' });
    required(schemaPath.password, { message: 'Password is required.' });
    minLength(schemaPath.password, 5, { message: 'Password must be at least 5 charactors.' });
    maxLength(schemaPath.password, 10, { message: 'Password is too long.' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.loginModel());
  }

}
