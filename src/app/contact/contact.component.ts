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
      <form [formGroup]="applyForm" (submit)="submitApplication()">
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
  </article>
`,
  styleUrls: ['./contact.component.css', '../core/shared.styles.css']
})
export class ContactComponent {
  successMessage = "";
  housingService = inject(HousingService);

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('')
  });

  constructor() {}

  submitApplication() {
    if (this.applyForm.valid) {
      this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? '',
        this.applyForm.value.message ?? ''
      );
      this.applyForm.reset();
  
      // Ustawienie komunikatu
      this.successMessage = 'Your email has been sent successfully!';
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }
  }
}
