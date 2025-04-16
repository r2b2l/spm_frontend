import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service.service';
import { User } from '../../models/user/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [FormsModule, ReactiveFormsModule],
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User(0, '', '', '', '');
  hidePassword: boolean = true;
  redirectRoute: string = '';

  loginForm: FormGroup;
  mailFC: FormControl = new FormControl(this.user.mail, [
    Validators.required,
    Validators.email
  ]);
  passwordFC: FormControl = new FormControl(this.user.password, [
    Validators.required
  ])

  constructor(private formBuilder: FormBuilder, private authService: AuthService , private route: ActivatedRoute) {
    this.loginForm = this.formBuilder.group({
      mail: this.mailFC,
      password: this.passwordFC
    });
    this.route.queryParams.subscribe(params => {
      this.redirectRoute = params['redirectAfterLogin'];
    });
  }

  ngOnInit(): void {
  }

  /**
  * Submit the form and redirect to caller
  */
  onSubmit() {
    if (!this.loginForm.invalid) {
      const user = new User(0, this.mailFC.value, '', this.passwordFC.value, '');
      this.authService.login(user, this.redirectRoute);
    }
  }

    /**
   * Check validity of the mail form control and return custom error under the input field
   * @returns string error message for mail field
   */
    getMailErrorMessage(): string {
      if (this.mailFC.hasError('required')) {
        return 'Saisir un mail';
      }
  
      return this.mailFC.hasError('email') ? 'Mail non valide' : '';
    }
  
    /**
     * Check validity of the password form control and return custom error under the input field
     * @returns string error message for password field
     */
    getPasswordErrorMessage(): string {
      if (this.passwordFC.hasError('required')) {
        return 'Saisir un mot de passe';
      }
  
      return this.passwordFC.hasError('invalidPassword') ? 'Mot de passe invalide' : '';
    }
}
