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
    <header class="brand-name">
      <a [routerLink]="['/']" class="link-class">
          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
      </a>
      <nav class="menu">
        <a [routerLink]="['/text1']" class="menu-item">Events</a>
        <a [routerLink]="['/text2']" class="menu-item">Blog</a>
        <a [routerLink]="['/contact']" class="menu-item">Contact</a>
      </nav>
     </header>
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
