import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../core/housing.service';
// import { HousingLocation } from '../core/housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
        <label for="first-name">First Name</label>
        <input id="first-name" type="text" formControlName="firstName">

        <label for="last-name">Last Name</label>
        <input id="last-name" type="text" formControlName="lastName">

        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email">

        <label for="message">Message</label>
        <textarea id="message" formControlName="message" rows="4"></textarea>


        <button type="submit" class="primary">Apply now</button>

      </form>
    </section>
    <section class="notification" *ngIf="successMessage">
      <p>{{ successMessage }}</p>
    </section>
  </article>
`,
  styleUrls: ['./contact.component.css' ,'../core/shared.styles.css']
})

export class ContactComponent {
  successMessage = "";
  // route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  // housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl('')
  });

  constructor() {
  }

  submitApplication() {
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