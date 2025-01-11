import { Routes } from '@angular/router';
import { HomeComponent } from './events/events.component';
import { DetailsComponent } from './details/details.component';
import { ContactComponent } from './contact/contact.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MsalGuard } from '@azure/msal-angular'; // Importuj MsalGuard tutaj

const routeConfig: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    title: 'Home page'
  },
  {
    path: 'events',
    component: HomeComponent,
    title: 'Home details'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Home addresses'
  },
  {
    path: 'editor',
    loadComponent: () => import('./editor/editor.component').then(m => m.EditorComponent), // Lazy load EditorComponent
    title: 'Admin page',
    canActivate: [MsalGuard],
  }
];

export default routeConfig;
