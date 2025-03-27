import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingService } from '../core/housing.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
  <article class="container"> 
    <section class="listing-features">
      <h2 class="section-heading">Contact with us:</h2>
      <ul>
        <li>Poland, Wilczyce</li>
        <li>Poland, Wroclaw</li>
      </ul>
    </section>
    <section class="listing-apply">
      <form [formGroup]="applyForm" (ngSubmit)="submitApplication()">
        <div class="form-group">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName">
        </div>

        <div class="form-group">
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName">
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
          <div *ngIf="applyForm.get('email')?.invalid && applyForm.get('email')?.touched" class="error">
            <small>Please enter a valid email address.</small>
          </div>
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" formControlName="message" rows="4"></textarea>
        </div>

        <button type="submit" class="primary" [disabled]="applyForm.invalid">Apply now</button>
      </form>
    </section>
    <section class="notification" *ngIf="successMessage">
      <p>{{ successMessage }}</p>
    </section>
    <section class="failNotification" *ngIf="failMessage">
      <p>{{ failMessage }}</p>
    </section>
  </article>
  `,
  styleUrls: ['./contact.component.css', '../core/shared.styles.css']
})
export class ContactComponent {
  successMessage = "";
  failMessage = "";
  housingService = inject(HousingService);

  applyForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required])
  });

  constructor() {}

  
  submitApplication() {
    if (this.applyForm.valid) {
      const { firstName, lastName, email, message } = this.applyForm.value;

      this.housingService
        .submitApplication(firstName ?? '', lastName ?? '', email ?? '', message ?? '')
        .subscribe({
          next: (responseMessage:any) => {
              this.successMessage = JSON.stringify(responseMessage.message);
            this.applyForm.reset();
            setTimeout(() => (this.successMessage = ''), 3000);
          },
          error: (error) => {
            this.failMessage = JSON.stringify("An error occurred. Please try again.");
            console.error('Error:', error);
            setTimeout(() => (this.failMessage = ''), 3000);
          }
        });
    }
  }
}
