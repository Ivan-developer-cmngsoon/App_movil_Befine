import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario-service.service'; // Importa el servicio de usuarios
import { ClUsuario } from '../model/ClUsuario'; // Importa el modelo de usuario
import { NavController, AlertController } from '@ionic/angular';  // Para navegación y alertas

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.page.html',
  styleUrls: ['./listar-usuarios.page.scss'],
})
export class ListarUsuariosPage implements OnInit {

  usuarios: ClUsuario[] = []; // Variable para almacenar los usuarios
  errorMessage: string | null = null; // Variable para manejar errores

  // Inyectamos NavController y AlertController en el constructor
  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Cargar los usuarios cuando se inicialice la página
    this.showUsuarios();
  }

  // Método para obtener y mostrar los usuarios
  showUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios: ClUsuario[]) => {
        this.usuarios = usuarios;
        this.errorMessage = null; // Limpiar mensaje de error si la carga es exitosa
        console.log('Usuarios cargados:', usuarios);
      },
      error: (error: any) => {
        this.errorMessage = 'Error al cargar los usuarios.';
        console.error('Error al cargar los usuarios:', error);
      },
      complete: () => {
        console.log('Carga de usuarios completa');
      }
    });
  }

  // Método para redirigir a la página de modificar usuario
  modifyUsuario(id: string) {
    this.navCtrl.navigateForward(`/modificar-usuario/${id}`);  // Redirigir con el ID del usuario
  }

  // Método para eliminar un usuario
  async deleteUsuario(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            // Llamar al servicio para eliminar el usuario
            this.usuarioService.deleteUsuario(id).subscribe({
              next: () => {
                console.log('Usuario eliminado correctamente.');
                this.showUsuarios(); // Volver a cargar la lista de usuarios
              },
              error: (error: any) => {
                console.error('Error al eliminar el usuario:', error);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
