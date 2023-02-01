import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageService } from './services/language.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient,
        './assets/i18n/',
        '.json');
}

export function ApplicationInitializerFactory(
    translate: TranslateService, languageService: LanguageService, injector: Injector) {
    return async () => {
        await injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
        await languageService.initializeLanguage();
    };
}