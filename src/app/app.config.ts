import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtBearerAuthorization } from './components/auth/interceptor/jwt-bearer-authorization';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { LogoutOutline } from '@ant-design/icons-angular/icons';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), 
    provideNzI18n(en_US), 
    provideNzIcons([LogoutOutline]),
    provideAnimationsAsync(), provideHttpClient(withInterceptors([JwtBearerAuthorization]))
  ]
};
