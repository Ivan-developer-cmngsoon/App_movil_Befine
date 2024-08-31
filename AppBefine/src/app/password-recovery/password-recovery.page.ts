import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage {
  recoveryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController  // Inyectamos el AlertController
  ) {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onRecoverPassword() {
    if (this.recoveryForm.valid) {
      const email = this.recoveryForm.value.email;

      // Aquí simulamos el envío del correo
      console.log(`Enviando enlace de recuperación a: ${email}`);

      // Mostrar la alerta de éxito
      const alert = await this.alertController.create({
        header: 'Correo Enviado',
        message: 'El enlace de recuperación ha sido enviado. Por favor, revisa tu correo y sigue las instrucciones.',
        buttons: [{
          text: 'OK',
          handler: () => {
            // Redirigir a la página de login
            this.router.navigate(['/login']);
          }
        }]
      });

      await alert.present();
      // Configurar temporizador de 5 segundos para redirección automática
      setTimeout(() => {
        alert.dismiss();  // Cerrar la alerta si está abierta
        this.router.navigate(['/login']);  // Redirigir a la página de login
      }, 3000);
    }
  }
}
