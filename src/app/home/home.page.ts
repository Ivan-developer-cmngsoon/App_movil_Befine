import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  @ViewChild('welcomeMessage', { read: ElementRef, static: true }) welcomeMessage!: ElementRef;
  
  username: string = ''; // Definir la propiedad username

  constructor(private animationCtrl: AnimationController, private router: Router) {}

  ngOnInit() {
    // Verificar si la navegación tiene el nombre de usuario
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.username = this.router.getCurrentNavigation()?.extras.state?.['username'] || 'Usuario';
    }
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
