import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSwitcherComponent {
  constructor(private languageService: LanguageService) { }

  async setLanguage(language: string) {
    await this.languageService.updateLanguage(language);
  }
}
