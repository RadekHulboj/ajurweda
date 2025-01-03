import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MsalModule, MsalGuard } from '@azure/msal-angular';
import { PublicClientApplication, IPublicClientApplication, InteractionType } from '@azure/msal-browser';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EditorComponent } from './app/editor/editor.component';
import  routeConfig  from './app/routes';


// Niestandardowy loader tłumaczeń
@Injectable({ providedIn: 'root' })
export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`/assets/i18n/${lang}.json`);
  }
}

// Konfiguracja MSAL
const msalConfig = {
  auth: {
    clientId: 'YOUR_CLIENT_ID',  // ID aplikacji z Azure
    authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', // Tenant ID
    redirectUri: 'http://localhost:4200', // URI przekierowania
  },
  cache: {
    cacheLocation: 'localStorage', // Możesz wybrać sessionStorage lub localStorage
    storeAuthStateInCookie: true, // Umożliwia obsługę cookies w IE
  }
};

const msalInstance: IPublicClientApplication = new PublicClientApplication(msalConfig);

// Konfiguracja MsalGuard
const msalGuardConfig = {
  interactionType: InteractionType.Redirect, // Używamy InteractionType.Redirect z wyliczenia
  authRequest: {
    scopes: ['user.read'],
  },
};

// Konfiguracja MsalInterceptor
const msalInterceptorConfig = {
  interactionType: InteractionType.Redirect, // Używamy InteractionType.Redirect z wyliczenia
  protectedResourceMap: new Map([
    ['https://graph.microsoft.com/v1.0/me', ['user.read']],
  ])
};

// Konfiguracja aplikacji
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    provideHttpClient(withInterceptorsFromDi()), // Nowy sposób konfiguracji HttpClient
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
      },
    }).providers || [], // Rejestracja dostawców TranslateModule
    MsalModule, // Rejestracja MsalModule bez forRoot
    MsalGuard, //
    {
      provide: 'MSAL_GUARD_CONFIG',
      useValue: msalGuardConfig, // Konfiguracja dla MsalGuard
    },
  ],
}).catch((err) => console.error(err));
