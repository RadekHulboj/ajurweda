import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    RouterModule,
  ],
  template: `
  <main>
    <section class="container">
      <a [routerLink]="['/']" class="link-class">
        <header class="brand-name">
          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
        </header>
      </a>
    </section>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>
`,
  styleUrls: ['./app.component.css', './core/shared.styles.css'],
})
export class AppComponent {
  title = 'tata radek';

}
