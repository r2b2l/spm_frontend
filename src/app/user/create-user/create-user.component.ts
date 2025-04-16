import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user/user';
import { passwordValidator } from '../../validators/password.validator';
import { UserService } from '../../services/user/user.service';

@Component({
    selector: 'app-create-user',
    imports: [ReactiveFormsModule],
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  user: User = new User(0, '', '', '', '');
  hidePassword: boolean = true;
  redirectRoute: string = 'login';

  createUserForm: FormGroup;
  usernameFC: FormControl = new FormControl(this.user.username, [
    Validators.required
  ])
  mailFC: FormControl = new FormControl(this.user.mail, [
    Validators.required,
    Validators.email
  ]);
  passwordFC: FormControl = new FormControl(this.user.password, [
    Validators.required,
    passwordValidator()
  ])

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.createUserForm = this.formBuilder.group({
      username: this.usernameFC,
      mail: this.mailFC,
      password: this.passwordFC
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.createUser(this.user).subscribe(data => {
      // If data is true, create account is successful, redirect to login
      if (data) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  /**
   * Check validity of the mail form control and return custom error under the input field
   * @returns string error message for mail field
  */
  getUsernameErrorMessage(): string {
    if (this.mailFC.hasError('required')) {
      return 'Saisir un identifiant';
    }

    return this.mailFC.hasError('username') ? 'Identifiant non valide' : '';
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

    return this.passwordFC.hasError('invalidPassword') ? '1 majuscule, 1 minuscule, 1 caractère spécial, 6 caractères minimum' : '';
  }

}
