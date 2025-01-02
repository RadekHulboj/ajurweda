import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    TranslateModule, // Import modułu tłumaczeń
  ],
  template: `
  <main>
    <section class="container">
      <header class="brand-name">
        <a [routerLink]="['/']">
          <img class="brand-logo" src="/assets/ajur1.svg" alt="logo" aria-hidden="true">
          <img class="brand-logo" src="/assets/ajur2.svg" alt="logo" aria-hidden="true">
          <img class="brand-logo" src="/assets/ajur3.svg" alt="logo" aria-hidden="true">
          <img class="brand-logo" src="/assets/ajur4.svg" alt="logo" aria-hidden="true">
          <img class="brand-logo" src="/assets/ajur5.svg" alt="logo" aria-hidden="true">
          <img class="brand-logo" src="/assets/ajur6.svg" alt="logo" aria-hidden="true">
          <img class="brand-logo" src="/assets/ajur7.svg" alt="logo" aria-hidden="true">
        </a>
        <nav class="menu">
          <a [routerLink]="['/']" class="menu-item" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">{{ 'MENU.HOME' | translate }}</a>
          <a [routerLink]="['/events']" class="menu-item" routerLinkActive="active">{{ 'MENU.EVENTS' | translate }}</a>
          <a [routerLink]="['/text2']" class="menu-item" routerLinkActive="active">{{ 'MENU.BLOG' | translate }}</a>
          <a [routerLink]="['/contact']" class="menu-item" routerLinkActive="active">{{ 'MENU.CONTACT' | translate }}</a>
        </nav>

        <div class="language-selector">
          <button [class.active]="currentLang === 'en'" (click)="changeLanguage('en')">En</button>
          <button [class.active]="currentLang === 'pl'" (click)="changeLanguage('pl')">Pl</button>
        </div>

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
  currentLang: string = 'en'; // Domyślny język

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en'); // Domyślny język
    this.translate.use('en'); // Aktywny język
  }

  changeLanguage(lang: string) {
    this.translate.use(lang); // Zmiana języka
    this.currentLang = lang; // Ustawienie aktywnego języka
  }
}
