import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string = '';
  errorCorreo: string = '';

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    private router: Router,
    private http: HttpClient,
    private storage: Storage,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }

  login() {
    if (!this.email || !this.username || !this.password) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }
    if (!this.email.includes('@')) {
      this.errorMessage = 'Ingrese un correo electrónico válido.';
      return;
    }

    this.http
      .get<any[]>(`http://192.168.43.37:3000/usuario?email=${this.email}&username=${this.username}&password=${this.password}`)
      .subscribe({
        next: async (response) => {
          if (response.length > 0) {
            await this.storage.set('user_authenticated', true);
            await this.storage.set('user_name', this.username);
            this.errorMessage = '';
            const navigationExtras: NavigationExtras = { state: { username: this.username } };
            this.router.navigate(['/home'], navigationExtras);
          } else {
            this.errorMessage = 'Correo, nombre de usuario o contraseña incorrectos.';
          }
        },
        error: () => {
          this.errorMessage = 'No pudimos conectar con el servidor. Por favor, verifica tu conexión a internet.';
        },
      });
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  onSubmit() {
    if (!this.email) {
      this.errorCorreo = 'Por favor, ingrese un correo válido.';
      return;
    }

    this.http.get<any[]>(`http://192.168.43.37:3000/usuario?email=${this.email}`).subscribe({
      next: (response) => {
        if (response.length > 0) {
          alert('Instrucciones enviadas para recuperar tu contraseña.');
          this.dismissModal();
        } else {
          this.errorCorreo = 'Este correo no está registrado.';
        }
      },
      error: () => {
        this.errorCorreo = 'No pudimos conectar con el servidor. Por favor, intenta más tarde.';
      },
    });
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }
}
