import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  invalidCredentials = false;

  constructor(fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
    this.form = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  login() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.invalidCredentials = false;
    const { email, password } = this.form.value;

    this.authenticationService.login(email, password)
      .subscribe(response => {
         this.loading = false;
         if (response?.jwt) {
          this.router.navigateByUrl('');
          return;
         }
         
         this.invalidCredentials = true;
      });
  }
}
