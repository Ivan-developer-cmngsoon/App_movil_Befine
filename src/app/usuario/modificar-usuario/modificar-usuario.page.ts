import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../usuario-service.service';
import { ClUsuario } from '../model/ClUsuario';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.page.html',
  styleUrls: ['./modificar-usuario.page.scss'],
})
export class ModificarUsuarioPage implements OnInit {
  usuario: ClUsuario | null = null;  // Usuario que vamos a modificar

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private navCtrl: NavController  // Inyectamos NavController
  ) {}

  ngOnInit() {
    const usuarioId = this.route.snapshot.paramMap.get('id');  // Obtenemos el ID del usuario desde la ruta
    if (usuarioId) {
      this.loadUsuario(usuarioId);  // Cargamos los datos del usuario para modificar
    }
  }

  // Cargar los detalles del usuario
  loadUsuario(id: string) {
    this.usuarioService.getUsuario(id).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
      },
      error: (error) => {
        console.error('Error al cargar el usuario:', error);
      }
    });
  }

  // Función para guardar los cambios en el usuario
  guardarCambios() {
    if (this.usuario && this.usuario.id) {
      const id = this.usuario.id.toString();  // Aseguramos que el ID esté en formato string
      this.usuarioService.updateUsuario(id, this.usuario).subscribe({
        next: (response) => {
          console.log('Usuario modificado correctamente:', response);
          // Redirigir a la página de listar usuarios después de modificar
          this.navCtrl.navigateBack('/usuario/listar-usuarios');
        },
        error: (error) => {
          console.error('Error al modificar el usuario:', error);
        }
      });
    } else {
      console.error('El ID del usuario no está definido.');
    }
  }
}
