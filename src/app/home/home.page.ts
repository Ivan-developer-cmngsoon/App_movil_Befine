import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

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
    private activeroute: ActivatedRoute  // Inyectar ActivatedRoute
  ) {}

  ngOnInit() {
    // Suscribirse a los cambios de la ruta activa
    this.activeroute.queryParams.subscribe(() => {
      // Verificar si hay navegación en curso y si tiene datos en el estado
      const currentNavigation = this.router.getCurrentNavigation();
      if (currentNavigation && currentNavigation.extras.state) {
        this.username = currentNavigation.extras.state['username'] || 'Usuario';
        console.log(this.username);  // Mostrar el username recibido en la consola
      } else {
        // Manejar el caso donde no se pasa ningún estado o la navegación es indefinida
        this.username = 'Usuario';  // Valor por defecto
      }
    });
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
