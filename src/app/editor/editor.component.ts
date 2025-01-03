import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
  <article class="container">
    <section class="construction-section">
      <h1 class="construction-text">Page Under Construction</h1>
      <p class="message">We're working hard to get this page ready. Stay tuned!</p>
    </section>
  </article>
  `,
  styleUrls: ['./editor.component.css', '../core/shared.styles.css']
})
export class EditorComponent {
  constructor() { }
}
