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
import routeConfig from './app/routes';

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
    clientId: 'YOUR_CLIENT_ID',
    authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID',
    redirectUri: 'http://localhost:4200',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  }
};

const msalInstance: IPublicClientApplication = new PublicClientApplication(msalConfig);

// Konfiguracja MsalGuard
const msalGuardConfig = {
  interactionType: InteractionType.Redirect,
  authRequest: {
    scopes: ['user.read'],
  },
};

// Konfiguracja aplikacji
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    provideHttpClient(withInterceptorsFromDi()),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
      },
    }).providers || [],
    MsalModule,
    {
      provide: 'MSAL_INSTANCE',
      useValue: msalInstance,  // Dostarczamy instancję MSAL
    },
    {
      provide: 'MSAL_GUARD_CONFIG',
      useValue: msalGuardConfig,  // Dostarczamy konfigurację dla MSAL Guard
    },
    MsalGuard,  // Rejestrujemy MsalGuard
  ],
}).catch((err) => console.error(err));
