import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';  // Importar Storage para manejar la sesión

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  @ViewChild('welcomeMessage', { read: ElementRef, static: true }) welcomeMessage!: ElementRef;

  username: string = ''; // Definir la propiedad username

  constructor(
    private animationCtrl: AnimationController, 
    private router: Router, 
    private activeroute: ActivatedRoute,
    private storage: Storage  // Inyectar Storage para manejar el username
  ) {}

  async ngOnInit() {
    // Recuperar el nombre de usuario desde el Storage si no se pasa en la navegación
    const savedUsername = await this.storage.get('username');
    if (savedUsername) {
      this.username = savedUsername;
    } else {
      // Usar el valor de la navegación si existe
      this.activeroute.queryParams.subscribe(() => {
        const currentNavigation = this.router.getCurrentNavigation();
        if (currentNavigation && currentNavigation.extras.state) {
          this.username = currentNavigation.extras.state['username'] || 'Usuario';
        } else {
          this.username = 'Usuario';  // Valor por defecto si no hay datos en la navegación
        }
      });
    }
    console.log(this.username);  // Mostrar el username recibido o recuperado del Storage
  }

  ngAfterViewInit() {
    // Definir la animación para el mensaje de bienvenida
    const animation = this.animationCtrl
      .create()
      .addElement(this.welcomeMessage.nativeElement)
      .duration(1500) // Duración de la animación en milisegundos
      .fromTo('opacity', '0', '1'); // Efecto de desvanecimiento (fade in)

    animation.play(); // Ejecutar la animación
  }
}
