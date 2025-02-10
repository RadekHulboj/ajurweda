import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    TranslateModule,
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

       <!-- Menu -->
        <nav [class.open]="menuOpen" class="menu">
          <a [routerLink]="['/']" class="menu-item" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()">{{ 'MENU.HOME' | translate }}</a>
          <a [routerLink]="['/events']" class="menu-item" routerLinkActive="active" (click)="closeMenu()">{{ 'MENU.EVENTS' | translate }}</a>
          <a [routerLink]="['/editor']" class="menu-item" routerLinkActive="active" (click)="closeMenu()">{{ 'MENU.EDITOR' | translate }}</a>
          <a [routerLink]="['/contact']" class="menu-item" routerLinkActive="active" (click)="closeMenu()">{{ 'MENU.CONTACT' | translate }}</a>
        </nav>

        <div class="language-selector">
          <button class="menu-toggle" (click)="toggleMenu()">☰</button>
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
  currentLang: string = 'en';
  menuOpen = false;

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false; // Zamyka menu po kliknięciu
  }


  @HostListener('window:resize')
  adjustContentPadding() {
    const header = document.querySelector('header.brand-name') as HTMLElement;
    const content = document.querySelector('section.content');
    if (header && content) {
      const headerHeight = header.offsetHeight;
      (content as HTMLElement).style.marginTop = `${headerHeight + 20}px`;
    }
  }
}
