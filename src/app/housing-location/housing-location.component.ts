import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [
    CommonModule, // Dodaj, jeśli używasz *ngIf, *ngFor
    RouterModule, // Dodaj, aby routerLink działało
  ],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="housingLocationHome.photo" alt="Exterior photo of {{housingLocationHome.name}}">
      <h2 class="listing-heading">{{ housingLocationHome.name }}</h2>
      <p class="listing-location">{{ housingLocationHome.city}}, {{housingLocationHome.state }}</p>
      <a [routerLink]="['/details', housingLocationHome.id]">Learn More</a>
    </section>
  `,
  styleUrl: './housing-location.component.css'
})

export class HousingLocationComponent {
  @Input() housingLocationHome!: HousingLocation;
}
