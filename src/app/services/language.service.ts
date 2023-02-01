import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const LANGUAGE_KEY = "lang";

@Injectable({ providedIn: 'root' })
export class LanguageService {

    private readonly availableLanguages = ['en', 'es'];

    currentLanguage!: string;

    constructor(private translateService: TranslateService) {
        this.translateService.addLangs(['en', 'es']);
    }

    async updateLanguage(language: string) {
        try {
            await this.translateService.use(language);
            this.currentLanguage = language;
            localStorage.setItem(LANGUAGE_KEY, language);
        } catch (err) {
            console.log(err);
        }
    }

    async initializeLanguage() {
        const defaultLang = this.getDefaultLanguage();
        this.translateService.setDefaultLang(defaultLang);
        await this.updateLanguage(defaultLang);
    }

    private getDefaultLanguage(): string {
        const persistedLanguage = localStorage.getItem(LANGUAGE_KEY);
        if (persistedLanguage) {
            return persistedLanguage;
        }

        const userLang = this.getUserLanguage();
        const defaultLang = this.availableLanguages.indexOf(userLang) > -1 && userLang || 'en';
        return defaultLang;
    }

    private getUserLanguage(): string {
        const userLang = navigator.language;
        let userShortLang = userLang;
        if (userShortLang.indexOf('-') !== -1)
            userShortLang = userShortLang.split('-')[0];

        if (userShortLang.indexOf('_') !== -1)
            userShortLang = userShortLang.split('_')[0];
        return userShortLang;
    }

}