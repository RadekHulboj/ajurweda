import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { ContactComponent } from './contact/contact.component';
import { WelcomeComponent } from './welcome/welcome.component';

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
      title: 'Home addreses'
    }
  ];
  
  export default routeConfig;