import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario-service.service';
import { ClUsuario } from '../model/ClUsuario';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.page.html',
  styleUrls: ['./agregar-usuario.page.scss'],
})
export class AgregarUsuarioPage implements OnInit {

  usuarioForm!: FormGroup;  // Formulario reactivo
  isModalOpen = false;  // Controlar la visibilidad del modal

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    // Inicializamos el formulario reactivo
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],  // Validación para correo electrónico
      password: ['', [Validators.required, Validators.minLength(6)]],  // Validación para la contraseña
    });
  }

  // Método para enviar el formulario de usuario
  onFormSubmit() {
    if (this.usuarioForm.valid) {
      const formData = this.usuarioForm.value;
      const nuevoUsuarioData = formData;
      const nuevoUsuario: ClUsuario = new ClUsuario(nuevoUsuarioData);  // Creamos un nuevo usuario
    
      this.usuarioService.addUsuario(nuevoUsuario).subscribe({
        next: (response) => {
          console.log('Usuario agregado correctamente:', response);
          this.usuarioForm.reset();  // Reiniciar el formulario tras el envío
          this.openModal();  // Abrir el modal tras el envío
        },
        error: (error) => {
          console.error('Error al agregar el usuario:', error);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  // Método para abrir el modal
  openModal() {
    this.isModalOpen = true;
  }

  // Método para cerrar el modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Método para manejar el cierre del modal
  onModalDismiss() {
    this.isModalOpen = false;  // Asegurarse de que el modal esté cerrado
  }

  // Método para verificar si el campo 'email' tiene un error
  isEmailInvalid(): boolean {
    const control = this.usuarioForm.get('email');
    return control ? control.invalid && control.touched : false;  // Verifica si el control existe
  }
}
