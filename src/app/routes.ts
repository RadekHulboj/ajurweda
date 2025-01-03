import { Routes } from '@angular/router';
import { HomeComponent } from './events/events.component';
import { DetailsComponent } from './details/details.component';
import { ContactComponent } from './contact/contact.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EditorComponent } from './editor/editor.component';

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
    },
    {
      path: 'editor',
      component: EditorComponent,
      title: 'Admin page'
    }

  ];
  
  export default routeConfig;