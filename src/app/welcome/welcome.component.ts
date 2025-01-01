import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../core/housing.service';
import { HousingLocation } from '../core/housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
  <article class="container">
    <section>
    <img class="listing-photo" [src]="housingLocation?.photo" alt="Exterior photo of {{housingLocation?.name}}"/>
    </section>
    <section class="listing-description">
      <h2 class="listing-heading">{{housingLocation?.name}}</h2>
      <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
    </section>
    <section class="listing-features">
      <h4 class="section-heading">Discover the beauty of Ayurveda and let it guide you toward a life of balance, health, and harmony</h4>
      <div [innerHTML]="housingLocation?.article"></div>
    </section>
  </article>
`,
  styleUrls: ['./welcome.component.css' ,'../core/shared.styles.css']
})

export class WelcomeComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  constructor() {
    const housingLocationId = 12;
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }
}