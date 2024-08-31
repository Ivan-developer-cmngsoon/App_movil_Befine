import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]]
    });
  }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    if (!password) return null;

    const hasFourNumbers = /(?=(.*\d){4})/.test(password);
    const hasThreeSpecialChars = /(?=(.*[a-z]){3})/.test(password); 
    const hasOneUpperCase = /(?=(.*[A-Z]){1})/.test(password);

    if (!hasFourNumbers || !hasThreeSpecialChars || !hasOneUpperCase) {
      return { passwordInvalid: true };
    }

    return null;
  }

  onLogin() {
    if (this.loginForm.valid) {
      // Aquí puedes agregar lógica adicional si es necesario
      this.router.navigate(['/home']); // Redirige a la página de inicio u otra página
    }
  }
}
